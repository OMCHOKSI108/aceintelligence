import Link from "next/link";

const founders = [
  {
    name: "Ansh Gajera",
    role: "CEO",
    description:
      "Drives strategic vision, business transformation, and turns AI into tangible ROI. Background in algorithmic trading.",
    portfolio: "https://anshgajera.dev",
    github: "https://github.com/anshgajera",
  },
  {
    name: "Om Choksi",
    role: "CTO & Chief Architect",
    description:
      "Expert in technical architecture, custom multi agent LLM workflows (LangGraph), and cloud backend infrastructure (AWS/Azure).",
    portfolio: "https://www.omchoksi.code",
    github: "https://github.com/OMCHOKSI108",
  },
  {
    name: "Yash Khare",
    role: "Founder",
    description:
      "Leads market positioning and develops dedicated RAG architectures and enterprise automation systems.",
    portfolio: "https://yashkhare-portfolio.netlify.app",
    github: "https://github.com/firefistisdead",
  },
];

export function FounderSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Team</p>
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
          Meet the founding team
        </h2>
        <p className="text-slate-600 text-lg">
          Three Artificial Intelligence &amp; Machine Learning (AIML) students from CHARUSAT University,
          graduating 2027, building the future of enterprise AI.
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
            <div className="flex justify-center gap-3">
              <Link
                href={founder.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Portfolio →
              </Link>
              <Link
                href={founder.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-slate-500 hover:text-slate-700"
              >
                GitHub →
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Based in Ahmedabad and Surat. Expanding to Bangalore for the startup ecosystem.
        </p>
      </div>
    </section>
  );
}
