"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export function Hero() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isTouch, setIsTouch] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;
    const el = heroRef.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    el.addEventListener("mousemove", handleMouse);
    return () => el.removeEventListener("mousemove", handleMouse);
  }, [isTouch]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Layer: left gradient pillar */}
      <div
        className="pointer-events-none absolute left-0 top-16 h-[75vh] w-[28vw] rounded-full bg-gradient-to-r from-cyan-300/45 via-sky-400/35 to-blue-600/20 blur-[100px] z-0"
        aria-hidden="true"
      />

      {/* Layer: right gradient pillar */}
      <div
        className="pointer-events-none absolute right-0 top-8 h-[75vh] w-[30vw] rounded-full bg-gradient-to-l from-blue-500/25 via-cyan-300/30 to-sky-400/20 blur-[110px] z-0"
        aria-hidden="true"
      />

      {/* Layer: ambient center glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-b from-blue-300/15 via-cyan-200/12 to-transparent blur-[120px] z-0"
        aria-hidden="true"
      />

      {/* Layer: mouse-following fluid glow (primary) */}
      {!isTouch && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-[400ms] ease-out"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(6,182,212,0.42) 0%, rgba(14,165,233,0.30) 18%, rgba(37,99,235,0.18) 36%, rgba(255,255,255,0) 62%)`,
          }}
        />
      )}

      {/* Layer: mouse-following fluid glow (secondary, offset for depth) */}
      {!isTouch && (
        <div
          className="pointer-events-none absolute inset-0 z-[1] transition-[background] duration-[600ms] ease-out"
          aria-hidden="true"
          style={{
            background: `radial-gradient(circle at ${105 - mousePos.x}% ${105 - mousePos.y}%, rgba(14,165,233,0.18) 0%, rgba(37,99,235,0.12) 25%, rgba(255,255,255,0) 55%)`,
          }}
        />
      )}

      {/* Bottom fade overlay to blend hero into next section */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white/60 z-[2]"
        aria-hidden="true"
      />

      {/* Centered frosted glass card */}
      <div className="relative z-10 w-full max-w-[850px] mx-auto text-center">
        <div className="rounded-3xl border border-slate-200/60 bg-white/70 backdrop-blur-2xl shadow-2xl shadow-blue-500/5 p-10 sm:p-14 md:p-16">
          <p className="text-xs font-medium tracking-[0.28em] text-slate-400 uppercase mb-6">
            Ace Intelligence Systems
          </p>

          <h1 className="headline-primary text-[2.8rem] sm:text-[4rem] lg:text-[4.6rem] text-slate-900 leading-[1.04] tracking-tight">
            AI &amp; Automation for Enterprises.
            <br />
            <span className="bg-gradient-to-r from-[#17135f] via-[#2563eb] to-[#06b6d4] bg-clip-text text-transparent">
              We make it simple.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Bespoke AI architectures and scalable cloud infrastructure tailored to your business operations.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-500 hover:via-blue-500 hover:to-cyan-400"
            >
              Talk to an Expert
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-slate-700 border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore our Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
