import { ArrowRight, BrainCircuit } from "lucide-react";

export function PremiumCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight mb-6">
          Have a workflow that should not be manual anymore?
        </h2>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Tell us what your team does repeatedly. We'll map where AI can save time, reduce errors, and create leverage.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white rounded-full border border-slate-600 hover:border-slate-400 transition-all duration-300 glass-effect"
          >
            Book a Discovery Call
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white rounded-full border border-transparent hover:border-slate-600 transition-all duration-300"
          >
            View Work
            <BrainCircuit size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}