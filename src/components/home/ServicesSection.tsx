export function ServicesSection() {
  const discovery = [
    {
      step: "01",
      title: "Share your vision",
      desc: "You tell us what you need to automate, build, or optimize — no technical jargon required.",
    },
    {
      step: "02",
      title: "We design the architecture",
      desc: "Our engineers map workflows, select stack, and draft a solution tailored to your scale.",
    },
    {
      step: "03",
      title: "You approve the scope",
      desc: "Fixed timeline, clear deliverables, and no surprises before a single line of code is written.",
    },
  ];

  const delivery = [
    {
      step: "01",
      title: "Build & iterate",
      desc: "Two-week sprints with continuous demos so you see progress, not just promises.",
    },
    {
      step: "02",
      title: "Test & validate",
      desc: "Production-grade QA including edge-case evaluation, load testing, and security review.",
    },
    {
      step: "03",
      title: "Deploy & monitor",
      desc: "We handle the rollout and set up dashboards so you can observe performance in real time.",
    },
    {
      step: "04",
      title: "Handoff & document",
      desc: "Full runbooks, architecture diagrams, and source code delivered to your team.",
    },
    {
      step: "05",
      title: "Support & scale",
      desc: "Post-launch retainer for maintenance, iterations, and scaling as your needs grow.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-14 text-center">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Our Process</p>
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
          How Ace Intelligence builds
        </h2>
        <p className="text-slate-600 text-lg max-w-3xl mx-auto">
          From your first conversation to a running system — a transparent, repeatable pipeline.
        </p>
      </div>

      <div className="space-y-16">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] text-blue-600 uppercase bg-blue-50 px-3 py-1.5 rounded-full">Phase 1</span>
            <h3 className="text-xl font-bold text-slate-900">Discovery & Agreement</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            {discovery.map((item, i) => (
              <div key={i} className="relative">
                {i < discovery.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10 text-slate-300 text-2xl -translate-y-1/2">
                    →
                  </div>
                )}
                <div className="rounded-xl border border-slate-200 bg-white p-6 h-full hover:border-blue-200 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-sm font-bold text-blue-600">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 -top-8 w-px h-8 bg-slate-200 hidden md:block" />

          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-semibold tracking-[0.15em] text-emerald-600 uppercase bg-emerald-50 px-3 py-1.5 rounded-full">Phase 2</span>
            <h3 className="text-xl font-bold text-slate-900">Delivery & Deployment</h3>
          </div>
          <div className="grid md:grid-cols-5 gap-6">
            {delivery.map((item, i) => (
              <div key={i} className="relative">
                {i < delivery.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10 text-slate-300 text-2xl -translate-y-1/2">
                    →
                  </div>
                )}
                <div className="rounded-xl border border-slate-200 bg-white p-5 h-full hover:border-emerald-200 hover:shadow-md transition-all">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center mb-3 text-xs font-bold text-emerald-600">
                    {item.step}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 mb-2">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
