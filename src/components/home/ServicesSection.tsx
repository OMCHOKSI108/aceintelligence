import { CheckCircle2, ClipboardList, ShieldCheck, Rocket, FileText, Users } from "lucide-react";

export function ServicesSection() {
  const enterpriseProcess = [
    {
      step: "01",
      title: "Strategic Discovery",
      desc: "Deep dive into your business objectives, technical constraints, and success metrics. We align AI strategy with your enterprise goals.",
      icon: ClipboardList,
      color: "blue",
    },
    {
      step: "02",
      title: "Architecture Design",
      desc: "Our senior engineers craft scalable, secure architectures with failure modes, fallback mechanisms, and compliance built-in from day one.",
      icon: FileText,
      color: "emerald",
    },
    {
      step: "03",
      title: "Enterprise Agreement",
      desc: "Comprehensive SOW with SLAs, security protocols, compliance checklists, and clear exit criteria. No surprises, just results.",
      icon: CheckCircle2,
      color: "purple",
    },
    {
      step: "04",
      title: "Agile Development",
      desc: "Bi-weekly sprints with continuous integration, automated testing, and stakeholder demos. You see working software, not PowerPoint slides.",
      icon: Rocket,
      color: "sky",
    },
    {
      step: "05",
      title: "Production Deployment",
      desc: "Zero-downtime rollouts with feature flags, canary releases, and comprehensive monitoring. We handle the heavy lifting.",
      icon: ShieldCheck,
      color: "amber",
    },
    {
      step: "06",
      title: "Knowledge Transfer",
      desc: "Complete documentation, architecture diagrams, runbooks, and team training. You own the solution, we ensure you can operate it.",
      icon: Users,
      color: "rose",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Enterprise Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-10 left-10 w-80 h-80 bg-purple-100/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-100/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-full h-2 bg-gradient-to-r from-transparent via-purple-200/20 to-transparent" />
      </div>
      
      <div className="mb-14 text-center relative z-10">
        <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Enterprise AI Delivery</p>
        <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
          How We Ship Production-Grade AI
        </h2>
        <p className="text-slate-600 text-lg max-w-4xl mx-auto">
          From strategic alignment to full-scale deployment, our enterprise-proven methodology ensures AI solutions that deliver real business value, not just technical demos.
        </p>
      </div>

      {/* Enterprise Process Timeline */}
      <div className="space-y-8 relative">
        {/* Timeline Connector */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-200 to-rose-200 hidden lg:block" style={{ zIndex: 1 }} />
        
        {enterpriseProcess.map((item, i) => {
          const colorClasses = {
            blue: "bg-blue-50 text-blue-600 border-blue-200",
            emerald: "bg-emerald-50 text-emerald-600 border-emerald-200",
            purple: "bg-purple-50 text-purple-600 border-purple-200",
            sky: "bg-sky-50 text-sky-600 border-sky-200",
            amber: "bg-amber-50 text-amber-600 border-amber-200",
            rose: "bg-rose-50 text-rose-600 border-rose-200",
          };
          
          const currentColor = colorClasses[item.color as keyof typeof colorClasses] || "bg-blue-50 text-blue-600 border-blue-200";
          
          return (
            <div key={i} className="relative pl-16 lg:pl-24 enterprise-process-step">
              {/* Timeline Dot */}
              <div className="absolute left-0 top-6 w-12 h-12 rounded-full bg-white border-4 border-slate-200 flex items-center justify-center shadow-lg">
                <div className={`w-8 h-8 rounded-full ${currentColor.split(' ')[0]} ${currentColor.split(' ')[1]} flex items-center justify-center font-bold text-sm`}>
                  {item.step}
                </div>
              </div>
              
              {/* Process Card */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 enterprise-process-card">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg ${currentColor} flex items-center justify-center`}>
                    <item.icon size={24} className={currentColor.split(' ')[1]} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                
                {/* Enterprise Features */}
                {i === 0 && (
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <p className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-green-500" />
                      DELIVERABLES
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded">Technical Requirements</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">ROI Analysis</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">Compliance Checklist</span>
                    </div>
                  </div>
                )}
                
                {i === 2 && (
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <p className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1">
                      <ShieldCheck size={14} className="text-blue-500" />
                      ENTERPRISE GUARANTEES
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded">99.9% Uptime SLA</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">SOC 2 Compliance</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">24/7 Support</span>
                    </div>
                  </div>
                )}
                
                {i === 5 && (
                  <div className="border-t border-slate-100 pt-4 mt-4">
                    <p className="text-xs font-medium text-slate-700 mb-2 flex items-center gap-1">
                      <FileText size={14} className="text-purple-500" />
                      HANDOVER PACKAGE
                    </p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 px-2 py-1 rounded">Architecture Diagrams</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">Runbooks</span>
                      <span className="bg-slate-100 px-2 py-1 rounded">Training Sessions</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
