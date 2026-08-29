import * as React from "react";
import { styled } from "@pigment-css/react";
import Footer from "../component/Footer";
import ProjectHeader from "../component/ProjectHeader";
import TextBlock from "../component/TextBlock";
import ProjectLinks from "../component/ProjectLink";
import ImageBlock from "../component/ImageBlock/ImageBlock";
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

const anatomyGroundingColumns = [
  { key: "qwen3", label: "Qwen3-VL-8B" },
  { key: "chexagent", label: "CheXagent" },
  { key: "radvlm", label: "RadVLM" },
  { key: "ours", label: "Ours" },
];

const anatomyGroundingRows = [
  { key: "svc", label: "SVC" },
  {
    key: "right_costophrenic_angle",
    label: "right costophrenic angle",
  },
  { key: "aortic_arch", label: "aortic arch" },
];

function paperAsset(path) {
  const basePath =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_PATH || ""
      : "";

  return `${basePath}/paper-assets/${path}`;
}

function PdfPanel({ src, label, height }) {
  const asset = paperAsset(src);

  return (
    <object
      aria-label={label}
      data={`${asset}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
      height={height}
      type="application/pdf"
      width="100%"
    >
      <a href={asset}>{label}</a>
    </object>
  );
}

function ThreePanelFigure({ panels }) {
  return (
    <table width="100%">
      <tbody>
        <tr>
          {panels.map((panel) => (
            <td key={panel.label} width={panel.width}>
              <PdfPanel {...panel} />
              <strong>{panel.label}</strong>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function AnatomyGroundingFigure() {
  return (
    <table width="100%">
      <tbody>
        {anatomyGroundingRows.map((row) => (
          <tr key={row.key}>
            {anatomyGroundingColumns.map((column) => (
              <td key={column.key} width="23.5%">
                <img
                  alt={`${column.label}: ${row.label}`}
                  height="852"
                  src={paperAsset(
                    `images/anatomy_grounding/output1/${column.key}_${row.key}.jpg`,
                  )}
                  width="1024"
                />
              </td>
            ))}
          </tr>
        ))}
        <tr>
          {anatomyGroundingColumns.map((column) => (
            <td key={column.key}>{column.label}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default function Home() {
  return (
    <>
      <Main>
        <ProjectHeader
          title="CheXGround: Anatomical Region Tokens for Grounded Longitudinal Chest X-ray Interpretation"
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
        <ImageBlock
          media={
            <PdfPanel
              height="282"
              label="Overview of the grounded radiology tasks"
              src="images/hook.pdf"
            />
          }
        >
          <strong>Overview of the grounded radiology tasks studied in this work.</strong>{" "}
          CheXGround supports grounded interaction for chest X-ray interpretation,
          spanning spatio-temporal comparison, finding-level reasoning, referring
          conversations, and anatomical localization. These tasks move beyond answer
          generation alone by requiring radiology reasoning to be grounded across
          multiple granularities.
        </ImageBlock>
        <ImageBlock
          media={
            <ThreePanelFigure
              panels={[
                {
                  src: "Figures/Fig2_a.pdf",
                  label: "(a)",
                  width: "65%",
                  height: "261",
                },
                {
                  src: "Figures/Fig2_b_U.pdf",
                  label: "(b)",
                  width: "15%",
                  height: "180",
                },
                {
                  src: "Figures/Fig2_c.pdf",
                  label: "(c)",
                  width: "15%",
                  height: "180",
                },
              ]}
            />
          }
        >
          <strong>Temporal anatomical ROI encoding and region–phrase alignment.</strong>
          <br />
          (a) TRPA encodes current and prior chest X-rays, extracts anatomical regions
          with ROIAlign, and aligns them with localized report phrases. The spatial ROI
          transformer in (b) refines each region using local and global context, while
          the temporal ROI transformer in (c) models current and prior causal
          relationships. <em>MHSA denotes multi-head self-attention.</em>
        </ImageBlock>
        <ImageBlock
          media={
            <ThreePanelFigure
              panels={[
                {
                  src: "Figures/llm-1.pdf",
                  label: "(a)",
                  width: "56%",
                  height: "243",
                },
                {
                  src: "Figures/Fig3_b.pdf",
                  label: "(b)",
                  width: "20%",
                  height: "243",
                },
                {
                  src: "Figures/trf-2.pdf",
                  label: "(c)",
                  width: "20%",
                  height: "243",
                },
              ]}
            />
          }
        >
          <strong>CheXGround architecture.</strong> (a) Temporally aligned image tokens
          and anatomical ROI tokens are injected into the language model. (b) The
          Temporal Alignment Connector (TAC), following Libra, aligns current–prior
          image features. (c) Temporal Region Fusion (TRF) fuses current–prior
          anatomical ROI representations.
        </ImageBlock>
        <ImageBlock
          media={
            <PdfPanel
              height="421"
              label="Qualitative comparison of single-image and temporal grounding"
              src="images/fig444.pdf"
            />
          }
        >
          Qualitative comparison of single-image and temporal grounding. CheXGround
          shows more accurate anatomical localization and more faithful language than
          baselines, grounding findings in the correct regions while capturing
          longitudinal changes. <u>Underlined text</u> denotes inaccuracies.
        </ImageBlock>
        <ImageBlock media={<AnatomyGroundingFigure />}>
          <strong>Qualitative comparison on anatomy grounding.</strong> Rows show
          anatomical regions: SVC, right costophrenic angle, and aortic arch,
          respectively. Dashed green boxes represent ground truth; zoom in for clarity.
        </ImageBlock>
        <CiteUs
          entryType="inproceedings"
          citationKey="gebremedhin2026chexground"
          title="CheXGround: Anatomical Region Tokens for Grounded Longitudinal Chest X-ray Interpretation"
          authors={authors.map((author) => author.name)}
          booktitle="British Machine Vision Conference (BMVC)"
          year="2026"
        />
      </Main>
      <Footer />
    </>
  );
}

const Main = styled.main`
  padding: 4rem var(--global-padding);
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
