import React from "react";

function ProjectHeader({ title, authors, institutions, publishedAt, logoSrc }) {
  return (
    <header className="hero">
      <h1 className="hero-title">
        {logoSrc ? <img alt="" aria-hidden="true" className="hero-logo" src={logoSrc} /> : null}
        {title}
      </h1>
      <div className="hero-authors">{authors}</div>
      {institutions ? (
        <div className="hero-institutions">{institutions}</div>
      ) : null}
      <div className="venue-badge">{publishedAt}</div>
    </header>
  );
}

export default ProjectHeader;
