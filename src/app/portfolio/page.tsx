import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  MessageSquare,
  FileText,
  Database,
  Layers,
  Activity,
  Bot,
  AudioWaveform,
  Code,
  ArrowUpRight,
  TrendingUp,
  BarChart3,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Production-grade AI systems and automation platforms built by Ace Intelligence. Explore our projects: Algo Trading Bot, PralayAI, Multi Agent Research System, and more.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Ace Intelligence Systems",
    description:
      "Production-grade AI systems and automation platforms built by our team.",
  },
};

interface Project {
  badge: string;
  badgeColor: string;
  title: string;
  tagline: string;
  description: string;
  team: string[];
  href: string;
  image: string;
  features: { icon: React.ComponentType<{ size?: number; className?: string }>; text: string }[];
  techStack: string[];
}

const projects: Project[] = [
  {
    badge: "Production ready",
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    title: "Algo Trading Bot",
    tagline: "Autonomous Forex & Crypto trading with ML & RL strategies",
    description:
      "An enterprise-grade automated trading platform combining weighted ensemble strategies, LSTM neural networks, and reinforcement learning with MetaTrader 5 integration, featuring a React dashboard and FastAPI backend.",
    team: ["OMCHOKSI108", "firefistisdead", "anshgajera"],
    href: "/projects/trade-like-whale",
    image: "/Tradinview_strategy.png",
    features: [
      { icon: TrendingUp, text: "Multi-strategy ensemble: ADX, RSI, MACD, Bollinger Bands" },
      { icon: BarChart3, text: "LSTM neural networks & reinforcement learning agent" },
      { icon: Shield, text: "ATR-based position sizing & drawdown protection" },
      { icon: Database, text: "70/30 walk-forward validation on 10K candles" },
      { icon: Code, text: "FastAPI + React dashboard with real-time monitoring" },
      { icon: Layers, text: "Multi-symbol & multi-timeframe (1m to 1d)" },
      { icon: Activity, text: "$77K+ portfolio profit across all strategies" },
    ],
    techStack: ["Python", "FastAPI", "React", "MetaTrader 5", "TensorFlow", "PostgreSQL", "Docker"],
  },
  {
    badge: "Fine-tuned LLM",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    title: "PralayAI",
    tagline: "Defensive Cybersecurity AI Assistant - fine-tuned Qwen2.5 1.5B",
    description:
      "A full-stack defensive cybersecurity chatbot built with a fine-tuned open-source LLM (Qwen2.5 1.5B, QLoRA), FastAPI backend, PostgreSQL chat persistence, and a React Gemini-clone frontend - deployed on Hugging Face Spaces.",
    team: ["OMCHOKSI108"],
    href: "/projects/pralay-ai",
    image: "/pralay.png",
    features: [
      { icon: Bot, text: "Fine-tuned Qwen2.5 1.5B with QLoRA on cybersecurity data" },
      { icon: Shield, text: "Defensive-only safety policy - rejects malicious prompts" },
      { icon: Database, text: "PostgreSQL for conversation & feedback persistence" },
      { icon: Code, text: "FastAPI backend + React Gemini-clone frontend" },
      { icon: Layers, text: "Dual inference: local CUDA & Hugging Face CPU Space" },
      { icon: FileText, text: "Automated safety & quality evaluation notebook" },
      { icon: Activity, text: "Training loss convergence & safety scoring" },
    ],
    techStack: ["Python", "FastAPI", "React", "PostgreSQL", "Qwen2.5", "QLoRA", "Hugging Face"],
  },
  {
    badge: "Production v8.0",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    title: "Multi Agent Research System",
    tagline: "8 autonomous AI agents collaborating on academic research",
    description:
      "An advanced multi agent research platform where 8 specialized agents collaborate to transform a research topic into a comprehensive IEEE format academic paper, fully autonomous.",
    team: ["OMCHOKSI108", "firefistisdead", "anshgajera"],
    href: "/projects/multi-agent-research",
    image: "/multiagent_research_demo.png",
    features: [
      { icon: Bot, text: "8 specialized AI agents in a unified pipeline" },
      { icon: Layers, text: "LangGraph orchestration with strict verification" },
      { icon: FileText, text: "Generates complete IEEE format research papers" },
      { icon: Database, text: "ChromaDB vector memory for RAG retrieval" },
      { icon: Code, text: "Modular pipeline integrating arXiv & Semantic Scholar" },
      { icon: Activity, text: "Real time agent progress in glassmorphism UI" },
      { icon: Shield, text: "Hallucination-reducing novelty and ethics validation" },
    ],
    techStack: ["n8n", "LangGraph", "LLaMA 3.3 70B", "ChromaDB", "arXiv API", "Semantic Scholar"],
  },
  {
    badge: "Live demo",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    title: "Multi Modal RAG Agent",
    tagline: "Telegram chatbot with n8n, Milvus & GPT-4o mini",
    description:
      "An intelligent chatbot that handles text, audio, images, and documents via Telegram, converting them into vector embeddings for RAG powered responses.",
    team: ["OMCHOKSI108", "firefistisdead", "anshgajera"],
    href: "/projects/multi-modal-rag",
    image: "/multimodal_rag.png",
    features: [
      { icon: Bot, text: "Multi modal input: text, audio, images, documents" },
      { icon: Database, text: "Milvus vector database for similarity search" },
      { icon: Layers, text: "Cohere multilingual embeddings" },
      { icon: Code, text: "n8n workflow orchestration with visual monitoring" },
      { icon: MessageSquare, text: "Conversational memory for multi-turn interactions" },
      { icon: FileText, text: "Automatic document parsing and chunking" },
      { icon: AudioWaveform, text: "Audio transcription and image OCR pipeline" },
    ],
    techStack: ["n8n", "Milvus", "Cohere", "GPT-4o mini", "Telegram API", "Docker"],
  },
  {
    badge: "Legacy demo",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    title: "AI Food Delivery Agent",
    tagline: "Two-way conversational ordering via Telegram & WhatsApp",
    description:
      "A two way conversational AI agent that handles food orders, menu inquiries, and delivery status checks via Telegram and WhatsApp, logging everything to Google Sheets.",
    team: ["OMCHOKSI108", "firefistisdead", "anshgajera"],
    href: "/projects/food-delivery-agent",
    image: "/FoodDeliverySystem_1.png",
    features: [
      { icon: MessageSquare, text: "Two-way conversational AI via Telegram & WhatsApp" },
      { icon: Bot, text: "LLM-powered intent recognition" },
      { icon: FileText, text: "Google Sheets integration for menu & orders" },
      { icon: Code, text: "n8n webhook orchestration" },
      { icon: Activity, text: "Zero human intervention order processing" },
    ],
    techStack: ["n8n", "LLM API", "Telegram API", "WhatsApp API", "Google Sheets"],
  },
  {
    badge: "Private beta",
    badgeColor: "bg-sky-100 text-sky-800 border-sky-200",
    title: "ChatPDF",
    tagline: "Document intelligence for knowledge-heavy workflows",
    description:
      "A full-stack document intelligence platform with RAG chat, async ingestion, multi-document support, voice chat, OAuth, and organization APIs.",
    team: ["OMCHOKSI108", "firefistisdead", "anshgajera"],
    href: "/projects/chatpdf",
    image: "/landingpage.jpeg",
    features: [
      { icon: FileText, text: "Automated intake, triage, and routing" },
      { icon: Database, text: "Workflow state tracking with audit logs" },
      { icon: Layers, text: "Reusable automation with approval gates" },
      { icon: Code, text: "APIs for system-to-system workflow triggers" },
      { icon: MessageSquare, text: "Operator inbox with human-in-the-loop reviews" },
      { icon: Shield, text: "Role-based access and approval policies" },
      { icon: Activity, text: "Operational dashboards for throughput" },
    ],
    techStack: ["Next.js", "FastAPI", "Redis", "PostgreSQL", "Qdrant", "STT/TTS"],
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      target={project.href.startsWith("http") ? "_blank" : undefined}
      rel={project.href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/9] bg-slate-100 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span
          className={`absolute top-3 right-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium border z-10 ${project.badgeColor}`}
        >
          {project.badge}
        </span>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h2 className="headline-primary text-lg font-semibold text-slate-900 mb-0.5">
          {project.title}
        </h2>
        <p className="text-xs text-slate-500 mb-3">{project.tagline}</p>
        <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-500"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-400">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-slate-100 items-center justify-between">
          <div className="flex gap-1.5">
            {project.team.map((member) => (
              <span
                key={member}
                className="w-7 h-7 rounded-full bg-slate-200 text-[8px] font-bold text-slate-600 flex items-center justify-center"
                title={member}
              >
                {member.slice(0, 2).toUpperCase()}
              </span>
            ))}
          </div>
          <span className="inline-flex items-center text-xs font-medium text-slate-500 group-hover:text-slate-700 transition-colors gap-1">
            View project
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function PortfolioPage() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute right-[-3rem] top-[10rem] h-64 w-64 rounded-full bg-slate-200/40 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">
          Our Work
        </p>
        <h1 className="headline-primary text-4xl sm:text-5xl text-slate-900 mt-3 mb-3">
          Portfolio
        </h1>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          Production-grade AI systems and automation platforms built by our team.
        </p>
      </div>

      <div className="relative z-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
