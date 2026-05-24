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
    intro: "aceintellegence researches practical, safe, and useful automation systems.",
    body: "Our research programs focus on reliability, governance, and real world impact so teams can deploy automation with confidence. Below is our conceptual workflow orchestration model for ChatPDF.",
  },
  about: {
    title: "About",
    intro: "We build workflow automation products and platforms.",
    body: "aceintellegence is a small, execution focused team building automation systems that teams can trust. We care about approvals, governance, and operational clarity.",
    sections: [
      {
        title: "What we do",
        content: "We design and ship automation workflows: intake, approvals, execution, and reporting.",
      },
      {
        title: "How we work",
        content: "We iterate quickly, measure outcomes, and prioritize production grade reliability over demos.",
      },
    ],
  },
  insights: {
    title: "Insights",
    intro: "Practical notes for builders shipping automation systems.",
    body: "Short, implementation first writing on governance, security, latency, and patterns that work in production.",
    sections: [
      {
        title: "From manual ops to trusted automation",
        content: "A blueprint for turning repetitive work into reliable, approval friendly workflows.",
        code: "See: /insights/pdfs-to-product",
      },
      {
        title: "Workflow quality essentials",
        content: "How to measure throughput, exceptions, and business impact without losing trust.",
        code: "See: /insights/rag-evaluation",
      },
      {
        title: "Approval and governance patterns",
        content: "Least privilege approvals and boundaries for sensitive operations.",
        code: "See: /insights/secure-ingestion",
      },
    ],
  },
  "insights/pdfs-to-product": {
    title: "From manual ops to trusted automation",
    intro: "Turn repetitive work into dependable workflows.",
    body: "Start with a clear workflow contract, add approvals and monitoring, then iterate with evaluation. The goal is not just speed, it is automation you can trust.",
    sections: [
      {
        title: "Step 1: Workflow contract",
        content: "Define owners, inputs, approvals, and success criteria.",
      },
      {
        title: "Step 2: Guardrails",
        content: "Require approvals and surface context for every automated action.",
      },
      {
        title: "Step 3: Evaluation loop",
        content: "Track outcomes and regressions as workflows evolve.",
      },
    ],
  },
  "insights/rag-evaluation": {
    title: "Workflow quality essentials",
    intro: "Measure what matters before you optimize.",
    body: "Good automation systems track throughput, exception rates, and user-perceived usefulness. Start small with curated scenarios and expand coverage as you learn.",
  },
  "insights/secure-ingestion": {
    title: "Approval and governance patterns",
    intro: "Keep sensitive operations safe by design.",
    body: "Use least privilege for automation steps, isolate workspaces, and ensure every action is scoped to the right owner. Treat approvals as privileged operations.",
  },
  "insights/latency-budgets": {
    title: "Automation latency budgets",
    intro: "Where time goes and where to win it back.",
    body: "Separate queue time from execution time. Cache expensive steps, keep handoffs clear, and measure end to end workflow latency.",
  },
  "services/document-intelligence": {
    title: "Workflow Automation",
    intro: "Automation systems that are production ready.",
    body: "We build workflows for intake, approvals, execution, and reporting with clear contracts, observability, and safety boundaries.",
    sections: [
      {
        title: "Intake",
        content: "Capture requests, normalize inputs, and route work to the right owners.",
      },
      {
        title: "Approvals",
        content: "Define decision checkpoints, permissions, and human handoffs.",
      },
      {
        title: "Reporting",
        content: "Track outcomes, exceptions, and SLA adherence across workflows.",
      },
    ],
  },
  "services/rag": {
    title: "Human in the loop",
    intro: "Guardrails that keep automation safe.",
    body: "We design approval flows that stay reliable as your operations scale, with systematic evaluation and clear exception handling.",
  },
  "services/voice": {
    title: "Operator Experience",
    intro: "Human friendly dashboards and control planes.",
    body: "Give operators clear queues, approvals, and escalation paths for every automated workflow.",
  },
  "industries/startups": {
    title: "Startups",
    intro: "Ship automation without slowing down your roadmap.",
    body: "We help startups move fast while keeping workflows reliable and systems maintainable: pragmatic tooling, clear contracts, and measurable outcomes.",
  },
  "industries/finance": {
    title: "Finance",
    intro: "Trusted automation for policy, compliance, and approvals.",
    body: "Build scoped workflows over controlled datasets and emphasize auditability through approvals and access controls.",
  },
  "industries/healthcare": {
    title: "Healthcare",
    intro: "Reliable workflows for complex operations.",
    body: "Focus on access boundaries, approvals, and careful evaluation. Treat data handling as a first class constraint.",
  },
  "industries/legal": {
    title: "Legal",
    intro: "Approval-first workflows for contracts and policies.",
    body: "Design for verification: approvals, source context, and workflows that reduce operational risk.",
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
    body: "From infrastructure to application flows, aceintellegence follows secure engineering practices and continuous hardening. We never store your data in hybrid mode and design automation with approvals and audit trails.",
  },
  "use-cases": {
    title: "Use Cases",
    intro: "See how teams apply aceintellegence in production.",
    body: "Explore proven patterns across finance, legal, operations, and engineering teams who use our platform for trusted automation.",
  },
  docs: {
    title: "Documentation",
    intro: "Technical documentation for the Ace Intelligence platform.",
    body: "Learn how to integrate our API, set up your environment, and deploy enterprise grade workflow automation.",
    sections: [
      {
        title: "Quick Start",
        content: "Get started with ChatPDF and our automation platform. Connect your first workflow and start testing.",
      },
      {
        title: "API Overview",
        content: "Our REST API lets you trigger workflows, manage approvals, and integrate with your existing systems.",
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
    body: "Integrate Ace Intelligence into your applications with our RESTful automation endpoints.",
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
    body: "Choose the plan that fits your enterprise needs. All plans include our core promise: trustworthy automation.",
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
    body: "Automation tools that help teams orchestrate approvals, execute tasks, and track outcomes with confidence.",
    sections: [
      {
        title: "ChatPDF Core",
        content: "Workflow automation platform with multi modal intake (PDF, CSV, JSON, code, audio). Role based access control included.",
        code: "Private beta",
      },
      {
        title: "Workflow Orchestration Layer",
        content: "Coordinates tasks, approvals, retries, and escalations across systems.",
        code: "Active development",
      },
      {
        title: "Automation Agent",
        content: "Executes trusted actions, tracks state, and escalates when humans need to intervene.",
        code: "Active development",
      },
      {
        title: "Enterprise Dashboard",
        content: "Next.js dashboard for managing documents, users, analytics, and access control.",
        code: "In progress",
      },
    ],
  },
  status: {
    title: "System Status",
    intro: "Current service availability and incident updates.",
    body: "We share maintenance windows and incident notes here as they happen.",
    sections: [
      {
        title: "API Status",
        content: "Public API endpoints for beta customers.",
        code: "Monitoring",
      },
      {
        title: "Recent updates",
        content: "No public incidents reported in the last 7 days.",
        code: "Last updated weekly",
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
        content: "All data is encrypted in transit and at rest. Approvals and audit trails protect sensitive actions.",
      },
      {
        title: "User Rights",
        content: "You control your data. Request export or deletion at any time. Contact yashco.ltd@gmail.com.",
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
    body: "Our team can help with onboarding, architecture reviews, and troubleshooting.",
    sections: [
      {
        title: "Documentation",
        content: "Browse our docs for guides, API references, and integration tutorials.",
        code: "Visit /docs",
      },
      {
        title: "FAQ",
        content: "What file types are supported? PDF, CSV, JSON, code files, and audio.\nIs there a rate limit? It depends on your plan and workload profile.\nHow do you measure answer quality? We use citations, evaluation sets, and user feedback loops.",
      },
    ],
  },
  contact: {
    title: "Contact Us",
    intro: "Get in touch with the Ace Intelligence team.",
    body: "Reach out for demos, partnerships, or support. We respond within 1-2 business days.",
    sections: [
      {
        title: "Support",
        content: "For general inquiries, enterprise sales, and technical support.",
        code: "Email: yashco.ltd@gmail.com",
      },
      {
        title: "Support",
        content: "For general inquiries, enterprise sales, and technical support.",
        code: "Email: 401anshgajera@gmail.com",
      },
      {
        title: "Support",
        content: "For general inquiries, enterprise sales, and technical support.",
        code: "Email: omchoksi.pro@gmail.com",
      },
    ],
  },
  templates: {
    title: "Project Templates",
    intro: "Accelerators that help teams ship automation faster.",
    body: "Our templates package common patterns for intake, approvals, and execution so you can move from prototype to production with fewer surprises.",
    sections: [
      {
        title: "Starter kits",
        content: "Opinionated setups for Next.js + API backends with workflow orchestration and approvals.",
        code: "Available on request",
      },
      {
        title: "Integration blueprints",
        content: "Reference integrations for storage, auth, and operational systems used in production.",
        code: "Contact us for access",
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
    intro: "We&apos;re preparing this page and will publish more detail soon.",
    body: "If you&apos;re looking for something specific, reach out and we&apos;ll point you to the right resources.",
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
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Workflow Automation Visualization</h2>
            <p className="text-sm text-slate-600 mb-6">Interactive 3D visualization of our automation workflow model. Hover over nodes for details. Drag to rotate, scroll to zoom.</p>
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
                    <code>
                      {section.code.startsWith("Email:") ? (
                        <a
                          href={`mailto:${section.code.replace("Email: ", "")}`}
                          className="hover:text-blue-300 transition-colors"
                        >
                          {section.code}
                        </a>
                      ) : (
                        section.code
                      )}
                    </code>
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
