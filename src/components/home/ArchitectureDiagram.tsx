"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  theme: "base",
  themeVariables: {
    background: "#ffffff",
    primaryColor: "#ffffff",
    primaryTextColor: "#111827",
    primaryBorderColor: "#E5E7EB",
    lineColor: "#94A3B8",
    secondaryColor: "#ffffff",
    secondaryTextColor: "#111827",
    secondaryBorderColor: "#E5E7EB",
    tertiaryColor: "#ffffff",
    tertiaryTextColor: "#111827",
    tertiaryBorderColor: "#E5E7EB",
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
    fontSize: "13px",
    nodeBorder: "#E5E7EB",
    clusterBkg: "#ffffff",
    clusterBorder: "#E5E7EB",
    titleColor: "#111827",
    edgeLabelBackground: "#ffffff",
    nodeTextColor: "#111827",
  },
  flowchart: {
    useMaxWidth: true,
    htmlLabels: true,
    curve: "basis",
    padding: 16,
    nodeSpacing: 60,
    rankSpacing: 70,
  },
});

const architectureDef = `
graph TB
    classDef input fill:#EFF6FF,stroke:#2563EB,stroke-width:2px,color:#1E40AF,font-weight:600
    classDef inputText fill:#DBEAFE,stroke:#93C5FD,stroke-width:1.5px,color:#1E40AF

    classDef orchestration fill:#F5F3FF,stroke:#7C3AED,stroke-width:2px,color:#5B21B6,font-weight:600
    classDef agent fill:#EDE9FE,stroke:#A78BFA,stroke-width:1.5px,color:#5B21B6

    classDef external fill:#ECFEFF,stroke:#06B6D4,stroke-width:2px,color:#0E7490,font-weight:600
    classDef externalAPI fill:#CFFAFE,stroke:#22D3EE,stroke-width:1.5px,color:#0E7490

    classDef memory fill:#ECFDF5,stroke:#10B981,stroke-width:2px,color:#065F46,font-weight:600
    classDef memNode fill:#D1FAE5,stroke:#34D399,stroke-width:1.5px,color:#065F46

    classDef output fill:#FFF7ED,stroke:#F59E0B,stroke-width:2px,color:#92400E,font-weight:600
    classDef outputNode fill:#FEF3C7,stroke:#FBBF24,stroke-width:1.5px,color:#92400E

    subgraph Input["📡 Input Layer"]
        direction TB
        TG["Telegram Bot API"]:::inputText
        WB["Webhook Trigger"]:::inputText
    end

    subgraph Orchestration["⚙️ Agent Pipeline, 8 Specialized Agents"]
        direction TB
        INIT["🚀 Initialize State"]:::agent
        KG["🔑 Agent 1: Keyword Generator<br/><span style='font-size:11px;color:#7C3AED'>LLaMA 3.3 70B</span>"]:::agent
        RS["📚 Agent 2: Researcher<br/><span style='font-size:11px;color:#7C3AED'>arXiv + Semantic Scholar</span>"]:::agent
        LR["📋 Agent 3: Literature Reviewer"]:::agent
        ST["🧠 Agent 4: Research Strategist"]:::agent
        MA["📐 Agent 5: Methodology Analyzer"]:::agent
        CV["✅ Agent 6: Citation Validator"]:::agent
        FC["🔍 Agent 7: Fact Checker"]:::agent
        IF["📄 Agent 8: IEEE Formatter"]:::agent
    end

    subgraph External["🌐 External APIs"]
        direction TB
        ARX["arXiv API"]:::externalAPI
        SSC["Semantic Scholar"]:::externalAPI
        DDG["DuckDuckGo"]:::externalAPI
    end

    subgraph Memory["🧠 Vector Memory and RAG"]
        direction TB
        CDB[("ChromaDB")]:::memNode
        EMB["Cohere Embeddings"]:::memNode
    end

    subgraph Output["📤 Output Layer"]
        direction TB
        RESP["📄 IEEE Research Paper"]:::outputNode
        PDF["📥 PDF Export"]:::outputNode
        TD["💬 Telegram Delivery"]:::outputNode
    end

    TG -->|"message"| WB
    WB -->|"webhook"| INIT
    INIT --> KG
    KG -->|"keywords"| RS
    RS -->|"papers"| LR
    LR -->|"review"| ST
    ST -->|"strategy"| MA
    MA -->|"methodology"| CV
    CV -->|"validated"| FC
    FC -->|"verified"| IF

    RS -.->|"search"| ARX
    RS -.->|"search"| SSC
    RS -.->|"search"| DDG
    LR <-->|"store & retrieve"| CDB
    CDB <-->|"embed"| EMB

    IF -->|"paper"| RESP
    RESP --> PDF
    RESP --> TD
`;

const halluDef = `
graph LR
    classDef halluTitle fill:#FEF2F2,stroke:#EF4444,stroke-width:2px,color:#991B1B,font-weight:700
    classDef halluStep fill:#FEF2F2,stroke:#FCA5A5,stroke-width:1.5px,color:#991B1B

    subgraph Hallucination["🛡️ Hallucination Defense in Depth"]
        direction TB
      V1["🔒 1. Vector Anchored RAG<br/><span style='font-size:11px;color:#DC2626'>LLM grounded strictly in ChromaDB</span>"]:::halluStep
      V2["✓ 2. Multi Step Verification<br/><span style='font-size:11px;color:#DC2626'>Chain of accountability across 8 agents</span>"]:::halluStep
        V3["⚡ 3. Confidence Thresholds<br/><span style='font-size:11px;color:#DC2626'>Below 70% → auto human review</span>"]:::halluStep
        V4["📋 4. Audit Trails<br/><span style='font-size:11px;color:#DC2626'>Every inference logged with source citations</span>"]:::halluStep
    end
`;

export function ArchitectureDiagram() {
  const archRef = useRef<HTMLDivElement>(null);
  const halluRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const applyStyles = (svgElement: SVGElement) => {
      svgElement.setAttribute("style", "max-width: 100%; height: auto; display: block; margin: 0 auto;");
      const paths = svgElement.querySelectorAll("path");
      paths.forEach((p) => {
        const fill = p.getAttribute("fill");
        if (fill === "none" || !fill || fill === "#ffffff") {
          p.setAttribute("filter", "drop-shadow(0px 1px 2px rgba(0,0,0,0.05))");
        }
      });
      const labels = svgElement.querySelectorAll("span");
      labels.forEach((l) => {
        l.style.fontSize = "12px";
      });
    };

    if (archRef.current) {
      const id = "archDiagram_" + Date.now();
      mermaid.render(id, architectureDef).then(({ svg }) => {
        if (archRef.current) {
          archRef.current.innerHTML = svg;
          const svgEl = archRef.current.querySelector("svg");
          if (svgEl) applyStyles(svgEl);
        }
      });
    }
    if (halluRef.current) {
      const id2 = "halluDiagram_" + Date.now();
      mermaid.render(id2, halluDef).then(({ svg }) => {
        if (halluRef.current) {
          halluRef.current.innerHTML = svg;
          const svgEl2 = halluRef.current.querySelector("svg");
          if (svgEl2) applyStyles(svgEl2);
        }
      });
    }
  }, []);

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Multi Agent Architecture</h3>
        <div
          ref={archRef}
          className="p-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Hallucination Defense Pipeline</h3>
        <div
          ref={halluRef}
          className="p-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"
        />
      </div>
    </div>
  );
}
