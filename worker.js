const founderEmail = "founder@esthien.com";

const suspiciousPathPatterns = [
  /\.env/i,
  /\/wp-admin/i,
  /\/wp-login/i,
  /\/phpmyadmin/i,
  /\/adminer/i,
  /\/\.git/i,
  /\/config\.(php|json|yml|yaml|js|ts)$/i,
  /\/composer\.(json|lock)$/i,
  /\/package-lock\.json$/i,
  /\/id_rsa/i,
  /\/etc\/passwd/i,
  /\.\.\//,
];

function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...(init.headers || {}),
    },
  });
}

function isSuspiciousPath(pathname) {
  return suspiciousPathPatterns.some((pattern) => pattern.test(pathname));
}

function securityRedirect(request, vector) {
  const url = new URL(request.url);
  const target = new URL("/security-alert", url.origin);
  target.searchParams.set("vector", vector);
  target.searchParams.set("path", `${url.pathname}${url.search}`);
  return Response.redirect(target.toString(), 302);
}

function sanitizeReport(input) {
  const data = input && typeof input === "object" ? input : {};
  return {
    incidentId: String(data.incidentId || "EST-UNKNOWN").slice(0, 80),
    vector: String(data.vector || "unknown").slice(0, 140),
    sourcePath: String(data.sourcePath || "unknown").slice(0, 300),
    page: String(data.page || "unknown").slice(0, 180),
    userAgent: String(data.userAgent || "unknown").slice(0, 500),
    timestamp: String(data.timestamp || new Date().toISOString()).slice(0, 80),
  };
}

function breachText(report, request) {
  return [
    "Esthien Labs security alert",
    "",
    `Incident: ${report.incidentId}`,
    `Vector: ${report.vector}`,
    `Source path: ${report.sourcePath}`,
    `Alert page: ${report.page}`,
    `Client time: ${report.timestamp}`,
    `Remote IP: ${request.headers.get("CF-Connecting-IP") || "unknown"}`,
    `Country: ${request.cf?.country || "unknown"}`,
    `User agent: ${report.userAgent}`,
  ].join("\n");
}

async function sendWithResend(report, request, env) {
  if (!env.RESEND_API_KEY) {
    return { sent: false, provider: "resend", reason: "RESEND_API_KEY not configured" };
  }

  const from = env.SECURITY_FROM_EMAIL || "Esthien Security <security@esthien.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [founderEmail],
      subject: `[Esthien security alert] ${report.incidentId}`,
      text: breachText(report, request),
    }),
  });

  return { sent: response.ok, provider: "resend", status: response.status };
}

async function sendWithWebhook(report, request, env) {
  if (!env.SECURITY_WEBHOOK_URL) {
    return { sent: false, provider: "webhook", reason: "SECURITY_WEBHOOK_URL not configured" };
  }

  const response = await fetch(env.SECURITY_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: founderEmail,
      subject: `[Esthien security alert] ${report.incidentId}`,
      text: breachText(report, request),
      report,
    }),
  });

  return { sent: response.ok, provider: "webhook", status: response.status };
}

async function handleSecurityBreach(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const report = sanitizeReport(body);
  const webhookResult = await sendWithWebhook(report, request, env);
  const resendResult = webhookResult.sent ? webhookResult : await sendWithResend(report, request, env);

  return json(
    {
      ok: true,
      reportQueued: Boolean(webhookResult.sent || resendResult.sent),
      delivery: webhookResult.sent ? webhookResult : resendResult,
    },
    { status: 202 },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/security-breach") {
      return handleSecurityBreach(request, env);
    }

    if (isSuspiciousPath(url.pathname)) {
      return securityRedirect(request, "suspicious-path");
    }

    return env.ASSETS.fetch(request);
  },
};
