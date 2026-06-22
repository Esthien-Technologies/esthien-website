import { ArrowLeft, Home, Mail, Wrench } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { site } from "../data/site";

type ErrorPageProps = {
  code?: string;
  title?: string;
  body?: string;
};

export default function ErrorPage({
  code = "404",
  title = "This route is not on the board.",
  body = "The page may have moved, the address may be mistyped, or the route may not exist yet.",
}: ErrorPageProps) {
  const location = useLocation();

  return (
    <section className="error-page error-page--regular">
      <div className="error-orbit" aria-hidden="true" />
      <div className="section-inner error-layout">
        <div className="error-code" data-reveal>
          <span>{code}</span>
        </div>

        <div className="error-copy" data-reveal>
          <span className="eyebrow">Routing Error</span>
          <h1>{title}</h1>
          <p>{body}</p>
          <dl className="error-details">
            <div>
              <dt>Requested path</dt>
              <dd>{location.pathname}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>Safe fallback route served</dd>
            </div>
          </dl>
          <div className="error-actions">
            <Link className="primary-button" to="/">
              <Home size={18} />
              Home
            </Link>
            <button className="secondary-button" type="button" onClick={() => history.back()}>
              <ArrowLeft size={18} />
              Back
            </button>
            <a className="secondary-button" href={`mailto:${site.email}`}>
              <Mail size={18} />
              Contact
            </a>
          </div>
        </div>

        <div className="error-diagnostic" data-reveal>
          <Wrench size={22} />
          <span>Signal path rerouted. System state remains normal.</span>
        </div>
      </div>
    </section>
  );
}
