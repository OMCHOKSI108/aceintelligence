import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, DraftingCompass, Wrench, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ace Intelligence Systems is an AI, automation, and intelligent software services agency. We build bespoke AI architectures and scalable cloud infrastructure.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Ace Intelligence Systems | AI & Automation Agency",
    description:
      "We build bespoke AI architectures and scalable cloud infrastructure — custom software solutions, not off-the-shelf SaaS.",
  },
};

/* PLAUSIBLE-PLACEHOLDER: process steps describe our real engagement flow (Discovery → Architecture → Build → Deploy & Support). Verify wording with the team before publishing. */
const processSteps = [
  {
    step: "01",
    icon: Compass,
    title: "Discovery",
    description: "We map the workflow, stakeholders, and systems that must stay in sync — then pin down success criteria and guardrails up front.",
  },
  {
    step: "02",
    icon: DraftingCompass,
    title: "Architecture",
    description: "We design the data flow, model selection, and integration points, and agree on a deterministic, verifiable build plan.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Build",
    description: "We ship in working increments with human checkpoints — production-grade code, tested against real data, not demos.",
  },
  {
    step: "04",
    icon: Rocket,
    title: "Deploy & Support",
    description: "We launch to production, monitor outcomes, and stay on for iterations, fixes, and feature evolution.",
  },
];

const founders = [
  {
    name: "Om Choksi",
    initials: "OC",
    role: "CTO & Chief Architect",
    expertise: "Multi-agent LLM workflows",
    username: "OMCHOKSI108",
    description:
      "Leads technical architecture, multi-agent orchestration, and enterprise RAG systems. Builds production-grade AI pipelines that scale.",
  },
  {
    name: "Ansh Gajera",
    initials: "AG",
    role: "CEO",
    expertise: "Business transformation",
    username: "anshgajera",
    description:
      "Drives strategic vision, client partnerships, and business growth. Ensures every solution delivers measurable enterprise value.",
  },
  {
    name: "Yash Khare",
    initials: "YK",
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
                  <Image src="/logo.png" alt="Ace Intelligence" width={64} height={64} className="mx-auto mb-4 brightness-0 invert" />
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
          {/* PLAUSIBLE-PLACEHOLDER: expanded founding story — verify the problem narrative and the split of roles against the team before publishing. */}
          <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-8">
            We kept watching strong AI demos die in production. We founded Ace Intelligence Systems to fix that.
          </h2>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto mb-8" />
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto">
            As AIML engineers, we kept hitting the same wall on client and personal projects: a model that
            looked brilliant in a notebook would fall apart under real traffic — unmonitored agent loops,
            retrieval that drifted, dashboards nobody could trust. Each fix was a one-off, and nobody had
            time to make it repeatable.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mt-4">
            So we teamed up — one of us obsessed with multi-agent orchestration and enterprise RAG, one with
            turning technical work into business outcomes, and one with security-first deployment. Three
            complementary skill sets we trusted enough to build on top of each other. Every engagement now
            runs on that same stack: deterministic, verifiable AI architectures that enterprises can actually
            operate, from rapid 48-hour automations to full-scale multi-agent systems.
          </p>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              From First Call to Deployed System
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
              How We Work
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-2xl mx-auto">
              A predictable, transparent engagement — you always know what we&apos;re building and when.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="group relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <span className="absolute top-6 right-6 font-display text-3xl font-semibold text-slate-200">
                  {step.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-5 group-hover:bg-amber-50 transition-colors">
                  <step.icon size={24} className="text-slate-700 group-hover:text-amber-600 transition-colors" />
                </div>
                <h3 className="headline-primary text-lg font-semibold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
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
                <div className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden bg-[#B45309] flex items-center justify-center border-2 border-[#B45309]/20 group-hover:border-amber-300 transition-colors">
                  {/* PLAUSIBLE-PLACEHOLDER: initials placeholder — swap for real headshots when available. */}
                  <span className="font-display text-3xl font-semibold text-white">{founder.initials}</span>
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
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/3 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-4">
            Let&apos;s Build
          </p>
          <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-slate-900 leading-tight mb-4">
            Ready to ship production-grade AI?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tell us what you want to automate. We&apos;ll design a workflow your team can trust and have it in production in weeks, not quarters.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg bg-[#B45309] hover:bg-[#92400E] transition-colors duration-300"
            >
              Start a project
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
