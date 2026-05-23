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
} from "lucide-react";

const projects = [
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
          Featured product: ChatPDF
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl">
          A workflow automation platform that keeps approvals, handoffs, and accountability in one place.
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
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                    >
                      Visit live site →
                    </a>
                  )}
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