"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

export function PremiumHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-900 text-white py-16">
      {/* Extremely subtle noise texture - barely visible */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 noise-bg opacity-5" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="mb-6">
          <p className="text-sm font-medium tracking-[0.2em] text-slate-400 uppercase transition-all duration-1000" style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(20px)'
          }}>
            ACE INTELLIGENCE SYSTEMS
          </p>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-light leading-tight mb-8 transition-all duration-1000 delay-100" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)'
        }}>
          AI systems built from idea<br />
          to production.
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-200" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)'
        }}>
          We help teams turn repeated workflows, documents, tools, and decisions<br />
          into reliable AI-powered systems.
        </p>

        <div className="flex flex-wrap justify-center gap-4 transition-all duration-1000 delay-300" style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? 'translateY(0)' : 'translateY(20px)'
        }}>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-full border border-slate-600 hover:border-slate-400 transition-all duration-300 glass-effect"
          >
            Start a Project
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>

          <a
            href="#timeline"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-full border border-transparent hover:border-slate-600 transition-all duration-300"
          >
            See the Process
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}