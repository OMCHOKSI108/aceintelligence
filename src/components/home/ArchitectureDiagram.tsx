"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  theme: "dark",
  themeVariables: {
    primaryColor: "#1e3a5f",
    primaryTextColor: "#e2e8f0",
    primaryBorderColor: "#3b82f6",
    lineColor: "#475569",
    secondaryColor: "#0f172a",
    tertiaryColor: "#1e293b",
    fontFamily: "ui-monospace, monospace",
    fontSize: "13px",
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: "basis",
  },
});

const architectureDef = `
graph TB
    subgraph Input["📥 Input Layer"]
        TG["Telegram Bot API"]
        WB["Webhook Trigger"]
    end

    subgraph Orchestration["⚙️ n8n Orchestration"]
        direction TB
        INIT["Initialize State"]
        KG["Agent 1: Keyword Generator<br/><i>LLaMA 3.3-70B</i>"]
        RS["Agent 2: Researcher<br/><i>arXiv + Semantic Scholar</i>"]
        LR["Agent 3: Literature Reviewer"]
        ST["Agent 4: Research Strategist"]
        MA["Agent 5: Methodology Architect"]
        ID["Agent 6: Implementation Designer"]
        ED["Agent 7: Experiment Designer"]
        PC["Agent 8: Paper Compiler<br/><i>IEEE Format</i>"]
    end

    subgraph Memory["💾 Vector Memory"]
        CDB[("ChromaDB")]
        EMB["Cohere Embeddings"]
    end

    subgraph External["🌐 External APIs"]
        ARX["arXiv API"]
        SSC["Semantic Scholar"]
        DDG["DuckDuckGo"]
    end

    subgraph Output["📤 Output"]
        RESP["JSON Response"]
        UI["Glassmorphism UI"]
    end

    TG --> WB
    WB --> INIT
    INIT --> KG
    KG --> RS
    RS --> LR
    LR --> ST
    ST --> MA
    MA --> ID
    ID --> ED
    ED --> PC

    RS ---> ARX
    RS ---> SSC
    RS ---> DDG
    LR <--> CDB
    CDB <--> EMB

    PC --> RESP
    RESP --> UI
`;

const halluDef = `
graph LR
    subgraph Hallucination["🛡️ Defense-in-Depth"]
        direction TB
        V1["1. Vector-Anchored RAG<br/><i>LLM grounded in ChromaDB</i>"]
        V2["2. Multi-Step Verification<br/><i>Chain of accountability</i>"]
        V3["3. Confidence Thresholds<br/><i>70% → human review</i>"]
        V4["4. Audit Trails<br/><i>Source citations on every output</i>"]
    end
`;

export function ArchitectureDiagram() {
  const archRef = useRef<HTMLDivElement>(null);
  const halluRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (archRef.current) {
      mermaid.render("archDiagram", architectureDef).then(({ svg }) => {
        if (archRef.current) archRef.current.innerHTML = svg;
      });
    }
    if (halluRef.current) {
      mermaid.render("halluDiagram", halluDef).then(({ svg }) => {
        if (halluRef.current) halluRef.current.innerHTML = svg;
      });
    }
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Multi-Agent Architecture</h3>
        <div
          ref={archRef}
          className="rounded-xl border border-slate-700 bg-slate-900 p-4 overflow-x-auto"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-3">Hallucination Defense Pipeline</h3>
        <div
          ref={halluRef}
          className="rounded-xl border border-slate-700 bg-slate-900 p-4 overflow-x-auto"
        />
      </div>
    </div>
  );
}
