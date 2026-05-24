import { Inbox, FileText, Route, Cpu, Network, MessageCircle, LayoutDashboard, TrendingUp, Server } from "lucide-react";

const services = [
  {
    title: "Intelligent Workflow Automations",
    subtitle: "Quick Wins & Integrations",
    description: "Rapid-deployment automations that deliver immediate operational ROI.",
    icon: Route,
    items: [
      {
        icon: Inbox,
        title: "Smart Email Triage & Routing",
        description: "Systems built with n8n and LLM APIs to monitor inboxes, classify intent, and route data.",
      },
      {
        icon: FileText,
        title: "Automated Document Parsing",
        description: "Extracting structured data from PDFs, invoices, or resumes using vision models.",
      },
      {
        icon: Route,
        title: "Zero-Touch Lead Routing",
        description: "Connecting web forms to CRMs to instantly draft replies and reduce response times.",
      },
    ],
  },
  {
    title: "Custom Generative AI & Conversational Agents",
    subtitle: "Deep-Engineering Architectures",
    description: "Secure, production-grade AI systems that reason, research, and execute.",
    icon: Cpu,
    items: [
      {
        icon: Network,
        title: "Enterprise RAG Architectures",
        description: "Secure pipelines allowing companies to chat with proprietary databases and SOPs without hallucination.",
      },
      {
        icon: Cpu,
        title: "Multi-Agent Workflows",
        description: "Orchestrated agents that autonomously research, reason, and execute complex tasks.",
      },
      {
        icon: MessageCircle,
        title: "Tier-1 Support Bots",
        description: "Advanced chatbots that resolve user queries and escalate smoothly to human agents.",
      },
    ],
  },
  {
    title: "Enterprise Cloud Infrastructure & Analytics",
    subtitle: "Scalable Platforms",
    description: "High-performance backends and observability systems for mission-critical operations.",
    icon: Server,
    items: [
      {
        icon: LayoutDashboard,
        title: "Custom Admin Panels & Dashboards",
        description: "Centralized internal tools designed to replace fragmented SaaS subscriptions.",
      },
      {
        icon: TrendingUp,
        title: "Predictive AI",
        description: "Anomaly detection models for real-time flagging in finance, cybersecurity, or server logs.",
      },
      {
        icon: Server,
        title: "Scalable Backend APIs",
        description: "High-performance backends for processing massive data streams, such as algorithmic trading operations.",
      },
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Services</p>
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
          What we build
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Deep-engineering architectures and rapid-deployment capabilities purpose-built for B2B scale.
        </p>
      </div>

      <div className="space-y-16">
        {services.map((category, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <category.icon size={22} className="text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">{category.title}</h3>
                <p className="text-sm text-slate-500">{category.subtitle}</p>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-6 ml-0">{category.description}</p>

            <div className="grid md:grid-cols-3 gap-6">
              {category.items.map((item, iidx) => (
                <div
                  key={iidx}
                  className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                    <item.icon size={20} className="text-slate-700" />
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
