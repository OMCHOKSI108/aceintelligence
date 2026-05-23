export function SocialProof() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          Trusted by early users
        </h2>
        <p className="text-slate-600 text-lg">
          We&apos;re partnering with early teams to harden the platform in real workflows.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-yellow-400 text-xl">
                ★
              </span>
            ))}
          </div>
          <p className="text-slate-700 italic mb-6">
            &quot;The experience feels deliberate. Answers are grounded, and the workflow is easy to trust.&quot;
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <span className="text-sm font-medium text-slate-600">P</span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900">Product Team</p>
              <p className="text-xs text-slate-500">Design partner</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-8 text-center">
          {[
            { number: "Early", label: "Design partners" },
            { number: "Scoped", label: "Secure workspaces" },
            { number: "Live", label: "Operational feedback loops" },
          ].map((stat, idx) => (
            <div key={idx} className="p-4">
              <p className="text-2xl font-bold text-blue-600">{stat.number}</p>
              <p className="text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
