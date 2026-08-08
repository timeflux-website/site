function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero section">
      <div className="section-inner narrow">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}

export default PageHero;
