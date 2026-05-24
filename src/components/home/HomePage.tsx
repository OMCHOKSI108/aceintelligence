import { Hero } from "./Hero";
import { ServicesSection } from "./ServicesSection";
import { QuickWinsSection } from "./QuickWinsSection";
import { ProjectsSection } from "./ProjectsSection";
import { FounderSection } from "./FounderSection";
import { theme } from "@/lib/theme";

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
