import { FileText, Scale, Settings, Code } from "lucide-react";

export function UseCases() {
  const useCases = [
    {
      icon: FileText,
      title: "Finance",
      description: "Automate invoice routing, approvals, and reconciliation with clear audit trails.",
    },
    {
      icon: Scale,
      title: "Legal",
      description: "Contract intake, clause review routing, and compliance workflows with approvals.",
    },
    {
      icon: Settings,
      title: "Operations",
      description: "SOP execution, incident workflows, and vendor coordination without manual handoffs.",
    },
    {
      icon: Code,
      title: "Engineering",
      description: "Release checklists, on-call runbooks, and change management with tracked ownership.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          Where it&apos;s used
        </h2>
        <p className="text-slate-600 text-lg">
          Real automation workflows across every department in your enterprise.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {useCases.map((useCase, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
              <useCase.icon size={24} className="text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {useCase.title}
            </h3>
            <p className="text-sm text-slate-600">{useCase.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
