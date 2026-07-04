import Link from "next/link";
import {
  ArrowRight,
  BrainCircuit,
  Cpu,
  Database,
  Globe,
  Layout,
  Palette,
  Bot,
  Workflow,
  Briefcase,
  Sparkles,
  GraduationCap,
  Users,
  Target,
  Rocket,
  HeartHandshake,
  ShieldAlert,
  CheckCircle2,
  Search,
  MessageSquare,
  Code,
  UserCheck,
} from "lucide-react";

const CAREERS_FORM_URL = process.env.NEXT_PUBLIC_CAREERS_FORM_URL || "";

const talentPoolHref =
  CAREERS_FORM_URL ||
  "mailto:omchoksi.pro@gmail.com?subject=Future Opportunity at Ace Intelligence";

const futureRoles = [
  { icon: BrainCircuit, title: "AI/ML Engineer" },
  { icon: Sparkles, title: "Generative AI Engineer" },
  { icon: Bot, title: "AI Agent Developer" },
  { icon: MessageSquare, title: "RAG Chatbot Developer" },
  { icon: Globe, title: "Full Stack Developer" },
  { icon: Database, title: "Backend Engineer" },
  { icon: Layout, title: "Frontend Developer" },
  { icon: Palette, title: "UI/UX Designer" },
  { icon: Workflow, title: "Automation Engineer" },
  { icon: Briefcase, title: "Business Development Intern" },
];

const whyJoin = [
  {
    icon: Rocket,
    title: "Real AI Projects",
    description: "Ship production-grade AI systems used by real businesses, not toy datasets or academic exercises.",
  },
  {
    icon: GraduationCap,
    title: "Startup Learning",
    description: "Fast-paced environment where you'll wear multiple hats and grow faster than a traditional corporate role.",
  },
  {
    icon: Globe,
    title: "Remote-Friendly Culture",
    description: "Work from anywhere. We hire based on talent, not geography.",
  },
  {
    icon: Target,
    title: "Portfolio-Worthy Work",
    description: "Every project is a showcase piece. Build a portfolio that demonstrates real engineering impact.",
  },
  {
    icon: Users,
    title: "Mentorship",
    description: "Learn from experienced engineers who have shipped multi-agent systems and enterprise AI pipelines.",
  },
  {
    icon: HeartHandshake,
    title: "Ownership",
    description: "Own your work end-to-end. We trust our team to make decisions and take initiative.",
  },
];

const hiringSteps = [
  {
    step: 1,
    icon: Search,
    title: "Profile Review",
    description: "We review your resume, portfolio, and any relevant work samples to understand your strengths.",
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Project Discussion",
    description: "A casual conversation about your past projects, technical decisions, and what excites you.",
  },
  {
    step: 3,
    icon: Code,
    title: "Technical Task",
    description: "A small, practical task relevant to the role. No whiteboard trivia — real problems only.",
  },
  {
    step: 4,
    icon: Users,
    title: "Interview",
    description: "Meet the team. We'll discuss your approach, collaboration style, and how you'd fit in.",
  },
  {
    step: 5,
    icon: UserCheck,
    title: "Onboarding",
    description: "Welcome aboard! We'll get you set up with tools, context, and your first project.",
  },
];

export default function CareersPage() {
  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/3 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/30 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute right-[-2rem] top-[8rem] h-56 w-56 rounded-full bg-purple-200/25 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-4">
            Join the Team
          </p>
          <h1 className="headline-primary text-4xl sm:text-5xl lg:text-6xl text-slate-900 leading-[1.05] tracking-tight">
            Careers at Ace Intelligence
          </h1>
          <p className="headline-secondary text-xl sm:text-2xl text-slate-500 mt-4">
            Build the future of AI systems with us.
          </p>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed max-w-2xl mx-auto">
            Ace Intelligence builds production-grade AI solutions, automation systems, AI agents, RAG chatbots, and intelligent software for modern businesses.
          </p>
        </div>
      </section>

      {/* ===== CURRENT OPENINGS — EMPTY STATE ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="relative z-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-4">
            Current Openings
          </p>
          <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-8">
            Open Positions
          </h2>

          <div className="max-w-lg mx-auto rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-10 shadow-sm">
            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-5">
              <Search size={28} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No open positions right now
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              We are not actively hiring at the moment, but you can still join our future talent pool.
            </p>
          </div>
        </div>
      </section>

      {/* ===== TALENT POOL CTA ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 text-center max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white/90 backdrop-blur-sm p-10 shadow-sm">
          <h2 className="headline-primary text-2xl sm:text-3xl text-slate-900 mb-3">
            Future Talent Pool
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            Even if there is no role that fits you right now, we want to hear from you. Drop us your details and we&apos;ll reach out when something opens up.
          </p>
          <a
            href={talentPoolHref}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Join Talent Pool
            <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* ===== FUTURE OPPORTUNITIES ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Future Opportunities
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
              Roles We Typically Hire For
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-2xl mx-auto">
              When positions open, they are usually in these areas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {futureRoles.map((role) => (
              <div
                key={role.title}
                className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-50 transition-colors">
                  <role.icon size={22} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 leading-snug">
                  {role.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY JOIN ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
              Why Join Us
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-white mt-2">
              Why Ace Intelligence
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyJoin.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm p-8 shadow-sm hover:bg-slate-800/60 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-700/60 flex items-center justify-center mb-5 group-hover:bg-blue-500/20 transition-colors">
                  <item.icon size={22} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HIRING PROCESS ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute right-[-3rem] top-[10rem] h-64 w-64 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Our Process
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
              Hiring Process
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-2xl mx-auto">
              A transparent, straightforward process designed to evaluate real skills.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {hiringSteps.map((step, index) => (
              <div key={step.step} className="relative flex gap-6 pb-12 last:pb-0">
                {/* Connector line */}
                {index < hiringSteps.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-0 w-px bg-slate-200" aria-hidden="true" />
                )}

                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <step.icon size={20} className="text-blue-600" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                      Step {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RECRUITMENT FRAUD WARNING ===== */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="relative z-10 max-w-3xl mx-auto rounded-2xl border border-amber-200 bg-amber-50/80 backdrop-blur-sm p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <ShieldAlert size={20} className="text-amber-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-amber-900 mb-2">
                Important Notice
              </h2>
              <p className="text-sm text-amber-800 leading-relaxed">
                Ace Intelligence does not charge any fee for internships, jobs, interviews, training, or hiring. Please do not trust anyone asking for money in the name of recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/3 bottom-[2rem] h-56 w-56 -translate-x-1/2 rounded-full bg-sky-200/25 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-4">
            Want to shape the future of AI?
          </h2>
          <p className="text-slate-600 text-lg mb-8 leading-relaxed">
            Join our talent pool and be the first to know when we open applications.
          </p>
          <a
            href={talentPoolHref}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Join Talent Pool
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
