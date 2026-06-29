import { ShieldCheck, Rocket, Users, Code2, FileText, Activity } from "lucide-react";

export function PremiumTrust() {
  const trustItems = [
    {
      title: "Production-first architecture",
      description: "We build systems that run in production, not just demos that look good in presentations.",
      icon: Code2
    },
    {
      title: "Security-aware engineering",
      description: "Security is built into every layer, from data handling to authentication and access control.",
      icon: ShieldCheck
    },
    {
      title: "Human-in-the-loop safety",
      description: "Critical decisions always have human oversight and approval mechanisms.",
      icon: Users
    },
    {
      title: "API-first integrations",
      description: "Every system is built with clean APIs for easy integration with your existing tools.",
      icon: Rocket
    },
    {
      title: "Documentation and handover",
      description: "Complete documentation ensures your team can understand and maintain the system.",
      icon: FileText
    },
    {
      title: "Monitoring after launch",
      description: "We don't disappear after launch. Continuous monitoring ensures smooth operation.",
      icon: Activity
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-medium tracking-[0.2em] text-slate-400 uppercase mb-4">
            BUILT LIKE SOFTWARE. NOT DEMOS.
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-light leading-tight mb-8">
            What makes our approach different
          </h2>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            We treat AI systems like production software, not experimental projects. This means comprehensive testing, proper documentation, and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustItems.map((item) => (
            <div key={item.title} className="border-t border-slate-700 pt-8">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                <item.icon size={24} className="text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-white mb-3">{item.title}</h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}