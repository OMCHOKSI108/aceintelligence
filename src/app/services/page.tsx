import {
  Cpu,
  Globe,
  Contact,
  BrainCircuit,
  Package,
  BarChart3,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    icon: Cpu,
    title: "AI Automation Integration",
    problem: "Manual workflows eating up your team's precious hours?",
    solution:
      "We design and deploy custom AI pipelines that handle repetitive tasks end-to-end.",
    benefit: "Cut operational costs by up to 60% with 24/7 autonomous execution.",
  },
  {
    icon: Globe,
    title: "Website Development",
    problem: "An outdated site that fails to convert visitors into customers?",
    solution:
      "We build high-performance, conversion-optimized web experiences tailored to your brand.",
    benefit: "Launch in 2 weeks and see 3x faster load times and higher engagement.",
  },
  {
    icon: Contact,
    title: "CRM System Build",
    problem: "Disorganized leads with no clear view of your sales pipeline?",
    solution:
      "We build custom CRM systems that centralize contacts, track interactions, and automate follow-ups.",
    benefit: "Recover 15+ hours per week and boost lead conversion by 40%.",
  },
  {
    icon: BrainCircuit,
    title: "LLM Fine-Tuning",
    problem: "Generic AI models that don't understand your industry or data?",
    solution:
      "We fine-tune LLMs on your proprietary data to deliver accurate, context-aware responses.",
    benefit: "Achieve 95%+ accuracy on domain-specific tasks with full data privacy.",
  },
  {
    icon: Package,
    title: "End-to-End Product Building",
    problem: "A great idea stuck in limbo with no technical team to execute it?",
    solution:
      "We take your concept from ideation through design, development, and deployment.",
    benefit: "Go from idea to launched product in as little as 8 weeks.",
  },
  {
    icon: BarChart3,
    title: "Custom Data Science Dashboard",
    problem: "Disconnected data making it impossible to track what matters?",
    solution:
      "We build tailored dashboards that unify your metrics, visualize trends, and surface anomalies in real time.",
    benefit: "Make faster decisions with a single source of truth and live operational visibility.",
  },
];

export default function ServicesPage() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/3 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mb-16 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
          What We Build
        </p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mt-3 mb-3">
          High-end AI & web solutions
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Expert engineering for modern businesses. Every solution is purpose-built for your operations.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.title}
            className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:bg-slate-200 transition-colors">
              <service.icon size={24} className="text-slate-700" />
            </div>

            <h2 className="headline-primary text-xl font-semibold text-slate-900 mb-4">
              {service.title}
            </h2>

            <div className="space-y-3 flex-1">
              <div>
                <p className="text-xs font-semibold tracking-wide text-amber-600 uppercase">
                  Problem
                </p>
                <p className="text-sm text-slate-600 mt-0.5">{service.problem}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                  Solution
                </p>
                <p className="text-sm text-slate-600 mt-0.5">{service.solution}</p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Impact:</span>{" "}
                {service.benefit}
              </p>
              <Link
                href="/contact"
                className="flex-shrink-0 ml-3 text-slate-400 hover:text-slate-700 transition-colors"
                title="Start a Project"
              >
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-16 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Start a Project
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="relative z-10 mt-24">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
            &lt; /&gt; Stack &amp; Structure
          </p>
          <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-3 mb-3">
            Technology Stack &amp; Architecture
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            A detailed snapshot of how your system is built, structured, and scaled.
          </p>
        </div>

        <div className="flex justify-center">
          <Image
            src="/Techstack.png"
            alt="Technology Stack & Architecture"
            width={896}
            height={504}
            className="w-full max-w-4xl h-auto rounded-xl border border-slate-200 shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
