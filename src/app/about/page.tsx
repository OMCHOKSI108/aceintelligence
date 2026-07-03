import Link from "next/link";
import { ArrowRight, Cpu, BrainCircuit, Cloud, Zap, Shield, Layers, FileText, Building2, BarChart3, MessageSquare, Database } from "lucide-react";

const capabilities = [
  {
    icon: Zap,
    title: "Intelligent Automation",
    items: ["Smart email triage & routing", "Automated document parsing", "Zero-touch lead routing"],
  },
  {
    icon: BrainCircuit,
    title: "Generative AI & Agents",
    items: ["Enterprise RAG architectures", "Multi-agent LLM workflows", "Tier-1 support bots"],
  },
  {
    icon: Cloud,
    title: "Cloud & Infrastructure",
    items: ["Custom admin dashboards", "Predictive AI models", "Scalable backend APIs"],
  },
];

const founders = [
  {
    name: "Om Choksi",
    role: "CTO & Chief Architect",
    expertise: "Multi-agent LLM workflows",
    username: "OMCHOKSI108",
    description:
      "Leads technical architecture, multi-agent orchestration, and enterprise RAG systems. Builds production-grade AI pipelines that scale.",
  },
  {
    name: "Ansh Gajera",
    role: "CEO",
    expertise: "Business transformation",
    username: "anshgajera",
    description:
      "Drives strategic vision, client partnerships, and business growth. Ensures every solution delivers measurable enterprise value.",
  },
  {
    name: "Yash Khare",
    role: "Founder",
    expertise: "RAG architecture",
    username: "firefistisdead",
    description:
      "Leads market positioning, RAG architecture development, and security-first AI deployment strategies.",
  },
];

export default function AboutPage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/3 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute right-[-2rem] top-[8rem] h-56 w-56 rounded-full bg-purple-200/25 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-4">
              About Ace Intelligence
            </p>
            <h1 className="headline-primary text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tight">
              Engineering the Future of Enterprise Intelligence
            </h1>
            <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-xl">
              We are an AI, automation, and intelligent software services agency. 
              We build bespoke AI architectures and scalable cloud infrastructure — 
              custom software solutions, not off-the-shelf SaaS.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Start a Project
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-50 to-transparent rounded-3xl rotate-6" />
              <div className="absolute inset-4 bg-gradient-to-tr from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center">
                <div className="text-center p-8">
                  <img src="/logo.png" alt="Ace Intelligence" className="w-16 h-16 mx-auto mb-4 brightness-0 invert" />
                  <p className="text-white text-sm font-mono opacity-80">Ace Intelligence</p>
                  <p className="text-white text-sm font-mono opacity-60">Systems</p>
                  <div className="mt-4 flex gap-2 justify-center">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase mb-4">
            Our Mission
          </p>
          <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-8">
            We founded Ace Intelligence Systems to bridge the gap between complex AI research and practical, scalable enterprise operations.
          </h2>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-8" />
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Every engagement is purpose-built. We eliminate manual operational bottlenecks by designing 
            deterministic, verifiable AI architectures that enterprises can trust. From rapid 48-hour 
            automations to full-scale multi-agent systems, we ship production-grade intelligence.
          </p>
        </div>
      </section>

      {/* Capability Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              What We Build
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
              Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:bg-blue-50 transition-colors">
                  <cap.icon size={24} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="headline-primary text-xl font-semibold text-slate-900 mb-4">{cap.title}</h3>
                <ul className="space-y-3">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute right-[-3rem] top-[10rem] h-64 w-64 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Leadership
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
              The team behind the intelligence
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-2xl mx-auto">
              Three AIML engineers from CHARUSAT University, graduating 2027, united by a vision to ship enterprise-grade AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <div
                key={founder.name}
                className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden border-2 border-slate-200 group-hover:border-blue-200 transition-colors">
                  <img
                    src={`https://avatars.githubusercontent.com/${founder.username}?size=160`}
                    alt={founder.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="headline-primary text-xl font-semibold text-slate-900">{founder.name}</h3>
                <p className="text-sm font-medium text-blue-600 mt-1">{founder.role}</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 mt-3">
                  {founder.expertise}
                </span>
                <p className="text-sm text-slate-600 mt-4 leading-relaxed">
                  {founder.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Work with us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
