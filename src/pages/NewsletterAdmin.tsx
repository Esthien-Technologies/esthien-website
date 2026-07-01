import { Eye, LockKeyhole, Save, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { site } from "../data/site";

const storageKey = "esthien-newsletter-drafts";
const unlockKey = "esthien-admin-unlocked";

type Draft = {
  subject: string;
  audience: string;
  intro: string;
  update: string;
  ask: string;
};

const initialDraft: Draft = {
  subject: "Esthien Labs update",
  audience: "investors, partners, and collaborators",
  intro: "Esthien Labs is building FPGA-first custom silicon for deterministic physical intelligence.",
  update: "This issue can summarize prototype progress, hiring needs, technical notes, partnership signals, and investor milestones.",
  ask: "Reply to discuss partnerships, investment conversations, technical collaboration, or pilot opportunities.",
};

const loadDraft = (): Draft => {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? ({ ...initialDraft, ...(JSON.parse(saved) as Partial<Draft>) } as Draft) : initialDraft;
  } catch {
    return initialDraft;
  }
};

export default function NewsletterAdmin() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(unlockKey) === "true");
  const [passphrase, setPassphrase] = useState("");
  const [draft, setDraft] = useState<Draft>(loadDraft);
  const [saved, setSaved] = useState(false);

  const preview = useMemo(
    () =>
      [
        draft.intro,
        "",
        "Update",
        draft.update,
        "",
        "Next step",
        draft.ask,
        "",
        `Contact: ${site.email}`,
      ].join("\n"),
    [draft],
  );

  const unlock = () => {
    if (passphrase.trim().length >= 10) {
      sessionStorage.setItem(unlockKey, "true");
      setUnlocked(true);
    }
  };

  const updateField = (field: keyof Draft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  };

  const saveDraft = () => {
    localStorage.setItem(storageKey, JSON.stringify(draft));
    setSaved(true);
  };

  if (!unlocked) {
    return (
      <section className="admin-page">
        <div className="section-inner admin-unlock">
          <LockKeyhole size={28} />
          <span className="eyebrow">Internal</span>
          <h1>Newsletter console</h1>
          <label>
            Access phrase
            <input
              type="password"
              value={passphrase}
              autoComplete="current-password"
              onChange={(event) => setPassphrase(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  unlock();
                }
              }}
            />
          </label>
          <button className="primary-button" type="button" onClick={unlock}>
            Unlock
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="section-inner admin-layout">
        <div className="admin-editor">
          <span className="eyebrow">Internal</span>
          <h1>Newsletter console</h1>
          <div className="admin-status">
            <ShieldCheck size={17} />
            <span>No browser-side API keys. Sending requires an authenticated backend.</span>
          </div>
          <label>
            Subject
            <input value={draft.subject} onChange={(event) => updateField("subject", event.target.value)} />
          </label>
          <label>
            Audience
            <input value={draft.audience} onChange={(event) => updateField("audience", event.target.value)} />
          </label>
          <label>
            Intro
            <textarea value={draft.intro} onChange={(event) => updateField("intro", event.target.value)} />
          </label>
          <label>
            Update
            <textarea value={draft.update} onChange={(event) => updateField("update", event.target.value)} />
          </label>
          <label>
            Ask
            <textarea value={draft.ask} onChange={(event) => updateField("ask", event.target.value)} />
          </label>
          <div className="admin-actions">
            <button className="secondary-button" type="button" onClick={saveDraft}>
              <Save size={17} />
              {saved ? "Saved" : "Save draft"}
            </button>
            <a
              className="primary-button"
              href={`mailto:${site.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(preview)}`}
            >
              <Send size={17} />
              Prepare email
            </a>
          </div>
        </div>
        <article className="admin-preview">
          <div>
            <Eye size={18} />
            <span>{draft.audience}</span>
          </div>
          <h2>{draft.subject}</h2>
          <pre>{preview}</pre>
        </article>
      </div>
    </section>
  );
}
