export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Upload your data",
      description: "PDFs, CSV, JSON, code, audio — any internal document or database.",
    },
    {
      step: "02",
      title: "AI maps relationships",
      description: "Not just keywords. Our system understands hierarchy and connections in your data.",
    },
    {
      step: "03",
      title: "Ask anything",
      description: "Get accurate answers with source references. No hallucinations, no guessing.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          How it works
        </h2>
        <p className="text-slate-600 text-lg">
          Three simple steps to accurate AI over your enterprise data.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="relative text-center">
            {idx < steps.length - 1 && (
              <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-slate-200" />
            )}
            <div className="relative z-10 w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold">{step.step}</span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
