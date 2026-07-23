"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

/* ─── Hero ──────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section
      className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center pt-20 sm:pt-24 px-3 sm:px-6 lg:px-8 overflow-hidden bg-white"
    >
      {/* ─── Full-screen SVG ─── */}
      <svg
        className="pointer-events-none absolute z-0"
        aria-hidden="true"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        style={{
          width: "180vw",
          height: "120vh",
          left: "-40vw",
          top: "-10vh",
        }}
      >
        <defs>
          {/* ─── Filters ─── */}
          <filter id="mesh-blur-wide">
            <feGaussianBlur stdDeviation="48" />
          </filter>
          <filter id="mesh-blur-mid">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="mesh-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="2" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="20" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="14" />
          </filter>

          {/* ─── Mesh gradient layers ───
               Multiple overlapping gradient shapes with heavy blur
               create a smooth mesh with no hard stops or visible
               blob edges.                                 */}
          {/* Large diagonal sweep — blue → cyan → amber → gold */}
          <linearGradient id="g-sweep-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.6} />
            <stop offset="20%" stopColor="#0EA5E9" stopOpacity={0.5} />
            <stop offset="40%" stopColor="#22D3EE" stopOpacity={0.45} />
            <stop offset="55%" stopColor="#F59E0B" stopOpacity={0.4} />
            <stop offset="75%" stopColor="#FB923C" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#FFD54A" stopOpacity={0.3} />
          </linearGradient>

          {/* Cross sweep — indigo → cyan → gold → amber */}
          <linearGradient id="g-sweep-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.45} />
            <stop offset="25%" stopColor="#38BDF8" stopOpacity={0.35} />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity={0.3} />
            <stop offset="75%" stopColor="#FFD54A" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity={0.2} />
          </linearGradient>

          {/* Vertical blend — blue top → gold center → amber bottom */}
          <linearGradient id="g-sweep-3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.35} />
            <stop offset="30%" stopColor="#0EA5E9" stopOpacity={0.25} />
            <stop offset="55%" stopColor="#FFD54A" stopOpacity={0.2} />
            <stop offset="80%" stopColor="#F59E0B" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#FB923C" stopOpacity={0.12} />
          </linearGradient>

          {/* ─── Golden glow — top-center hotspot ─── */}
          <radialGradient id="g-gold-center" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stopColor="#FFD54A" stopOpacity={0.55} />
            <stop offset="25%" stopColor="#FFD54A" stopOpacity={0.35} />
            <stop offset="50%" stopColor="#FF9D00" stopOpacity={0.18} />
            <stop offset="75%" stopColor="#FF7A59" stopOpacity={0.08} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>

          {/* ─── Blue concentration — top-left corner ─── */}
          <radialGradient id="g-purple-tl" cx="10%" cy="10%" r="45%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.55} />
            <stop offset="35%" stopColor="#0EA5E9" stopOpacity={0.3} />
            <stop offset="60%" stopColor="#93C5FD" stopOpacity={0.12} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>

          {/* ─── Blue concentration — top-right corner ─── */}
          <radialGradient id="g-purple-tr" cx="90%" cy="5%" r="40%">
            <stop offset="0%" stopColor="#1D4ED8" stopOpacity={0.45} />
            <stop offset="35%" stopColor="#0EA5E9" stopOpacity={0.25} />
            <stop offset="60%" stopColor="#93C5FD" stopOpacity={0.1} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>

          {/* ─── Amber wash — lower-right ─── */}
          <radialGradient id="g-coral-br" cx="85%" cy="75%" r="40%">
            <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.35} />
            <stop offset="35%" stopColor="#FB923C" stopOpacity={0.25} />
            <stop offset="60%" stopColor="#22D3EE" stopOpacity={0.12} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>

          {/* ─── Sky bridge — mid-left ─── */}
          <radialGradient id="g-lavender" cx="25%" cy="45%" r="35%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.3} />
            <stop offset="40%" stopColor="#38BDF8" stopOpacity={0.15} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>

          {/* ─── Diagonal clip mask (~14° angle) ───
               On the left edge the diagonal sits at y=520 (65%).
               On the right edge it sits at y=200 (25%).
               Everything above the diagonal is visible mesh. */}
          <clipPath id="diagonal-mask">
            <polygon points="0,0 1200,0 1200,200 0,520" />
          </clipPath>
        </defs>

        {/* ─── Mesh layer (clipped by diagonal) ─── */}
        <g clipPath="url(#diagonal-mask)">
          {/* Sweep 1 — main diagonal color transition */}
          <polygon points="-400,-200 1600,-200 1600,900 -400,900" fill="url(#g-sweep-1)" filter="url(#mesh-noise)" />

          {/* Sweep 2 — cross-direction blend for mesh depth */}
          <polygon points="-400,-200 1600,-200 1600,900 -400,900" fill="url(#g-sweep-2)" filter="url(#mesh-blur-mid)" opacity={0.6} style={{ mixBlendMode: "screen" }} />

          {/* Sweep 3 — vertical transition (purple top → warm bottom) */}
          <polygon points="-400,0 1600,-100 1600,700 -400,700" fill="url(#g-sweep-3)" filter="url(#mesh-blur-wide)" opacity={0.5} style={{ mixBlendMode: "screen" }} />

          {/* Golden top-center glow */}
          <circle cx="600" cy="240" r="500" fill="url(#g-gold-center)" filter="url(#mesh-blur-wide)" style={{ mixBlendMode: "screen" }} />

          {/* Purple corner washes */}
          <circle cx="120" cy="80" r="500" fill="url(#g-purple-tl)" filter="url(#mesh-blur-wide)" />
          <circle cx="1080" cy="40" r="450" fill="url(#g-purple-tr)" filter="url(#mesh-blur-wide)" />

          {/* Coral-orange lower-right wash */}
          <circle cx="1020" cy="600" r="400" fill="url(#g-coral-br)" filter="url(#mesh-blur-wide)" style={{ mixBlendMode: "screen" }} />

          {/* Lavender bridge mid-left */}
          <circle cx="300" cy="360" r="350" fill="url(#g-lavender)" filter="url(#mesh-blur-mid)" style={{ mixBlendMode: "screen" }} />
        </g>

        {/* ── Subtle internal streaks ── */}
        <g clipPath="url(#diagonal-mask)" opacity={0.06} style={{ mixBlendMode: "screen" }}>
          {Array.from({ length: 20 }, (_, i) => {
            const y = -100 + i * 45;
            return (
              <path
                key={i}
                d={`M-200,${y} Q500,${y - 30 + (i - 10) * 5} 1400,${y - 20}`}
                fill="none"
                stroke="white"
                strokeWidth={1 + (i % 3)}
                opacity={0.2 + (i % 5) * 0.04}
              />
            );
          })}
        </g>
      </svg>

      {/* ── Bottom fade overlay ── */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white z-[3]"
        aria-hidden="true"
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-[850px] mx-auto text-center">
        <div className="rounded-3xl border border-slate-200/70 bg-white/75 backdrop-blur-2xl shadow-2xl shadow-slate-200/80 p-6 sm:p-10 md:p-16">
          <p className="text-xs font-medium tracking-[0.28em] text-slate-400 uppercase mb-6">
            Ace Intelligence Systems
          </p>

          <h1 className="headline-primary text-[2.2rem] sm:text-[4rem] lg:text-[4.6rem] text-slate-900 leading-[1.08] tracking-tight">
            AI &amp; Automation for Enterprises.
            <br />
            <span className="bg-gradient-to-r from-[#1D4ED8] via-[#0EA5E9] to-[#F59E0B] bg-clip-text text-transparent">
              We make it simple.
            </span>
          </h1>

          <p className="mt-5 sm:mt-6 text-sm sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Bespoke AI architectures and scalable cloud infrastructure tailored to your business operations.
          </p>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 text-sm font-semibold text-white rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 bg-gradient-to-r from-[#1D4ED8] via-[#0EA5E9] to-[#F59E0B]"
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
