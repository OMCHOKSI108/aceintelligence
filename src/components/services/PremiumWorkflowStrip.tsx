import { ArrowRight, Cpu, Database, Cloud, ShieldCheck, Activity } from "lucide-react";

export function PremiumWorkflowStrip() {
  const steps = [
    { name: "Problem", icon: Cpu },
    { name: "Data", icon: Database },
    { name: "Intelligence", icon: Cloud },
    { name: "Workflow", icon: ArrowRight },
    { name: "Deployment", icon: ShieldCheck },
    { name: "Monitoring", icon: Activity }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {steps.map((step, index) => (
            <div key={step.name} className="flex flex-col items-center gap-3 group">
              <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center group-hover:bg-slate-700 transition-all duration-300 border border-slate-700">
                <step.icon size={28} className="text-slate-300" />
              </div>
              <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-all duration-300">
                {step.name}
              </p>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 right-0 w-16 h-px bg-slate-700" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}