"use client";

export function ProjectsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          Ace Intelligence Platform
        </h2>
        <p className="text-slate-600 text-lg">
          Production-grade AI automation agents for enterprise data
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <div className="mb-6">
          <h3 className="headline-primary text-2xl sm:text-3xl text-slate-900 mb-2">
            ChatPDF & Enterprise AI Platform
          </h3>
          <p className="text-slate-600">
            Conversational AI platform that queries and navigates massive unstructured
            enterprise data with near-zero hallucinations.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {[
            "Multi-modal ingestion (PDF, CSV, JSON, code, audio)",
            "Role-based access control",
            "Voice + chat interface",
            "Hybrid retrieval pipeline",
            "Autonomous crawler agents",
            "Knowledge graph reasoning",
          ].map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-sm text-slate-700"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>

        <div className="border-t border-slate-100 pt-6">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Key Features
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Zero hallucination responses",
              "Works on massive unstructured data",
              "Enterprise-grade security (ZKRAG)",
              "Lower compute cost than traditional RAG",
              "Faster response times",
              "Scalable to enterprise datasets",
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-lg bg-slate-50"
              >
                <span className="text-green-600">✓</span>
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Next.js", "FastAPI", "Qdrant", "NetworkX", "Redis", "PostgreSQL"].map(
            (tech) => (
              <span
                key={tech}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600"
              >
                {tech}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}