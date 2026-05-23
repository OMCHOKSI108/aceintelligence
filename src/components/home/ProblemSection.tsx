export function ProblemSection() {
  const problems = [
    {
      title: "Critical work still happens by hand",
      description: "Teams rely on manual steps, handoffs, and spreadsheets to keep operations moving.",
    },
    {
      title: "Automation breaks without oversight",
      description: "One-off scripts and fragile tools fail under real-world exceptions and approvals.",
    },
    {
      title: "Visibility is missing",
      description: "Leaders can&apos;t see who approved what, when, or why a workflow changed state.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          You&apos;re not imagining it
        </h2>
        <p className="text-slate-600 text-lg">
          These problems are real, and they slow down every team that depends on reliable operations.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((problem, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-red-100 bg-red-50/50 p-6"
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center mb-4">
              <span className="text-red-600 font-bold">{idx + 1}</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {problem.title}
            </h3>
            <p className="text-sm text-slate-600">{problem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
