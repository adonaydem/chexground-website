import * as React from "react";
import Footer from "../component/Footer";
import ProjectHeader from "../component/ProjectHeader";
import TextBlock from "../component/TextBlock";
import ProjectLinks from "../component/ProjectLink";
import CiteUs from "../component/Cite/Cite";

const PAPER_URL =
  "https://arxiv.org/search/?query=CheXGround%3A+Anatomical+Region+Tokens+for+Grounded+Longitudinal+Chest+X-ray+Interpretation&searchtype=title";

const authors = [
  {
    name: "Adonay Demewez Gebremedhin",
    href: "https://github.com/adonaydem",
    institutions: "1",
  },
  {
    name: "Wessam Shehieb",
    href: "mailto:w.shehieb@ajman.ac.ae",
    institutions: "1",
  },
  {
    name: "Sara Alansari",
    href: "mailto:saraansari@live.com",
    institutions: "2",
  },
  {
    name: "Mohamad Alansari",
    href: "mailto:100061914@ku.ac.ae",
    institutions: "3",
  },
  {
    name: "Muzammal Naseer",
    href: "mailto:muhammadmuzammal.naseer@ku.ac.ae",
    institutions: "3,4",
  },
  {
    name: "Sajid Javed",
    href: "mailto:sajid.javed@ku.ac.ae",
    institutions: "3",
  },
  {
    name: "Naoufel Werghi",
    href: "mailto:Naoufel.Werghi@ku.ac.ae",
    institutions: "3",
  },
];

function paperAsset(path) {
  const basePath =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_PATH || ""
      : "";

  return `${basePath}/paper-assets/${path}`;
}

function PaperFigure({ src, alt }) {
  const asset = paperAsset(src);

  return (
    <figure className="paper-figure">
      <a aria-label={`Open full-resolution ${alt}`} href={asset}>
        <img alt={alt} className="paper-screenshot" loading="lazy" src={asset} />
      </a>
    </figure>
  );
}

export default function Home() {
  return (
    <>
      <main className="page-shell">
        <ProjectHeader
          title="CheXGround: Anatomical Region Tokens for Grounded Longitudinal Chest X-ray Interpretation"
          logoSrc={paperAsset("Figures/logo.jpeg")}
          authors={authors.map((author) => (
            <a href={author.href} key={author.name}>
              {author.name}<sup>{author.institutions}</sup>
            </a>
          ))}
          institutions={
            <>
              <span><sup>1</sup> Ajman University, UAE</span>
              <span><sup>2</sup> University of Birmingham, UK</span>
              <span><sup>3</sup> Khalifa University, UAE</span>
              <span><sup>4</sup> University of Western Australia, Australia</span>
            </>
          }
          publishedAt="✨ BMVC 2026 ✨"
        />
        <ProjectLinks
          links={[
            { iconId: "archive", label: "Paper", href: PAPER_URL },
            {
              iconId: "github",
              label: "Code (Coming Soon)",
              href: "https://github.com/adonaydem/chexground",
            },
          ]}
        />
        <TextBlock title="Abstract">
          Recent radiology multi-modal language models have made substantial progress
          in chest X-ray report generation, visual question answering, and temporal
          reasoning. While longitudinal chest X-ray interpretation compares sequential
          examinations to describe change, visual grounding aims to connect clinical
          language with localized image evidence. Although longitudinal modeling and
          visual grounding have each advanced radiology language models, how localized
          visual evidence can support longitudinal interpretation remains
          under-explored. We introduce CheXGround, a region-grounded longitudinal chest
          X-ray language model that represents paired studies through corresponding
          anatomical regions. CheXGround extracts anatomical regions from current and
          prior radiographs, encodes them as temporally enhanced Region-of-Interest
          (ROI) tokens, and combines them with global temporal image context during
          generation. To connect these region tokens with clinical text, we propose
          Temporal Region–Phrase Alignment, a pretraining objective that aligns temporal
          anatomical representations with localized report phrases. We evaluate
          CheXGround on single-study and longitudinal Visual Question Answering (VQA),
          longitudinal findings generation, temporal grounded VQA, and anatomical
          grounding. Across these tasks, CheXGround improves clinical language quality,
          temporal reasoning, and localization accuracy over recent baselines. Our
          results suggest that organizing longitudinal evidence at the anatomical level
          is a strong representation for grounded radiology language modeling.
        </TextBlock>
        <section aria-label="Paper figures" className="figure-gallery">
          <PaperFigure
            alt="Overview of the grounded radiology tasks studied in this work"
            src="task-overview.png"
          />
          <div className="figure-pair">
            <PaperFigure
              alt="Temporal anatomical ROI encoding and region-phrase alignment"
              src="method-region-phrase.png"
            />
            <PaperFigure
              alt="CheXGround architecture"
              src="method-architecture.png"
            />
          </div>
          <div className="figure-pair">
            <PaperFigure
              alt="Qualitative comparison of single-image and temporal grounding"
              src="qualitative-grounding.png"
            />
            <PaperFigure
              alt="Qualitative comparison on anatomy grounding"
              src="qualitative-anatomy.png"
            />
          </div>
        </section>
        <CiteUs
          entryType="inproceedings"
          citationKey="gebremedhin2026chexground"
          title="CheXGround: Anatomical Region Tokens for Grounded Longitudinal Chest X-ray Interpretation"
          authors={authors.map((author) => author.name)}
          booktitle="British Machine Vision Conference (BMVC)"
          year="2026"
        />
      </main>
      <Footer />
    </>
  );
}
