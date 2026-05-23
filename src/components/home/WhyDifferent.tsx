export function WhyDifferent() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          We don&apos;t guess answers. We navigate your data.
        </h2>
        <p className="text-slate-600 text-lg">
          This is the fundamental difference, and it&apos;s why we eliminate hallucinations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="text-lg font-semibold text-slate-400 mb-4">Others</h3>
          <ul className="space-y-3">
            {[
              "Vector search only and loses structure",
              "Guesses based on similarity",
              "Breaks on large, complex datasets",
              "Hallucinations are common",
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
              "Graph + crawler reasoning",
              "Navigates relationships like a human",
              "Scales to massive enterprise datasets",
              "Near-zero hallucinations",
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
          Enterprise data is relational and hierarchical, not just semantic. We built for that reality.
        </p>
      </div>
    </section>
  );
}
