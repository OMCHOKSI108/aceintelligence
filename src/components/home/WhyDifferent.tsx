export function WhyDifferent() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          We don&apos;t ship brittle bots. We ship trusted workflows.
        </h2>
        <p className="text-slate-600 text-lg">
          This is the fundamental difference, and it&apos;s why teams trust the outcomes.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-400 mb-4">Others</h3>
          <ul className="space-y-3">
            {[
              "One-off scripts with no governance",
              "Automation without approvals",
              "Breaks when exceptions appear",
              "No audit trail or ownership",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-red-500 mt-0.5">✗</span>
                <span className="text-sm text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Ace Intelligence</h3>
          <ul className="space-y-3">
            {[
              "Human-in-the-loop guardrails",
              "Clear ownership and approvals",
              "Resilient automation paths",
              "Audit-ready reporting",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span className="text-sm text-slate-700 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-slate-900 text-white p-6 text-center">
        <p className="text-lg font-medium">
          Enterprise automation needs accountability, not just speed. We built for that reality.
        </p>
      </div>
    </section>
  );
}
