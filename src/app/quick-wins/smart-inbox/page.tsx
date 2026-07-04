import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies | Ace Intelligence",
  description:
    "Case studies and technical deep-dives from Ace Intelligence.",
};

const articles = [
  {
    title: "I Built a Public Manim MCP Server — Now Claude Can Produce Real 3Blue1Brown Videos on Demand",
    url: "https://medium.com/@omchoksi108/i-built-a-public-manim-mcp-server-now-claude-can-produce-real-3blue1brown-videos-on-demand-050995551c4e",
  },
  {
    title: "Automating Education with AI Agents — My Internship Journey with Agno AGI",
    url: "https://medium.com/@401anshgajera/automating-education-with-ai-agents-my-internship-journey-with-agno-agi-eb1de749865a",
  },
];

export default function SmartInboxPage() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-[-3rem] top-[10rem] h-64 w-64 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mb-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>

      <div className="relative z-10 space-y-12">
        {articles.map((article, i) => (
          <div key={i} className="w-full max-w-4xl mx-auto">
            <h2 className="headline-primary text-xl sm:text-2xl text-slate-900 mb-4">
              {article.title}
            </h2>
            <iframe
              src={article.url}
              className="w-full rounded-2xl border border-slate-200 shadow-sm"
              style={{ height: "calc(100vh - 16rem)", minHeight: "600px" }}
              allowFullScreen
            />
          </div>
        ))}
      </div>
    </section>
  );
}
