import { Shield, Lock, Server } from "lucide-react";

export function SecuritySection() {
  const points = [
    {
      icon: Shield,
      title: "Data never stored (Hybrid mode)",
      description:
        "In hybrid mode, your data stays with you. We process queries without persisting sensitive information.",
    },
    {
      icon: Lock,
      title: "Encryption & ZKRAG",
      description:
        "Our Zero-Knowledge Retrieval Augmented Generation concept ensures your data remains private and encrypted at every step.",
    },
    {
      icon: Server,
      title: "Private deployments",
      description:
        "Deploy on your own infrastructure. Full control, full compliance with your security policies.",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-3">
          Enterprise-grade security
        </h2>
        <p className="text-slate-600 text-lg">
          You&apos;re dealing with sensitive enterprise data, so trust matters. We built for that.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {points.map((point, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-6"
          >
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
              <point.icon size={24} className="text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              {point.title}
            </h3>
            <p className="text-sm text-slate-600">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
