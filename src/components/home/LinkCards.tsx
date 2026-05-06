import { ArrowRight, Shield, Search, Layers, FileText, Gauge, Plug, type LucideIcon } from "lucide-react";

interface LinkCardProps {
  title: string;
  category: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const links: LinkCardProps[] = [
  {
    title: "Document intelligence",
    category: "Service",
    description: "Ingestion, parsing, embeddings, and robust retrieval patterns.",
    href: "/services/document-intelligence",
    icon: FileText,
  },
  {
    title: "RAG workflows",
    category: "Service",
    description: "Grounded answers with citations, evaluation, and iteration loops.",
    href: "/services/rag",
    icon: Search,
  },
  {
    title: "Security & governance",
    category: "Trust",
    description: "Workspace boundaries, access controls, and safe deployment practices.",
    href: "/security",
    icon: Shield,
  },
  {
    title: "Platform & APIs",
    category: "Platform",
    description: "Composable APIs that slot into your existing product surface.",
    href: "/platform",
    icon: Layers,
  },
  {
    title: "Performance tuning",
    category: "Engineering",
    description: "Latency, caching, and scaling strategies for production workloads.",
    href: "/engineering",
    icon: Gauge,
  },
  {
    title: "Integrations",
    category: "Delivery",
    description: "Ship faster with templates, docs, and integration-ready patterns.",
    href: "/templates",
    icon: Plug,
  },
];

export function LinkCards() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Capabilities</p>
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
          Built like an enterprise team. Shipped like a startup.
        </h2>
        <p className="text-slate-600 text-lg mt-3 max-w-3xl">
          A practical set of services and platform building blocks for document intelligence—from ingestion to
          grounded answers.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="group p-5 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl hover:bg-white transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <link.icon size={18} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{link.category}</span>
                </div>
                <h3 className="text-base font-semibold text-slate-900 mt-1">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  {link.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 mt-4">
                  Learn more
                  <ArrowRight size={16} className="text-slate-500 group-hover:text-slate-700 transition-colors" />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}