import { Hero } from "./Hero";
import { ServicesSection } from "./ServicesSection";
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
        <ProjectsSection />
        <FounderSection />

        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative">
          <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />
          <div className="relative z-10">
            <div className="text-center mb-14">
              <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
                Trusted by
              </p>
              <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2">
                Our clients
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-8 shadow-sm flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2.5">
                    <img
                      src="/vizatrade.png"
                      alt="Vizatrade logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                  <p className="font-semibold text-slate-900 text-sm">Vizatrade</p>
                  <p className="text-xs text-slate-500">Custom Website &amp; Solution</p>
                  </div>
                </div>
                <blockquote className="text-sm text-slate-600 leading-relaxed flex-1">
                  &ldquo;Ace Intelligence built our complete website and custom trading solution. Professional, on time, and the results speak for themselves.&rdquo;
                  <span className="block mt-3 text-xs font-medium text-slate-500">&mdash; Het Patel</span>
                </blockquote>
                <div className="flex gap-1 mt-5 pt-4 border-t border-slate-100">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
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
