import Link from "next/link";

export function PricingSection() {
  const plans = [
    {
      name: "Business Local",
      price: "Custom",
      description: "Deploy on your own infrastructure. Full control, zero data leaving your network.",
      features: [
        "Self-hosted deployment",
        "Multi-modal ingestion",
        "Role-based access control",
        "Voice + chat interface",
      ],
    },
    {
      name: "Business Hybrid",
      description: "Our infrastructure with your data. Best of both worlds.",
      price: "$2,000",
      period: "/month",
      features: [
        "Hybrid cloud deployment",
        "Qdrant + Knowledge Graph",
        "Crawler agent access",
        "Priority support",
      ],
    },
    {
      name: "Enterprise",
      description: "Full-scale deployment for large organizations with custom needs.",
      price: "$5,000",
      period: "/month",
      features: [
        "Custom integrations",
        "Dedicated infrastructure",
        "SLA guarantees",
        "Custom AI model tuning",
      ],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12 text-center">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          Pricing
        </h2>
        <p className="text-slate-600 text-lg">
          Transparent pricing based on your data volume and compute needs.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-xl border p-6 ${
              idx === 1
                ? "border-blue-600 bg-blue-50/50"
                : "border-slate-200 bg-white"
            }`}
          >
            {idx === 1 && (
              <div className="text-center mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                  Most Popular
                </span>
              </div>
            )}
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {plan.name}
            </h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-slate-900">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-slate-600">{plan.period}</span>
              )}
            </div>
            <p className="text-sm text-slate-600 mb-6">{plan.description}</p>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span className="text-sm text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`block text-center px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                idx === 1
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-slate-100 text-slate-900 hover:bg-slate-200"
              }`}
            >
              Book a Demo
            </Link>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-slate-500 mt-8">
        $50K ACV average • 200 customers = $10M ARR potential
      </p>
    </section>
  );
}
