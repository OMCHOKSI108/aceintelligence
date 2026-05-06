"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  date?: string;
  category?: string;
  href?: string;
  image?: string;
  variant?: "default" | "featured";
}

export function FeatureCard({
  title,
  description,
  date,
  category,
  href = "#",
  image,
  variant = "default",
}: FeatureCardProps) {
  if (variant === "featured" && image) {
    return (
      <div className="group relative bg-slate-900 rounded-2xl overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-slate-300 mb-4">{description}</p>
          <Link
            href={href}
            className="inline-flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors"
          >
            Read the story
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 hover:border-slate-300 transition-colors">
      {(date || category) && (
        <div className="flex items-center gap-3 mb-3">
          {category && (
            <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded">
              {category}
            </span>
          )}
          {date && <span className="text-xs text-slate-500">{date}</span>}
        </div>
      )}
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 mb-4">{description}</p>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900 transition-colors"
      >
        Read more
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}