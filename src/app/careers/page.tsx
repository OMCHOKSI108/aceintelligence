import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Workflow,
  Database,
  Globe,
  FlaskConical,
  Palette,
  Briefcase,
  Building2,
  Target,
  HeartHandshake,
  Lightbulb,
  ShieldCheck,
  Zap,
  Users,
  BookOpen,
  MessageSquare,
  Code,
  UserCheck,
  Search,
  ShieldAlert,
  Layers,
  Bot,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers at Ace Intelligence",
  description:
    "Explore future career opportunities, internships, and talent network at Ace Intelligence.",
};

const CAREERS_FORM_URL = process.env.NEXT_PUBLIC_CAREERS_FORM_URL || "";

const talentPoolHref =
  CAREERS_FORM_URL ||
  "mailto:omchoksi.pro@gmail.com?subject=Future Opportunity at Ace Intelligence";

const careerTracks = [
  {
    icon: Cpu,
    title: "AI Systems Engineering",
    description:
      "Build reliable AI-backed systems, backend APIs, model integrations, orchestration layers, and production workflows.",
    roles: [
      "AI Systems Engineer",
      "AI Backend Engineer",
      "LLM Application Engineer",
    ],
  },
  {
    icon: Workflow,
    title: "Agentic Automation",
    description:
      "Design multi-step AI agents, workflow automation, tool-calling systems, and business process automations.",
    roles: [
      "Agentic Automation Engineer",
      "AI Workflow Engineer",
      "Automation Consultant",
    ],
  },
  {
    icon: Database,
    title: "RAG & Knowledge Systems",
    description:
      "Work on document intelligence, retrieval systems, vector search, knowledge bases, and enterprise chatbot experiences.",
    roles: [
      "RAG Systems Engineer",
      "Knowledge Automation Engineer",
      "AI Chatbot Engineer",
    ],
  },
  {
    icon: Globe,
    title: "Product Engineering",
    description:
      "Build web products, dashboards, internal tools, SaaS MVPs, and client-facing AI applications.",
    roles: [
      "Product Engineer, AI Tools",
      "Full Stack Product Engineer",
      "Frontend Systems Engineer",
    ],
  },
  {
    icon: FlaskConical,
    title: "Research Engineering",
    description:
      "Prototype emerging AI workflows, evaluate models, build demos, write technical notes, and turn research into usable systems.",
    roles: [
      "Research Engineering Intern",
      "Applied AI Intern",
      "Technical Research Associate",
    ],
  },
  {
    icon: Palette,
    title: "Design Engineering",
    description:
      "Shape premium interfaces for AI products, dashboards, chat systems, landing pages, and product storytelling.",
    roles: [
      "Design Engineer, Web",
      "UI Engineer",
      "Product Experience Designer",
    ],
  },
  {
    icon: Briefcase,
    title: "Solutions & Client Engineering",
    description:
      "Understand client requirements, map business problems to AI systems, prepare demos, and support delivery.",
    roles: [
      "Solutions Engineer, Applied AI",
      "AI Implementation Associate",
      "Client Automation Engineer",
    ],
  },
  {
    icon: Building2,
    title: "Growth & Founder's Office",
    description:
      "Work across product, research, operations, partnerships, content, and market experiments.",
    roles: [
      "Founder's Office Intern",
      "Growth Associate",
      "Technical Content Associate",
    ],
  },
];

const principles = [
  {
    icon: Zap,
    title: "Do the useful thing first",
    description:
      "We prefer simple, working systems over over-engineered demos.",
  },
  {
    icon: ShieldCheck,
    title: "Proof over titles",
    description:
      "Projects, demos, GitHub, writing, experiments, and client work matter more than labels.",
  },
  {
    icon: Users,
    title: "Small team, high ownership",
    description:
      "People who work with us should be comfortable taking responsibility from idea to delivery.",
  },
  {
    icon: Target,
    title: "AI with practical impact",
    description:
      "We focus on AI systems that save time, reduce manual work, and create measurable business value.",
  },
];

const whatWeLookFor = [
  "Strong project portfolio",
  "Clear communication",
  "Ability to learn fast",
  "Good engineering fundamentals",
  "Comfort with ambiguity",
  "Curiosity for AI systems",
  "Bias toward shipping",
  "Honest and responsible use of AI",
];

const hiringSteps = [
  {
    step: 1,
    icon: Search,
    title: "Profile Review",
    description:
      "We review your resume, GitHub, portfolio, LinkedIn, or project work.",
  },
  {
    step: 2,
    icon: MessageSquare,
    title: "Project Discussion",
    description: "We discuss your best work and understand how you think.",
  },
  {
    step: 3,
    icon: Code,
    title: "Practical Task",
    description:
      "For technical roles, we may give a small practical task related to real-world work.",
  },
  {
    step: 4,
    icon: Users,
    title: "Technical / Culture Conversation",
    description:
      "We check fundamentals, communication, ownership, and alignment.",
  },
  {
    step: 5,
    icon: UserCheck,
    title: "Offer / Collaboration",
    description:
      "If there is a strong fit and an active need, we discuss the next steps.",
  },
];

export default function CareersPage() {
  return (
    <div className="relative min-h-screen">
      <Image
        src="/carrires.png"
        alt=""
        fill
        className="object-cover pointer-events-none"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/30" />
      {/* ==================== HERO ==================== */}
      <section className="relative z-20 overflow-hidden bg-slate-900">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
        >
          <source src="/aceinte.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.04] pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 lg:pb-32">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.2em] text-blue-400 uppercase mb-5">
              Join the team
            </p>
            <h1 className="headline-primary text-4xl sm:text-5xl lg:text-7xl text-white leading-[1.05] tracking-tight">
              Careers at Ace Intelligence
            </h1>
            <p className="headline-secondary text-xl sm:text-2xl text-blue-200/80 mt-4">
              Build applied AI systems that move from idea to production.
            </p>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mt-6 max-w-2xl">
              Ace Intelligence builds AI agents, automation systems, RAG chatbots, workflow engines, and intelligent software for modern businesses. We are not hiring for active roles right now, but we are building a small talent network for future opportunities.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href={talentPoolHref}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90 bg-blue-600 hover:bg-blue-500"
              >
                Join Talent Network
                <ArrowRight size={16} />
              </a>
              <a
                href="#how-we-work"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-300 bg-slate-800 rounded-lg hover:bg-slate-700 hover:text-white transition-colors border border-slate-700"
              >
                How We Work
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CURRENT OPENINGS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/3 top-[-4rem] h-56 w-56 -translate-x-1/2 rounded-full bg-sky-200/20 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Current Openings
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-3">
              Open Positions
            </h2>
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl border border-slate-200 bg-white shadow-sm p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
              <Search size={26} className="text-slate-400" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-3">
              No open roles currently
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto">
              We are not actively hiring today. You can still share your profile, portfolio, GitHub, LinkedIn, or project work with us for future opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6 mb-8">
              {["Future roles", "Internships", "Freelance", "Full-time", "Remote-friendly"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
            <a
              href={talentPoolHref}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Join Talent Network
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ==================== CAREER TRACKS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Career Tracks
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-3">
              Areas We Hire For
            </h2>
            <p className="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">
              When positions open, they typically fall within these tracks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {careerTracks.map((track) => (
              <div
                key={track.title}
                className="group rounded-2xl border border-slate-200 bg-white/90 shadow-sm p-8 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <track.icon size={22} className="text-slate-700 group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">
                      {track.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {track.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {track.roles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW WE WORK ==================== */}
      <section
        id="how-we-work"
        className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] pointer-events-none" aria-hidden="true" />
        <div className="absolute right-[-6rem] top-[-6rem] h-80 w-80 rounded-full bg-blue-500/8 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.2em] text-blue-400 uppercase">
              Philosophy
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-white mt-3">
              How We Work
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {principles.map((principle) => (
              <div
                key={principle.title}
                className="rounded-2xl border border-slate-700/50 bg-slate-800/40 p-8 hover:bg-slate-800/60 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-700/60 flex items-center justify-center mb-5">
                  <principle.icon size={20} className="text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {principle.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT WE LOOK FOR ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-[-4rem] bottom-[4rem] h-64 w-64 rounded-full bg-indigo-200/15 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              What We Value
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-3">
              What We Look For
            </h2>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-10">
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {whatWeLookFor.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                  </div>
                  <span className="text-sm text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 italic leading-relaxed">
                We care less about perfect resumes and more about what you can build, explain, improve, and ship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HIRING PROCESS ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              Our Process
            </p>
            <h2 className="headline-primary text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-3">
              Hiring Process
            </h2>
            <p className="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">
              A straightforward process designed to evaluate real skills.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {hiringSteps.map((step, index) => (
              <div key={step.step} className="relative flex gap-6 pb-12 last:pb-0">
                {index < hiringSteps.length - 1 && (
                  <div
                    className="absolute left-6 top-14 bottom-0 w-px bg-slate-200"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center">
                  <step.icon size={20} className="text-blue-600" />
                </div>
                <div className="flex-1 pt-1">
                  <span className="text-xs font-semibold tracking-wide text-blue-600 uppercase">
                    Step {step.step}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TALENT NETWORK CTA ==================== */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full bg-blue-200/15 blur-3xl pointer-events-none" aria-hidden="true" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-4">
            Stay Connected
          </p>
          <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-4">
            Want to work with Ace Intelligence in the future?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed mb-4">
            Share your profile once. When we open a suitable opportunity, we may reach out.
          </p>
          <a
            href={talentPoolHref}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Join Talent Network
            <ArrowRight size={16} />
          </a>
          <p className="text-xs text-slate-400 mt-6 leading-relaxed max-w-md mx-auto">
            Best profiles include GitHub, LinkedIn, portfolio, resume, and 1&ndash;2 strong project links.
          </p>
        </div>
      </section>

      {/* ==================== RECRUITMENT NOTICE ==================== */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        <div className="relative z-10 max-w-3xl mx-auto rounded-2xl border border-amber-200 bg-amber-50/80 p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <ShieldAlert size={20} className="text-amber-700" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-amber-900 mb-1">
                Important Notice
              </h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Ace Intelligence does not charge any fee for internships, jobs, interviews, training, or hiring. Please do not trust anyone asking for money in the name of recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
