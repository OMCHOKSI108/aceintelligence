"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Terminal, Play, RotateCcw, Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";

type LogEntry = {
  agent: string;
  action: string;
  status: "running" | "success" | "error";
  detail?: string;
};

const agentSteps: LogEntry[] = [
  { agent: "Orchestrator", action: "Initializing research state", status: "success", detail: "State object created with artifacts container" },
  { agent: "Keyword Generator", action: "Generating search keywords", status: "success", detail: "LLaMA 3.3-70B: primary + secondary keywords generated" },
  { agent: "Researcher", action: "Searching external APIs", status: "success", detail: "arXiv: 12 papers found | Semantic Scholar: 8 papers found" },
  { agent: "Literature Reviewer", action: "Analyzing search results", status: "success", detail: "3 key themes identified across 20 papers" },
  { agent: "Strategist", action: "Formulating research strategy", status: "success", detail: "Gap statement + 3 research questions defined" },
  { agent: "Architect", action: "Designing methodology", status: "success", detail: "Mixed-methods approach with validation framework" },
  { agent: "Implementer", action: "Planning implementation", status: "success", detail: "Data pipeline spec + preprocessing steps defined" },
  { agent: "Analyst", action: "Designing experiments", status: "success", detail: "3 experiments with success metrics" },
  { agent: "Editor", action: "Compiling final paper", status: "success", detail: "IEEE-format paper generated with citations" },
];

export function ResearchSandbox() {
  const [topic, setTopic] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const stepRef = useRef(0);

  useEffect(() => {
    if (!isRunning) return;
    stepRef.current = 0;

    const id = setInterval(() => {
      if (stepRef.current < agentSteps.length) {
        const step = stepRef.current;
        setLogs((prev) => [...prev, agentSteps[step]]);
        stepRef.current = step + 1;
        setTimeout(() => {
          logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
        }, 50);
      } else {
        clearInterval(id);
        setLogs((prev) => [...prev, { agent: "System", action: "Workflow complete", status: "success", detail: "8 agents executed • 45s total • Paper ready" }]);
        setIsRunning(false);
        setIsComplete(true);
      }
    }, 400);

    return () => clearInterval(id);
  }, [isRunning]);

  const runAgent = useCallback(() => {
    if (!topic.trim()) return;
    setIsRunning(true);
    setIsComplete(false);
    setLogs([{ agent: "System", action: "Workflow triggered", status: "running", detail: `Topic: "${topic}"` }]);
  }, [topic]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setIsComplete(false);
    setLogs([]);
    setTopic("");
  }, []);

  const statusIcon = (status: string) => {
    switch (status) {
      case "running": return <Loader2 size={14} className="animate-spin text-blue-400 flex-shrink-0" />;
      case "success": return <CheckCircle size={14} className="text-green-400 flex-shrink-0" />;
      case "error": return <XCircle size={14} className="text-red-400 flex-shrink-0" />;
      default: return <ArrowRight size={14} className="text-slate-500 flex-shrink-0" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="bg-slate-900 text-slate-100 px-5 py-3 flex items-center gap-2 border-b border-slate-700">
        <Terminal size={16} />
        <span className="text-sm font-medium">Agent Execution Sandbox</span>
        <span className="text-xs text-slate-500 ml-auto">Simulated environment</span>
      </div>

      <div className="p-5">
        <p className="text-sm text-slate-600 mb-4">
          Enter a research topic below to see how our 8-agent pipeline executes autonomously.
        </p>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a research topic..."
            disabled={isRunning}
            className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={runAgent}
            disabled={isRunning || !topic.trim()}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Run
          </button>
          {isComplete && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          )}
        </div>

        <div
          ref={logRef}
          className="bg-slate-950 text-slate-100 rounded-lg p-4 h-64 overflow-y-auto font-mono text-xs space-y-1.5"
        >
          {logs.length === 0 ? (
            <p className="text-slate-600 italic">Awaiting input — the pipeline starts when you click Run.</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="flex items-start gap-2 leading-relaxed">
                {statusIcon(log.status)}
                <span>
                  <span className="text-blue-300">[{log.agent}]</span>{" "}
                  <span>{log.action}</span>
                  {log.detail && <span className="text-slate-500"> — {log.detail}</span>}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
          <span>8 specialized agents</span>
          <span>•</span>
          <span>LLaMA 3.3-70B</span>
          <span>•</span>
          <span>arXiv + Semantic Scholar</span>
        </div>
      </div>
    </div>
  );
}
