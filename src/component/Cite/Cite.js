"use client";
import React, { useState } from "react";

const CiteUs = ({
  entryType = "article",
  citationKey = "yourKey",
  title,
  authors,
  journal,
  year,
  publisher,
  ...rest
}) => {
  const generateBibtex = () => {
    const lines = [];
    lines.push(`@${entryType}{${citationKey},`);
    lines.push(`  title = {${title}},`);
    lines.push(`  author = {${authors.join(" and ")}},`);
    if (journal) lines.push(`  journal = {${journal}},`);
    if (year) lines.push(`  year = {${year}},`);
    if (publisher) lines.push(`  publisher = {${publisher}},`);
    // Add any additional fields
    Object.entries(rest).forEach(([key, value]) => {
      lines.push(`  ${key} = {${value}},`);
    });
    // Remove the trailing comma from the last field
    if (lines.length > 0) {
      lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
    }
    lines.push(`}`);
    return lines.join("\n");
  };

  const bibtexString = generateBibtex();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bibtexString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <section className="citation-section">
      <div className="citation-header">
        <h2 className="citation-heading">Citation</h2>
        <button className="copy-button" onClick={handleCopy} type="button">
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="citation-code">{bibtexString}</pre>
    </section>
  );
};

export default CiteUs;
