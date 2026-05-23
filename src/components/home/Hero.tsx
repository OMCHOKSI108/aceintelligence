"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Shield, Layers, Search, Zap } from "lucide-react";
import { colors, theme } from "@/lib/theme";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({
  title = "Automation that teams trust.",
  description = "Workflow first AI with human oversight and dependable execution.",
  ctaText = "Talk to an expert",
  ctaHref = "/contact",
}: HeroProps) {
  return (
    <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[32rem] max-w-5xl bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%)] blur-3xl" aria-hidden="true" />
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase mb-4">
            {theme.brand.name} | Workflow Automation Studio
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
            We help teams automate high-stakes workflows with clear approvals, reliable handoffs, and the visibility
            leaders need to trust every step.
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
              href="/platform"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              Explore the platform
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Built for</p>
              <p className="text-sm font-semibold text-slate-900">Startups and teams</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Focus</p>
              <p className="text-sm font-semibold text-slate-900">Workflow automation</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Security</p>
              <p className="text-sm font-semibold text-slate-900">Audit-ready controls</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Delivery</p>
              <p className="text-sm font-semibold text-slate-900">Operational trust</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-6 sm:p-7">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              What we deliver
            </p>
            <h2 className="headline-primary text-xl sm:text-2xl text-slate-900 mt-2">
              A complete workflow automation stack
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Search size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Workflow intent capture</p>
                  <p className="text-sm text-slate-600">Understand requests, scope them, and route tasks to the right systems.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Policy and approval controls</p>
                  <p className="text-sm text-slate-600">Role-based access, approvals, and audit trails by default.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Layers size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Orchestration layer</p>
                  <p className="text-sm text-slate-600">Reusable automation steps, retries, and system-safe fallbacks.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Operational visibility</p>
                  <p className="text-sm text-slate-600">Real-time monitoring, human handoff, and clear outcomes.</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Workflows</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Approvals</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Integrations</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Monitoring</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Audit trails</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
