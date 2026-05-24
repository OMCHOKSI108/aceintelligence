import { CheckCircle } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          We design automation like a human operator
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl">
          Instead of brittle scripts, we build workflows with clear approvals, safe fallbacks, and measurable outcomes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {[
            "Map the workflow, owners, and approval checkpoints",
            "Connect systems and define trusted automation steps",
            "Monitor execution with human in the loop escalation",
          ].map((point, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700">{point}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-6">
          <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            The Result
          </h3>
          <ul className="space-y-3">
            {[
              "Fewer manual steps and errors",
              "Clear approvals and audit ready trails",
              "Predictable SLAs and escalation paths",
              "Operational confidence across teams",
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-600" />
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
