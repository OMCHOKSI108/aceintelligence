import { BrainCircuit, Database, Network, Cloud, ArrowRight } from "lucide-react";

export function PremiumServices() {
  const services = [
    {
      title: "AI Workflow Automation",
      description: "Automate repetitive operations with AI, APIs, dashboards, and human-in-the-loop review.",
      builtWith: ["FastAPI", "Node.js", "n8n", "PostgreSQL", "Webhooks"],
      bestFor: "Internal operations, approvals, reporting, document routing",
      icon: BrainCircuit
    },
    {
      title: "RAG & Knowledge Systems",
      description: "Build chatbots and search systems grounded in company documents, PDFs, websites, databases, and knowledge bases.",
      builtWith: ["Qdrant", "ChromaDB", "LangChain", "LlamaIndex", "OpenAI/Gemini/Groq"],
      bestFor: "Document intelligence, support bots, internal knowledge search",
      icon: Database
    },
    {
      title: "AI Agents & Tool-Using Systems",
      description: "Create AI agents that can reason, call tools, use APIs, summarize data, and execute workflows.",
      builtWith: ["LangGraph", "CrewAI", "Function calling", "Custom tools"],
      bestFor: "Research automation, support workflows, decision assistants",
      icon: Network
    },
    {
      title: "AI Product Engineering",
      description: "Build full-stack AI products with backend APIs, authentication, databases, dashboards, and cloud deployment.",
      builtWith: ["Next.js", "FastAPI", "Express", "PostgreSQL", "Docker", "AWS/Render/Vercel"],
      bestFor: "MVPs, SaaS products, internal AI platforms",
      icon: Cloud
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] text-slate-400 uppercase mb-4">
            WHAT WE BUILD
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight mb-8">
            AI systems for real operations
          </h2>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            We don't build demos. We engineer production systems that integrate with your workflows and scale with your business.
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service, index) => (
            <div key={service.title} className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
              {/* Icon */}
              <div className="w-full max-w-sm mx-auto md:max-w-none">
                <div className="w-24 h-24 rounded-2xl bg-slate-800 flex items-center justify-center mb-8 border border-slate-700">
                  <service.icon size={48} className="text-slate-300" />
                </div>
              </div>

              {/* Content */}
              <div className="border-t border-slate-700 pt-8 md:pt-0 md:border-t-0 md:border-l md:border-slate-700 md:pl-12">
                <h3 className="text-2xl font-serif font-light mb-4 text-white">
                  {service.title}
                </h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-medium tracking-[0.1em] text-slate-500 uppercase mb-3">
                      BUILT WITH
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {service.builtWith.map((tech) => (
                        <span key={tech} className="px-3 py-1 rounded-full bg-slate-800 text-xs text-slate-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-medium tracking-[0.1em] text-slate-500 uppercase mb-3">
                      BEST FOR
                    </p>
                    <p className="text-sm text-slate-300">
                      {service.bestFor}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-full border border-slate-600 hover:border-slate-400 transition-all duration-300 glass-effect"
                  >
                    Discuss this service
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}