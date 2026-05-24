import { Hero } from "./Hero";
import { ServicesSection } from "./ServicesSection";
import { QuickWinsSection } from "./QuickWinsSection";
import { ProjectsSection } from "./ProjectsSection";
import { FounderSection } from "./FounderSection";
import { FeatureCard } from "./FeatureCard";
import { theme } from "@/lib/theme";

const insightCards = {
  featured: {
    title: "From manual ops to trusted automation",
    description: "A practical blueprint for moving repetitive work into reliable, approval-friendly workflows.",
    href: "/insights/pdfs-to-product",
    image: "/landingpage.jpeg",
  },
  list: [
    {
      title: "Workflow quality essentials",
      description: "How to measure throughput, exceptions, and business impact without losing trust.",
      category: "Guide",
      date: "May 2026",
      href: "/insights/rag-evaluation",
    },
    {
      title: "Approval and governance patterns",
      description: "Designing least-privilege approvals and handoffs for sensitive operations.",
      category: "Security",
      date: "May 2026",
      href: "/insights/secure-ingestion",
    },
    {
      title: "Automation latency budgets",
      description: "Where time goes in workflow execution and how to keep SLAs predictable.",
      category: "Engineering",
      date: "May 2026",
      href: "/insights/latency-budgets",
    },
  ],
};

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute left-1/2 top-[-8rem] h-72 w-72 -translate-x-1/2 rounded-full bg-sky-200/35 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute right-[-3rem] top-[18rem] h-64 w-64 rounded-full bg-slate-200/50 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        <Hero />
        <ServicesSection />
        <QuickWinsSection />
        <ProjectsSection />
        <FounderSection />

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Insights</p>
            <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
              Practical writing for operators
            </h2>
            <p className="text-slate-600 text-lg mt-3 max-w-3xl">
              Short, implementation-first notes on building automation you can defend and scale.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <FeatureCard
                title={insightCards.featured.title}
                description={insightCards.featured.description}
                href={insightCards.featured.href}
                image={insightCards.featured.image}
                variant="featured"
              />
            </div>
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-6">
              {insightCards.list.map((card) => (
                <FeatureCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  category={card.category}
                  date={card.date}
                  href={card.href}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="rounded-3xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Get started</p>
              <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
                Ready to build with {theme.brand.name}?
              </h2>
              <p className="text-slate-600 text-lg mt-3 max-w-2xl">
                Tell us what you want to automate. We&apos;ll help you design a workflow your team trusts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white rounded-lg"
                style={{ backgroundColor: "var(--color-accent)" }}
              >
                Talk to us
              </a>
              <a
                href="/docs"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                Read docs
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
