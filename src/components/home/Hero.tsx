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
  title = "Document intelligence that ships.",
  description = "RAG-first. Secure by default. Built for real teams.",
  ctaText = "Talk to an expert",
  ctaHref = "/contact",
}: HeroProps) {
  return (
    <section className="relative pt-32 sm:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 lg:px-10 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <p className="text-xs font-medium tracking-[0.22em] text-slate-500 uppercase mb-4">
            {theme.brand.name} — Document Intelligence Studio
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
            We help teams turn PDFs and internal knowledge into dependable product experiences—with retrieval,
            evaluation, and security practices designed for production.
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
              <p className="text-sm font-semibold text-slate-900">Startups & teams</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Focus</p>
              <p className="text-sm font-semibold text-slate-900">RAG reliability</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Security</p>
              <p className="text-sm font-semibold text-slate-900">Least privilege</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm px-4 py-3">
              <p className="text-xs text-slate-500">Delivery</p>
              <p className="text-sm font-semibold text-slate-900">Ship fast</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm p-6 sm:p-7">
            <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
              What we deliver
            </p>
            <h2 className="headline-primary text-xl sm:text-2xl text-slate-900 mt-2">
              A complete document intelligence stack
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3">
                <Search size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Retrieval that stays grounded</p>
                  <p className="text-sm text-slate-600">Chunking, citations, and evaluation loops for accuracy.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Security-first ingestion</p>
                  <p className="text-sm text-slate-600">Clear boundaries between users, workspaces, and data.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Layers size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Composable platform</p>
                  <p className="text-sm text-slate-600">APIs and templates that fit your existing product.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Zap size={18} className="text-slate-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Fast iteration cycles</p>
                  <p className="text-sm text-slate-600">Deploy often, measure impact, and improve quickly.</p>
                </div>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Next.js</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">FastAPI</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Vector Search</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Eval</span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600">Citations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
