"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Zap, Building2, Cpu, Shield } from "lucide-react";
import { colors, theme } from "@/lib/theme";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({
  title = "AI, automation, and intelligent software for modern enterprises.",
  description = "We eliminate manual operational bottlenecks by building bespoke AI architectures and scalable cloud infrastructure.",
  ctaText = "Talk to an expert",
  ctaHref = "/contact",
}: HeroProps) {
  return (
    <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[32rem] max-w-5xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)] blur-3xl" aria-hidden="true" />
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase mb-4">
            {theme.brand.name} | AI Services Agency
          </p>

          <h1 className="headline-primary text-[2.6rem] sm:text-[4rem] lg:text-[4.6rem] text-slate-900 leading-[0.98] tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="headline-secondary text-[1.7rem] sm:text-[2.4rem] lg:text-[2.75rem] text-slate-700 leading-[1.05] tracking-tight mt-3">
              {description}
            </p>
          )}

          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
            We help modern startups and enterprise organizations scale efficiently with custom software solutions —
            not off-the-shelf SaaS. From intelligent workflow automations to enterprise RAG architectures,
            we build what your business actually needs.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: colors.accent.primary }}
            >
              {ctaText}
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Explore our services
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">We are</p>
              <p className="text-sm font-semibold text-slate-900">AI, automation &amp; software agency</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">For</p>
              <p className="text-sm font-semibold text-slate-900">Startups &amp; enterprises</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Model</p>
              <p className="text-sm font-semibold text-slate-900">Custom software solutions</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Focus</p>
              <p className="text-sm font-semibold text-slate-900">Eliminating manual bottlenecks</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-6 sm:p-7">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              What we build
            </p>
            <h2 className="headline-primary text-xl sm:text-2xl text-slate-900 mt-2">
              Deep-engineering architectures
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Intelligent Workflow Automations</p>
                  <p className="text-sm text-slate-600">Smart email triage, document parsing, zero-touch lead routing.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Cpu size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Generative AI &amp; Conversational Agents</p>
                  <p className="text-sm text-slate-600">Enterprise RAG, multi-agent workflows, tier-1 support bots.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Building2 size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Cloud Infrastructure &amp; Analytics</p>
                  <p className="text-sm text-slate-600">Custom dashboards, predictive AI, scalable backend APIs.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Rapid Deployment</p>
                  <p className="text-sm text-slate-600">48-hour quick wins that scale into full enterprise retainers.</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">n8n</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">LangGraph</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">RAG</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">AWS/Azure</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Groq</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
