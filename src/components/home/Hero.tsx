"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { colors, theme } from "@/lib/theme";

interface HeroProps {
  title?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function Hero({
  title = "Building the future of document intelligence.",
  description = "",
  ctaText = `Build with ${theme.brand.name}`,
  ctaHref = "/projects",
}: HeroProps) {
  return (
    <section className="relative pt-36 pb-20 px-6 sm:px-8 lg:px-10 max-w-6xl mx-auto">
      <div className="max-w-5xl">
        <h1 className="headline-primary text-[2.8rem] sm:text-[4.5rem] lg:text-[5.25rem] text-slate-800 leading-[0.96] tracking-tight mb-3">
          {title}
        </h1>
        {description && (
          <p className="headline-secondary text-[2.3rem] sm:text-[4rem] lg:text-[4.8rem] text-slate-700 leading-[0.95] tracking-tight mb-10">
            {description}
          </p>
        )}
        <div className="flex flex-wrap gap-4">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: colors.accent.primary }}
          >
            {ctaText}
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            View projects
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
