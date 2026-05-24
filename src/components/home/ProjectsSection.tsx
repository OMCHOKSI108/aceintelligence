"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  MessageSquare,
  FileText,
  Code,
  Database,
  Layers,
  Activity,
  Bot,
  AudioWaveform,
  Video,
} from "lucide-react";

const projects = [
  {
    id: "multi-agent-research",
    badge: "Production v8.0",
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
    title: "Multi-Agent Research System",
    tagline: "8 autonomous AI agents collaborating on academic research",
    description:
      "An advanced multi-agent research platform where 8 specialized agents collaborate to transform a research topic into a comprehensive IEEE-format academic paper — fully autonomous.",
    team: [
      { name: "OMCHOKSI108", username: "OMCHOKSI108", href: "https://github.com/OMCHOKSI108" },
      { name: "firefistisdead", username: "firefistisdead", href: "https://github.com/firefistisdead" },
      { name: "anshgajera", username: "anshgajera", href: "https://github.com/anshgajera" },
    ],
    images: ["/multiagent_research_demo.png", "/multiagent_research_n8n_flow.png"],
    liveUrl: "/projects/multi-agent-research",
    githubUrl: "https://github.com/OMCHOKSI108/AI-AUTOMATION-WORKFLOWS",
    features: [
      { icon: Bot, text: "8 specialized AI agents collaborating in a unified pipeline" },
      { icon: Layers, text: "LangGraph orchestration with strict verification layers" },
      { icon: FileText, text: "Generates complete IEEE-format research papers" },
      { icon: Database, text: "ChromaDB vector memory for RAG-based retrieval" },
      { icon: Code, text: "Modular pipeline integrating arXiv & Semantic Scholar APIs" },
      { icon: Activity, text: "Real-time agent progress visualization in glassmorphism UI" },
      { icon: Shield, text: "Hallucination-reducing novelty and ethics validation" },
      { icon: Video, text: "Proof of capability for enterprise multi-agent upsell" },
    ],
    techStack: ["n8n", "LangGraph", "LLaMA 3.3-70B", "ChromaDB", "arXiv API", "Semantic Scholar", "DuckDuckGo"],
    status: "Production-ready v8.0 — single unified n8n workflow.",
  },
  {
    id: "multi-modal-rag",
    badge: "Live demo",
    badgeColor: "bg-green-100 text-green-800 border-green-200",
    title: "Multi-Modal RAG Agent",
    tagline: "Telegram chatbot with n8n, Milvus & GPT-4o-mini",
    description:
      "An intelligent chatbot that handles text, audio, images, and documents via Telegram — converting them into vector embeddings for RAG-powered responses.",
    team: [
      { name: "OMCHOKSI108", username: "OMCHOKSI108", href: "https://github.com/OMCHOKSI108" },
      { name: "firefistisdead", username: "firefistisdead", href: "https://github.com/firefistisdead" },
      { name: "anshgajera", username: "anshgajera", href: "https://github.com/anshgajera" },
    ],
    images: ["/multimodal_rag.png"],
    liveUrl: "/projects/multi-modal-rag",
    githubUrl: "https://github.com/OMCHOKSI108/AI-AUTOMATION-WORKFLOWS/tree/main/MULTI_MODEL_RAG_AGENT",
    features: [
      { icon: Bot, text: "Multi-modal input: text, audio, images, and documents from Telegram" },
      { icon: Database, text: "Milvus vector database for efficient similarity search" },
      { icon: Layers, text: "Cohere multilingual embeddings for accurate semantic understanding" },
      { icon: Code, text: "n8n workflow orchestration with visual monitoring" },
      { icon: MessageSquare, text: "Conversational memory for coherent multi-turn interactions" },
      { icon: FileText, text: "Automatic document parsing and chunking from PDFs" },
      { icon: AudioWaveform, text: "Audio transcription and image OCR processing pipeline" },
      { icon: Video, text: "Live demo on YouTube — watch it in action" },
    ],
    techStack: ["n8n", "Milvus", "Cohere", "GPT-4o-mini", "Telegram API", "Docker", "ngrok"],
    status: "Production-ready. Deploy via Docker with webhook support.",
  },
  {
    id: "chatpdf",
    badge: "Private beta",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
    title: "ChatPDF",
    tagline: "Automation for knowledge-heavy workflows",
    description: "Automates intake, routing, approvals, and follow-ups so teams can move faster with full visibility.",
    team: [
      { name: "OMCHOKSI108", username: "OMCHOKSI108", href: "https://github.com/OMCHOKSI108" },
      { name: "firefistisdead", username: "firefistisdead", href: "https://github.com/firefistisdead" },
      { name: "anshgajera", username: "anshgajera", href: "https://github.com/anshgajera" },
    ],
    images: ["/landingpage.jpeg", "/chatscreen.jpeg"],
    liveUrl: "http://chatpdf.vercel.app/",
    features: [
      { icon: FileText, text: "Automated intake, triage, and routing for requests" },
      { icon: Database, text: "Workflow state tracking with durable audit logs" },
      { icon: Layers, text: "Reusable automation steps with approval gates" },
      { icon: Code, text: "APIs for system-to-system workflow triggers" },
      { icon: MessageSquare, text: "Operator inbox with human-in-the-loop reviews" },
      { icon: Shield, text: "Role-based access and approval policies" },
      { icon: Activity, text: "Operational dashboards for throughput and exceptions" },
    ],
    techStack: ["Next.js", "FastAPI", "Redis", "PostgreSQL", "Qdrant", "STT/TTS"],
    status: "Platform stack: user app, admin console, backend, workers, and voice pipeline",
  },
];

export function ProjectsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Featured</p>
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
          Our products
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl">
          Production-grade AI systems and automation platforms built by our team.
        </p>
      </div>

      <div className="grid gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-sm p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="absolute top-4 right-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${project.badgeColor}`}
              >
                {project.badge}
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="mb-6">
                  <h3 className="headline-primary text-2xl sm:text-3xl text-slate-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500">{project.tagline}</p>
                  <p className="text-slate-600 mt-3">{project.description}</p>
                </div>

                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                  {project.team.map((member) => (
                    <div key={member.username} className="flex items-center gap-2">
                      <img
                        src={`https://avatars.githubusercontent.com/${member.username}?size=160`}
                        alt={`${member.name} profile`}
                        className="w-10 h-10 rounded-full border border-slate-200"
                      />
                      <div>
                        <p className="text-xs text-slate-500">Developer</p>
                        <Link
                          href={member.href}
                          className="text-xs font-medium text-slate-900 hover:text-slate-700"
                        >
                          {member.name}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                <ul className="space-y-3 mb-6">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <feature.icon size={18} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-slate-600">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-3">{project.status}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {project.id === "multi-modal-rag" ? "View project →" : "Visit live site →"}
                      </a>
                    )}
                    {"githubUrl" in project && project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline transition-colors"
                      >
                        <svg className="w-4 h-4 mr-1.5" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                        GitHub →
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                {project.images && project.images.length > 0 && (
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                    {project.images.map((img, idx) => (
                      <div key={idx} className="rounded-xl overflow-hidden border border-slate-200 bg-white">
                        <Image
                          src={img}
                          alt={`${project.title} screenshot ${idx + 1}`}
                          width={700}
                          height={520}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
