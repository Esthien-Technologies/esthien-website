const founderEmail = "founder@esthien.com";
const defaultNewsletterFrom = "Esthien Labs <contact@esthien.com>";

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

function sanitizeNewsletter(input) {
  const data = input && typeof input === "object" ? input : {};
  return {
    subject: String(data.subject || "Esthien Labs update").slice(0, 180),
    audience: String(data.audience || "investors, partners, and collaborators").slice(0, 180),
    recipients: Array.isArray(data.recipients) ? data.recipients : String(data.recipients || "").split(","),
    intro: String(data.intro || "").slice(0, 2000),
    update: String(data.update || "").slice(0, 5000),
    ask: String(data.ask || "").slice(0, 2000),
  };
}

function parseRecipients(value, fallback = "") {
  const raw = Array.isArray(value) ? value : String(value || fallback).split(",");
  return raw
    .map((item) => String(item).trim())
    .filter((item) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item))
    .slice(0, 100);
}

function newsletterText(newsletter) {
  return [
    newsletter.intro,
    "",
    "Update",
    newsletter.update,
    "",
    "Next step",
    newsletter.ask,
    "",
    "Contact: contact@esthien.com",
  ].join("\n");
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

async function sendNewsletterWithResend(newsletter, recipients, env) {
  if (!env.RESEND_API_KEY) {
    return { sent: false, provider: "resend", reason: "RESEND_API_KEY not configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.NEWSLETTER_FROM_EMAIL || defaultNewsletterFrom,
      to: recipients,
      subject: newsletter.subject,
      text: newsletterText(newsletter),
    }),
  });

  return { sent: response.ok, provider: "resend", status: response.status };
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

async function handleNewsletterSend(request, env) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });
  }

  if (!env.NEWSLETTER_ADMIN_TOKEN) {
    return json({ error: "Newsletter admin token is not configured" }, { status: 503 });
  }

  const auth = request.headers.get("Authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : request.headers.get("X-Admin-Token") || "";
  if (token !== env.NEWSLETTER_ADMIN_TOKEN) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  let body = {};
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const newsletter = sanitizeNewsletter(body);
  const recipients = parseRecipients(newsletter.recipients, env.NEWSLETTER_TO_EMAILS || founderEmail);
  if (recipients.length === 0) {
    return json({ error: "No valid recipients" }, { status: 400 });
  }

  if (!newsletter.intro.trim() || !newsletter.update.trim() || !newsletter.ask.trim()) {
    return json({ error: "Newsletter intro, update, and ask are required" }, { status: 400 });
  }

  const delivery = await sendNewsletterWithResend(newsletter, recipients, env);
  return json(
    {
      ok: delivery.sent,
      sent: delivery.sent,
      recipients: recipients.length,
      delivery,
    },
    { status: delivery.sent ? 202 : 503 },
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/security-breach") {
      return handleSecurityBreach(request, env);
    }

    if (url.pathname === "/api/newsletter/send") {
      return handleNewsletterSend(request, env);
    }

    if (isSuspiciousPath(url.pathname)) {
      return securityRedirect(request, "suspicious-path");
    }

    return env.ASSETS.fetch(request);
  },
};
