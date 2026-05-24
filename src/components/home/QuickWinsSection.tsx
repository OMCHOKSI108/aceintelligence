import { Clock, FileText, Inbox, TrendingUp, ArrowRight } from "lucide-react";

const quickWins = [
  {
    title: "Smart Inbox Router",
    tagline: "48-hour deployment",
    description:
      "An n8n + LLM pipeline that monitors incoming emails, classifies intent (support, sales, billing), and routes data to the right system — all within 48 hours.",
    impact: "Saves operational teams 10-20 hours per week",
    icon: Inbox,
    technologies: ["n8n", "Groq", "LLM APIs"],
  },
  {
    title: "Vendor Invoice Parser",
    tagline: "Zero-touch data extraction",
    description:
      "Vision models that extract structured data from PDF invoices and vendor documents, automatically populating your ERP or accounting system.",
    impact: "Eliminates manual data entry for finance teams",
    icon: FileText,
    technologies: ["Vision Models", "n8n", "PostgreSQL"],
  },
  {
    title: "Lead Router & Responder",
    tagline: "Instant CRM integration",
    description:
      "Web forms connected directly to your CRM with AI-generated draft replies, reducing initial response time from hours to seconds.",
    impact: "80% faster lead response times",
    icon: TrendingUp,
    technologies: ["LLM APIs", "CRM API", "n8n"],
  },
];

export function QuickWinsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Quick Wins</p>
          <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
            Immediate ROI, visible impact
          </h2>
          <p className="text-slate-600 text-lg max-w-3xl">
            High-impact micro-automations deployed in days — not months. A Trojan Horse approach:
            start small, prove value, then scale into full enterprise retainers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quickWins.map((win, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <win.icon size={20} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900">{win.title}</h3>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                    <Clock size={12} className="mr-1" />
                    {win.tagline}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4 flex-1">{win.description}</p>

              <div className="border-t border-slate-100 pt-4 mt-auto">
                <div className="flex items-start gap-2 mb-3">
                  <ArrowRight size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm font-medium text-slate-900">{win.impact}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {win.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-slate-900 text-white p-6 sm:p-8 text-center">
          <p className="text-lg sm:text-xl font-medium mb-2">
            Start with a quick win. Scale to enterprise-grade automation.
          </p>
          <p className="text-slate-300 text-sm">
            Every micro-automation is a stepping stone to full RAG builds, ERP systems, or multi-agent networks.
          </p>
        </div>
      </div>
    </section>
  );
}
