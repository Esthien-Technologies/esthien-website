import { AlertTriangle, Bug, Mail, Radar, ShieldAlert, Zap } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const founderEmail = "founder@esthien.com";

function makeIncidentId() {
  const entropy =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  return `EST-${Date.now().toString(36).toUpperCase()}-${entropy.toUpperCase()}`;
}

export default function SecurityAlert() {
  const location = useLocation();
  const [reportState, setReportState] = useState<"queued" | "sent" | "manual">("queued");
  const incidentId = useMemo(makeIncidentId, []);
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const vector = params.get("vector") || "manual-security-route";
  const sourcePath = params.get("path") || location.pathname;

  const reportPayload = useMemo(
    () => ({
      incidentId,
      vector,
      sourcePath,
      page: location.pathname,
      userAgent: typeof navigator === "undefined" ? "unknown" : navigator.userAgent,
      timestamp: new Date().toISOString(),
    }),
    [incidentId, location.pathname, sourcePath, vector],
  );

  const mailSubject = encodeURIComponent(`[Esthien security alert] ${incidentId}`);
  const mailBody = encodeURIComponent(
    [
      `Incident: ${incidentId}`,
      `Vector: ${vector}`,
      `Requested path: ${sourcePath}`,
      `Page: ${location.pathname}`,
      `Time: ${reportPayload.timestamp}`,
      "",
      "Automated browser fallback report from the Esthien Labs security alert page.",
    ].join("\n"),
  );

  useEffect(() => {
    const localHostnames = new Set(["localhost", "127.0.0.1", "::1"]);
    if (localHostnames.has(window.location.hostname)) {
      setReportState("manual");
      return;
    }

    const reportKey = `esthien-security-report:${incidentId}`;
    if (window.sessionStorage.getItem(reportKey)) {
      setReportState("sent");
      return;
    }

    const body = JSON.stringify(reportPayload);
    const beaconSent =
      "sendBeacon" in navigator &&
      navigator.sendBeacon("/api/security-breach", new Blob([body], { type: "application/json" }));

    if (beaconSent) {
      window.sessionStorage.setItem(reportKey, "sent");
      setReportState("sent");
      return;
    }

    fetch("/api/security-breach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    })
      .then(() => {
        window.sessionStorage.setItem(reportKey, "sent");
        setReportState("sent");
      })
      .catch(() => setReportState("manual"));
  }, [incidentId, reportPayload]);

  return (
    <section className="error-page security-page">
      <div className="security-scanlines" aria-hidden="true" />
      <div className="security-grid" aria-hidden="true" />
      <div className="section-inner security-layout">
        <div className="security-symbol" data-reveal>
          <ShieldAlert size={72} />
          <span>LOCKDOWN</span>
        </div>

        <div className="security-copy" data-reveal>
          <span className="eyebrow">Security Boundary</span>
          <h1>Nice try. The chipset noticed.</h1>
          <p>
            This request matched a suspicious pattern and was routed into an
            isolated alert page. The founder report has been prepared for
            review.
          </p>
          <div className="security-console" role="status" aria-live="polite">
            <div>
              <span>incident</span>
              <strong>{incidentId}</strong>
            </div>
            <div>
              <span>vector</span>
              <strong>{vector}</strong>
            </div>
            <div>
              <span>path</span>
              <strong>{sourcePath}</strong>
            </div>
            <div>
              <span>report</span>
              <strong>{reportState === "manual" ? "manual fallback ready" : "queued to founder"}</strong>
            </div>
          </div>
          <div className="error-actions">
            <Link className="primary-button" to="/">
              <Radar size={18} />
              Return Home
            </Link>
            <a className="secondary-button" href={`mailto:${founderEmail}?subject=${mailSubject}&body=${mailBody}`}>
              <Mail size={18} />
              Email Founder
            </a>
          </div>
        </div>

        <div className="security-stack" data-reveal>
          {[AlertTriangle, Zap, Bug].map((Icon, index) => (
            <div key={index}>
              <Icon size={20} />
              <span>{["request trapped", "fabric isolated", "operator notified"][index]}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
