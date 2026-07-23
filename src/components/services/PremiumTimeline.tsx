"use client";

import { useEffect, useState } from "react";
import { ClipboardList, FileText, Rocket, ShieldCheck, Users, CheckCircle2 } from "lucide-react";

export function PremiumTimeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    {
      number: "01",
      title: "Diagnose",
      description: "We study your current workflow, tools, data, users, bottlenecks, and business goals.",
      output: "Workflow map + automation opportunities",
      icon: ClipboardList,
    },
    {
      number: "02",
      title: "Design",
      description: "We define the AI architecture, system flow, data pipeline, safety rules, and success criteria.",
      output: "Technical blueprint",
      icon: FileText,
    },
    {
      number: "03",
      title: "Prototype",
      description: "We build a working MVP quickly to validate the idea before scaling.",
      output: "Clickable/usable AI prototype",
      icon: Rocket,
    },
    {
      number: "04",
      title: "Engineer",
      description: "We turn the prototype into production-grade backend, frontend, APIs, RAG pipelines, agents, and databases.",
      output: "Production-ready system",
      icon: ShieldCheck,
    },
    {
      number: "05",
      title: "Deploy",
      description: "We launch with authentication, hosting, monitoring, logging, CI/CD, and security basics.",
      output: "Live deployed product",
      icon: Users,
    },
    {
      number: "06",
      title: "Improve",
      description: "We monitor real usage, reduce errors, improve prompts/models, and scale the system.",
      output: "Better performance over time",
      icon: CheckCircle2,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const stageElements = document.querySelectorAll(".timeline-stage");

      stageElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          setActiveStage(index);
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="timeline" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white relative">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <p className="text-sm font-medium tracking-[0.2em] text-slate-400 uppercase mb-4">
          THE ACE DELIVERY SYSTEM
        </p>
        <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight">
          A practical process for moving from business problem<br />
          to deployed AI system
        </h2>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start hidden lg:block">
            <div className="space-y-8">
              {stages.map((stage, index) => (
                <div
                  key={stage.number}
                  className="flex items-center gap-4 cursor-pointer transition-all duration-300"
                  onClick={() => {
                    const element = document.getElementById(`stage-${index}`);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "center" });
                    }
                  }}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-mono font-bold transition-all duration-300 ${
                      activeStage === index
                        ? "border-slate-200 bg-slate-200 text-slate-900"
                        : "border-slate-600 bg-slate-900 text-slate-300"
                    }`}
                  >
                    {stage.number}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-medium transition-all duration-300"
                      style={{ color: activeStage === index ? "#f3f4f6" : "#94a3b8" }}
                    >
                      {stage.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-24">
            {stages.map((stage, index) => (
              <div
                key={stage.number}
                id={`stage-${index}`}
                className="timeline-stage relative pl-16 lg:pl-0 border-t border-slate-700 pt-12"
              >
                <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-slate-600 text-sm font-mono font-bold text-slate-300 lg:hidden">
                  {stage.number}
                </div>

                <div className="mb-6 flex items-start gap-6">
                  <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-slate-700 bg-slate-800">
                    <stage.icon size={28} className="text-slate-300" />
                  </div>
                  <div>
                    <h3 className="mb-3 font-serif text-2xl font-light text-white">{stage.title}</h3>
                    <p className="mb-6 leading-relaxed text-slate-300">{stage.description}</p>
                    <div className="border-t border-slate-700 pt-4">
                      <p className="text-sm text-slate-400">
                        Output: <span className="font-medium text-white">{stage.output}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 lg:hidden">
        <div className="flex justify-center gap-4 overflow-x-auto pb-4">
          {stages.map((stage, index) => (
            <button
              key={stage.number}
              onClick={() => {
                const element = document.getElementById(`stage-${index}`);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-sm font-mono font-bold transition-all duration-300 ${
                activeStage === index ? "border-slate-200 bg-slate-200 text-slate-900" : "border-slate-600 bg-slate-800 text-slate-300"
              }`}
            >
              {stage.number}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}