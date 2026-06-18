type PageHeroProps = {
  eyebrow: string;
  title: string;
  body: string;
};

export default function PageHero({ eyebrow, title, body }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="section-inner page-hero-inner">
        <span className="eyebrow" data-reveal>
          {eyebrow}
        </span>
        <h1 data-reveal>{title}</h1>
        <p data-reveal>{body}</p>
      </div>
    </section>
  );
}
