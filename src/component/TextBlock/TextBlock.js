import React from "react";

function TextBlock({ title, children }) {
  return (
    <section className="content-section">
      <h2 className="section-heading">{title}</h2>
      <p className="section-copy">{children}</p>
    </section>
  );
}

export default TextBlock;
