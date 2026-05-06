import Link from "next/link";
import { ArrowRight, CheckCircle, Code, Zap, Shield, BookOpen, FileText, Layers, Calendar, Activity } from "lucide-react";
import { RagWorkflow3D } from "@/components/home/RagWorkflow3D";

type PageContent = {
  title: string;
  intro: string;
  body: string;
  sections?: {
    title: string;
    content: string;
    code?: string;
  }[];
};

const contentMap: Record<string, PageContent> = {
  research: {
    title: "Research",
    intro: "aceintellegence researches practical, safe, and useful AI systems.",
    body: "Our research programs focus on reliability, model quality, and real-world impact so teams can deploy AI with confidence. Below is our conceptual RAG (Retrieval-Augmented Generation) workflow for ChatPDF.",
  },
  about: {
    title: "About",
    intro: "We build document intelligence products and platforms.",
    body: "aceintellegence is a small, execution-focused team building practical RAG systems that teams can ship. We care about grounded answers, secure ingestion, and developer ergonomics.",
    sections: [
      {
        title: "What we do",
        content: "We design and ship document intelligence workflows: ingestion, retrieval, evaluation, and product integration.",
      },
      {
        title: "How we work",
        content: "We iterate quickly, measure outcomes, and prioritize production-grade reliability over demos.",
      },
    ],
  },
  insights: {
    title: "Insights",
    intro: "Practical notes for builders shipping RAG systems.",
    body: "Short, implementation-first writing on evaluation, security, latency, and patterns that work in production.",
    sections: [
      {
        title: "From PDFs to product features",
        content: "A blueprint for turning document collections into reliable, citation-backed user experiences.",
        code: "See: /insights/pdfs-to-product",
      },
      {
        title: "RAG evaluation essentials",
        content: "How to measure answer quality, citation faithfulness, and regression risk.",
        code: "See: /insights/rag-evaluation",
      },
      {
        title: "Secure ingestion patterns",
        content: "Least-privilege pipelines and boundaries for sensitive documents.",
        code: "See: /insights/secure-ingestion",
      },
    ],
  },
  "insights/pdfs-to-product": {
    title: "From PDFs to product features",
    intro: "Turn document collections into dependable product experiences.",
    body: "Start with a clear ingestion contract, add retrieval + citations, then iterate with evaluation. The goal is not just answers—it is answers you can trust.",
    sections: [
      {
        title: "Step 1: Ingestion contract",
        content: "Define supported file types, parsing behavior, and extraction guarantees.",
      },
      {
        title: "Step 2: Grounding",
        content: "Require citations and surface the source context in the UI.",
      },
      {
        title: "Step 3: Evaluation loop",
        content: "Track quality and regressions as you change chunking, prompts, and retrieval.",
      },
    ],
  },
  "insights/rag-evaluation": {
    title: "RAG evaluation essentials",
    intro: "Measure what matters before you optimize.",
    body: "Good RAG systems track groundedness, citation quality, and user-perceived usefulness. Start small with curated scenarios and expand coverage as you learn.",
  },
  "insights/secure-ingestion": {
    title: "Secure ingestion patterns",
    intro: "Keep sensitive documents safe by design.",
    body: "Use least privilege for ingestion workers, isolate workspaces, and ensure every retrieval is scoped to the user's access. Treat indexing as a privileged operation.",
  },
  "insights/latency-budgets": {
    title: "Latency budgets for document Q&A",
    intro: "Where time goes—and where to win it back.",
    body: "Separate retrieval latency from generation latency. Cache expensive steps, keep context short, and measure end-to-end response time for real user queries.",
  },
  "services/document-intelligence": {
    title: "Document Intelligence",
    intro: "Ingestion, parsing, and retrieval systems that are production-ready.",
    body: "We build pipelines for upload, extraction, indexing, and retrieval with clear contracts, observability, and safety boundaries.",
    sections: [
      {
        title: "Ingestion",
        content: "Parsing, metadata extraction, and normalization across common document types.",
      },
      {
        title: "Search",
        content: "Embeddings + hybrid retrieval patterns with workspace-level isolation.",
      },
      {
        title: "Citations",
        content: "Answer grounding with source references your users can verify.",
      },
    ],
  },
  "services/rag": {
    title: "RAG Workflows",
    intro: "Grounded answers with evaluation and iteration loops.",
    body: "We design RAG systems that stay reliable as your documents grow and your product evolves—with systematic evaluation and clear failure-mode handling.",
  },
  "services/voice": {
    title: "Voice Interfaces",
    intro: "Voice-enabled document intelligence with streaming pipelines.",
    body: "Add voice interactions using STT/TTS flows and keep responses grounded with citations and retrieval context.",
  },
  "industries/startups": {
    title: "Startups",
    intro: "Ship document intelligence without slowing down your roadmap.",
    body: "We help startups move fast while keeping answers grounded and systems maintainable: pragmatic tooling, clear contracts, and measurable outcomes.",
  },
  "industries/finance": {
    title: "Finance",
    intro: "Grounded answers for policy, compliance, and internal knowledge.",
    body: "Build scoped retrieval over controlled datasets and emphasize auditability through citations and access controls.",
  },
  "industries/healthcare": {
    title: "Healthcare",
    intro: "Reliable retrieval patterns for complex documentation.",
    body: "Focus on access boundaries, groundedness, and careful evaluation. Treat data handling as a first-class constraint.",
  },
  "industries/legal": {
    title: "Legal",
    intro: "Citations-first document Q&A for contracts and policies.",
    body: "Design for verification: citations, source snippets, and workflows that reduce hallucination risk.",
  },
  "economic-futures": {
    title: "Economic Futures",
    intro: "We study how AI changes work, productivity, and opportunity.",
    body: "aceintellegence explores economic outcomes and builds tools that support sustainable growth for developers, startups, and enterprises.",
  },
  constitution: {
    title: "Company Constitution",
    intro: "Our constitution defines long-term product and safety principles.",
    body: "It guides how we prioritize user value, technical excellence, and responsible scaling in every release.",
  },
  transparency: {
    title: "Transparency",
    intro: "We communicate openly about product direction and system behavior.",
    body: "aceintellegence publishes clear updates so users understand capabilities, limitations, and expected improvements.",
  },
  security: {
    title: "Security",
    intro: "Security is built into every layer of the platform.",
    body: "From infrastructure to application flows, aceintellegence follows secure engineering practices and continuous hardening. We never store your data in hybrid mode and use Zero-Knowledge RAG (ZKRAG) concepts for privacy.",
  },
  "use-cases": {
    title: "Use Cases",
    intro: "See how teams apply aceintellegence in production.",
    body: "Explore proven patterns across finance, legal, operations, and engineering teams who use our platform for accurate document intelligence.",
  },
  docs: {
    title: "Documentation",
    intro: "Technical documentation for Ace Intelligence platform.",
    body: "Learn how to integrate our API, set up your environment, and deploy enterprise-grade document intelligence.",
    sections: [
      {
        title: "Quick Start",
        content: "Get started with ChatPDF and our document intelligence platform. Upload your first document and start querying.",
      },
      {
        title: "API Overview",
        content: "Our REST API lets you upload documents, query with citations, and integrate with your existing systems.",
      },
      {
        title: "Authentication",
        content: "Secure your API requests with JWT tokens or OAuth (Google, GitHub). Role-based access control included.",
      },
      {
        title: "Hybrid Deployment",
        content: "Deploy on your own infrastructure for maximum privacy. Data never leaves your network in hybrid mode.",
      },
    ],
  },
  api: {
    title: "API Reference",
    intro: "Complete API reference for developers.",
    body: "Integrate Ace Intelligence into your applications with our RESTful API endpoints.",
    sections: [
      {
        title: "Base URL",
        content: "All API requests go through our secure endpoint.",
        code: "https://api.aceintelligence.systems/v1",
      },
      {
        title: "Rate Limits",
        content: "Request limits based on your plan.",
        code: "Business Local: Custom\nBusiness Hybrid: 300 req/min\nEnterprise: Unlimited",
      },
    ],
  },
  pricing: {
    title: "Pricing",
    intro: "Transparent pricing for every stage.",
    body: "Choose the plan that fits your enterprise needs. All plans include our core promise: near-zero hallucinations.",
    sections: [
      {
        title: "Business Local",
        content: "Self-hosted deployment with full control. Your data never leaves your infrastructure.",
        code: "Custom pricing",
      },
      {
        title: "Business Hybrid",
        content: "Our infrastructure with your data. Best for teams wanting managed services with privacy.",
        code: "Starting at $2,000/month",
      },
      {
        title: "Enterprise",
        content: "Full-scale deployment with custom integrations, SLA guarantees, and dedicated support.",
        code: "Starting at $5,000/month",
      },
    ],
  },
  projects: {
    title: "Our Product",
    intro: "ChatPDF and the Ace Intelligence platform.",
    body: "Production-grade AI automation agents that query and navigate massive unstructured enterprise data with near-zero hallucinations.",
    sections: [
      {
        title: "ChatPDF Core",
        content: "Conversational AI platform with multi-modal ingestion (PDF, CSV, JSON, code, audio). Role-based access control included.",
        code: "In Beta",
      },
      {
        title: "Hybrid Retrieval Pipeline",
        content: "Combines vector search (Qdrant) with knowledge graph reasoning (NetworkX) for accurate answers.",
        code: "Production",
      },
      {
        title: "Crawler Agent",
        content: "Autonomous agent that maps relationships in your data like a human researcher would.",
        code: "Production",
      },
      {
        title: "Enterprise Dashboard",
        content: "Next.js dashboard for managing documents, users, analytics, and access control.",
        code: "In Development",
      },
    ],
  },
  status: {
    title: "System Status",
    intro: "Real-time status of Ace Intelligence services.",
    body: "Monitor API availability, latency, and system health.",
    sections: [
      {
        title: "API Status",
        content: "Current operational status.",
        code: "Operational",
      },
      {
        title: "Uptime (30 days)",
        content: "Service availability over the past month.",
        code: "99.98%",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We protect your data with clear privacy practices.",
    body: "Your data privacy is our priority, especially in hybrid deployment mode.",
    sections: [
      {
        title: "Data Collection",
        content: "We collect only essential data to provide our services. In hybrid mode, your data is never stored on our servers.",
      },
      {
        title: "Data Security",
        content: "All data is encrypted in transit and at rest. ZKRAG ensures zero-knowledge processing where applicable.",
      },
      {
        title: "User Rights",
        content: "You control your data. Request export or deletion at any time. Contact privacy@aceintelligence.systems.",
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    intro: "Terms define usage rules and responsibilities.",
    body: "Transparent agreement between Ace Intelligence and our users.",
    sections: [
      {
        title: "Acceptable Use",
        content: "No illegal activities, no bypassing security measures, no mass scraping of our services.",
      },
      {
        title: "Account Responsibilities",
        content: "Keep your API keys secure. You are responsible for all activity under your account.",
      },
    ],
  },
  support: {
    title: "Support",
    intro: "Get help with Ace Intelligence products.",
    body: "Our team is here to assist with technical questions and enterprise onboarding.",
    sections: [
      {
        title: "Documentation",
        content: "Browse our docs for guides, API references, and integration tutorials.",
        code: "Visit /docs",
      },
      {
        title: "FAQ",
        content: "What file types are supported? PDF, CSV, JSON, code files, and audio.\nIs there a rate limit? Depends on your plan. Enterprise has unlimited access.\nHow accurate are the answers? Near-zero hallucinations by design.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    intro: "Get in touch with the Ace Intelligence team.",
    body: "We'd love to hear from you. Reach out for demos, partnerships, or support.",
    sections: [
      {
        title: "General Inquiries",
        content: "For questions about our products and services.",
        code: "Email: hello@aceintelligence.systems",
      },
      {
        title: "Enterprise Sales",
        content: "For enterprise plans, custom pricing, and partnerships.",
        code: "Email: business@aceintelligence.systems",
      },
      {
        title: "Technical Support",
        content: "For technical issues and API support.",
        code: "Email: support@aceintelligence.systems",
      },
      {
        title: "Location",
        content: "Based in Ahmedabad/Surat, India. Expanding to Bangalore for startup ecosystem access.",
        code: "Remote-first team",
      },
    ],
  },
};

function formatTitleFromSlug(slug: string[]): string {
  return slug
    .map((part) => part.replace(/-/g, " "))
    .join(" / ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  const content = contentMap[key] ?? {
    title: formatTitleFromSlug(slug),
    intro: "This page is now active and ready for content.",
    body: "aceintellegence is a startup founded by OMCHOKSI108, firefistisdead, and anshgajera. This section can be extended with detailed product, research, or documentation content.",
  };

  return (
    <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-8 sm:p-10 shadow-sm">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-3">aceintellegence</p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mb-4">{content.title}</h1>
        <p className="text-lg text-slate-700 mb-5">{content.intro}</p>
        <p className="text-slate-600 leading-relaxed mb-8">{content.body}</p>

        {key === "research" && (
          <div className="my-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">RAG Workflow Visualization</h2>
            <p className="text-sm text-slate-600 mb-6">Interactive 3D visualization of our Retrieval-Augmented Generation pipeline. Hover over nodes for details. Drag to rotate, scroll to zoom.</p>
            <RagWorkflow3D />
          </div>
        )}

        {content.sections && content.sections.length > 0 && (
          <div className="space-y-6 mt-10">
            {content.sections.map((section, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-50 px-5 py-3 border-b border-slate-200">
                  <h3 className="font-medium text-slate-900">{section.title}</h3>
                  {section.content && (
                    <p className="text-sm text-slate-600 mt-1">{section.content}</p>
                  )}
                </div>
                {section.code && (
                  <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-sm font-mono">
                    <code>{section.code}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-lg bg-slate-900 text-white px-4 py-2 text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Open docs
          </Link>
        </div>
      </div>
    </section>
  );
}
