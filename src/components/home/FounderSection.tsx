import Link from "next/link";

export function FounderSection() {
  const founders = [
    {
      name: "Yash Khare",
      role: "CEO",
      description:
        "Core AI architecture and hybrid retrieval pipeline design. Known each other for 3 years, met in 1st year of college.",
      github: "https://github.com/firefistisdead",
    },
    {
      name: "Om Choksi",
      role: "CTO",
      description:
        "Core AI architecture and crawler agent development. All founders are technical, and we write 100% of the code.",
      github: "https://github.com/OMCHOKSI108",
    },
    {
      name: "Ansh Gajera",
      role: "CPO / COO",
      description:
        "Full-stack development, Next.js dashboard, multi-modal ingestion, access control systems.",
      github: "https://github.com/anshgajera",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          Built by engineers who lived the problem
        </h2>
        <p className="text-slate-600 text-lg">
          Started from ChatPDF, faced RAG limitations firsthand, built the solution.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {founders.map((founder, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-6 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-slate-600">
                {founder.name.charAt(0)}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-1">
              {founder.name}
            </h3>
            <p className="text-sm font-medium text-blue-600 mb-3">
              {founder.role}
            </p>
            <p className="text-sm text-slate-600 mb-4">{founder.description}</p>
            <Link
              href={founder.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              GitHub →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Based in Ahmedabad and Surat, expanding to Bangalore for startup ecosystem access
        </p>
      </div>
    </section>
  );
}
