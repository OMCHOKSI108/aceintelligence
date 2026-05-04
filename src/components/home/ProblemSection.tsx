export function ProblemSection() {
  const problems = [
    {
      title: "Enterprise data is a mess",
      description: "Documents scattered across systems, no clear relationships, impossible to query at scale.",
    },
    {
      title: "Traditional RAG fails",
      description: "Vector search loses context in large datasets. Hallucinations and wrong answers erode trust.",
    },
    {
      title: "Existing tools are unreliable",
      description: "They guess based on keywords instead of understanding how your data actually connects.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          You&apos;re not imagining it
        </h2>
        <p className="text-slate-600 text-lg">
          These problems are real — and they&apos;re costing enterprises millions in lost productivity.
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
