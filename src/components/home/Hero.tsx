"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { HoverArrow } from "@/components/layout/HoverArrow";

/*
 * ── Content map ──────────────────────────────────────────────────
 * Edit these values, not the markup. Anything you are unsure about
 * is marked PLAUSIBLE-PLACEHOLDER below — swap with real data before
 * shipping.
 */

/* Real: founders' GitHub handles (public, verifiable). */
const founders = ["OMCHOKSI108", "anshgajera", "firefistisdead"];

/* Real: Vizatrade (custom trading solution) ships on the site already (client quote in HomePage). */
const CLIENT_LOGO = { src: "/vizatrade.png", alt: "Vizatrade", label: "Fintech client" };

/* Real: product screenshots from /public (portfolio projects). */
const showcaseSlides = [
  { src: "/multimodal_rag.png", alt: "Multi Modal RAG Agent" },
  { src: "/pralay.png", alt: "PralayAI — cybersecurity LLM" },
  { src: "/chatscreen.jpeg", alt: "Conversational AI ordering" },
  { src: "/multiagent_research_n8n_flow.png", alt: "Multi Agent Research — n8n flow" },
];

/* PLAUSIBLE-PLACEHOLDER: "5.0 client rating" — based on one public quote; verify. */
const RATING = { value: 5, label: "5.0 client rating" };

/* ── Showcase: auto-advancing crossfade of product screenshots ─── */
const SHOWCASE_INTERVAL_MS = 3500;

function Showcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % showcaseSlides.length),
      SHOWCASE_INTERVAL_MS,
    );
    return () => clearInterval(t);
  }, [paused, reducedMotion]);

  return (
    <div
      className="relative mt-8 aspect-[16/10] overflow-hidden rounded-[16px] border border-[#E5E7EB] bg-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-16px_rgba(15,23,42,0.12)]"
      role="region"
      aria-roledescription="carousel"
      aria-label="Product showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {showcaseSlides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          width={1517}
          height={801}
          loading={i === 0 ? "eager" : "lazy"}
          sizes="(min-width: 1024px) 38vw, 92vw"
          aria-hidden={i !== active}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Caption + controls */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/40 to-transparent px-4 pb-3 pt-8">
        <p className="truncate text-xs font-medium text-white">
          {showcaseSlides[active].alt}
        </p>
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Showcase slides">
          {showcaseSlides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${slide.alt}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ──────────────────────────────────────────────────────── */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FCFCFD] via-[#FDFDFE] to-[#F8FAFC]">
      {/* Blueprint grid — committed: faint infrastructure texture across the whole hero */}
      <div
        aria-hidden="true"
        className="hero-blueprint pointer-events-none absolute inset-0"
      />
      {/* Solid accent ribbon — one color, no gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-signal"
      />
      {/* Ribbon accent — top-right, layered gradients in amber family, masked fade */}
      <div aria-hidden="true" className="hero-ribbon" />
      {/* Subtle top glow — restrained, not a full-bleed mesh */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[48rem] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#FEF3C7] to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 pt-32 sm:px-6 sm:pt-36 lg:px-8 lg:pt-40 pb-24 sm:pb-28 lg:pb-32">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          {/* ── Left: content ── */}
          <div className="hero-fade-up lg:col-span-6">
            <h1 className="font-display text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-900 text-balance sm:text-[3.4rem] lg:text-[3.6rem]">
              We build the AI infrastructure
              <br />
              <span className="text-signal">enterprises run on.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              Enterprise RAG pipelines, multi-agent workflows, HRMS/ATS platforms, geospatial routing, and real-time messaging infra — engineered end to end, shipped in weeks not quarters.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-signal px-6 py-3.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.08),0_4px_12px_-4px_rgba(180,83,9,0.35)] transition-all duration-150 hover:bg-signal-hover hover:shadow-[0_2px_4px_rgba(15,23,42,0.1),0_6px_16px_-4px_rgba(180,83,9,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
              >
                Start a project
                <HoverArrow />
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#CBD5E1] bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-150 hover:border-[#94A3B8] hover:bg-slate-50 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
              >
                See our work
              </Link>
            </div>

            {/* ── Trust indicator ── */}
            <div className="mt-14 max-w-xl">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {founders.map((user) => (
                      <img
                        key={user}
                        src={`https://avatars.githubusercontent.com/${user}?size=64`}
                        alt=""
                        width={32}
                        height={32}
                        loading="lazy"
                        className="h-8 w-8 rounded-full border-2 border-[#FCFCFD] shadow-[0_1px_2px_rgba(15,23,42,0.08)]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-slate-600">
                    Built by <span className="font-semibold text-slate-900">3 AIML engineers</span>
                  </p>
                </div>
                <div className="hidden h-8 w-px bg-[#E5E7EB] sm:block" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <img
                    src={CLIENT_LOGO.src}
                    alt={CLIENT_LOGO.alt}
                    width={90}
                    height={20}
                    loading="lazy"
                    className="h-5 w-auto opacity-60 grayscale"
                  />
                  <span className="text-sm text-slate-500">{CLIENT_LOGO.label}</span>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center gap-1" aria-label={`Rated ${RATING.value} out of 5`}>
                  {Array.from({ length: RATING.value }).map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                  ))}
                  <span className="ml-1 text-sm text-slate-600">{RATING.label}</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: contained visual ── */}
          <div className="relative lg:col-span-6">
            <div
              aria-hidden="true"
              className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-br from-white/70 via-transparent to-[#FEF3C7]/40"
            />
            <div className="relative rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.14)]">
              {/* Title bar */}
              <div className="flex items-center gap-2 border-b border-[#EEF1F5] px-6 py-4">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
                <span className="ml-3 font-mono text-xs font-medium text-slate-400">
                  ai-infra · production
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                  <span className="relative flex h-2 w-2">
                    <span className="hero-live-ping absolute inline-flex h-full w-full rounded-full bg-precision" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-precision" />
                  </span>
                  Live
                </span>
              </div>

              {/* Product showcase — the single hero visual */}
              <div className="px-6 pt-8 pb-8">
                <Showcase />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
