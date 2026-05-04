import { CheckCircle } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          We map your data like a human researcher
        </h2>
        <p className="text-slate-600 text-lg max-w-2xl">
          Instead of guessing answers from isolated chunks, our AI navigates relationships and hierarchy — just like you would.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          {[
            "Upload your internal data — PDFs, code, docs, databases",
            "Our crawler maps relationships, not just keywords",
            "Ask anything → get accurate answers with source tracing",
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
              "Near-zero hallucinations",
              "Lower compute cost than traditional RAG",
              "Faster response times",
              "Works on massive unstructured datasets",
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
