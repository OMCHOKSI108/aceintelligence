import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Smart Inbox Router | Quick Win Automation",
  description:
    "An n8n + LLM pipeline that monitors incoming emails, classifies intent, and routes data to the right system. Deployed in 48 hours.",
  openGraph: {
    title: "Smart Inbox Router | Ace Intelligence Quick Wins",
    description:
      "Automated email triage pipeline using n8n and LLM APIs — deployed in 48 hours, saving 10-20 hours per week.",
  },
};

const articles = [
  {
    author: "Om Choksi",
    title:
      "I Built a Public Manim MCP Server — Now Claude Can Produce Real 3Blue1Brown Videos on Demand",
    description:
      "A deep dive into building a production-ready Manim MCP Server that lets Claude generate 3Blue1Brown-style animated videos on demand.",
    image:
      "https://miro.medium.com/v2/resize:fit:1172/1*Pn7nkD33nz4X1RgENQHkKg.png",
    url: "https://medium.com/@omchoksi108/i-built-a-public-manim-mcp-server-now-claude-can-produce-real-3blue1brown-videos-on-demand-050995551c4e",
  },
  {
    author: "Ansh Gajera",
    title:
      "Automating Education with AI Agents: My Internship Journey with Agno AGI",
    description:
      "An internship journey exploring how AI agents can automate educational workflows — from grading to question bank generation.",
    image:
      "https://miro.medium.com/v2/resize:fit:896/1*6lIy6pRuijZCOF3LAYlnFw.png",
    url: "https://medium.com/@401anshgajera/automating-education-with-ai-agents-my-internship-journey-with-agno-agi-eb1de749865a",
  },
];

export default function SmartInboxPage() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-[-3rem] top-[10rem] h-64 w-64 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mb-12">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>

        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase mb-3">
          Quick Wins
        </p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900">
          Smart Inbox Router
        </h1>
        <p className="text-slate-600 text-lg mt-3 max-w-2xl">
          Technical articles and deep-dives related to our Smart Inbox Router automation and email triage systems.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <a
            key={article.url}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-slate-200 bg-white/90 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-6 flex flex-col flex-1">
              <p className="text-xs font-medium text-blue-600 uppercase tracking-wide mb-2">
                {article.author}
              </p>
              <h2 className="headline-primary text-lg font-semibold text-slate-900 mb-3 leading-snug">
                {article.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                {article.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                Read on Medium
                <ExternalLink size={14} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
