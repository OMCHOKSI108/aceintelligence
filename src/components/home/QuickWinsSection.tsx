import { Clock, FileText, Inbox, TrendingUp, ArrowRight, Cpu, Database, Bot, ShieldCheck, Rocket, BarChart3, Users, Globe, Zap } from "lucide-react";

const enterpriseProjects = [
  {
    title: "Multi-Agent Research Automation",
    tagline: "Enterprise RAG System",
    description:
      "8-agent research pipeline with LangGraph orchestration, ChromaDB vector memory, and deterministic verification layers. Generates IEEE-format research papers in under 90 seconds.",
    impact: "Replaces 40+ hours of manual literature review per paper",
    icon: Cpu,
    technologies: ["LangGraph", "ChromaDB", "Gemma-7B", "FastAPI"],
    client: "Fortune 500 R&D Division",
    duration: "3 months",
    metrics: [
      { label: "Accuracy", value: "98.7%" },
      { label: "Speed", value: "90s/paper" },
      { label: "Cost Savings", value: "$1.2M/year" }
    ]
  },
  {
    title: "Enterprise Document Intelligence",
    tagline: "Multi-Modal RAG Agent",
    description:
      "Vision + text RAG system processing 10M+ documents with sharded Qdrant vector database, sub-second retrieval, and 98.7% accuracy on complex queries.",
    impact: "Reduced document search time from 15 minutes to 0.8 seconds",
    icon: Database,
    technologies: ["Qdrant", "CLIP Models", "Haystack", "Kubernetes"],
    client: "Global Consulting Firm",
    duration: "5 months",
    metrics: [
      { label: "Documents", value: "10M+ indexed" },
      { label: "Retrieval", value: "<1s response" },
      { label: "Accuracy", value: "98.7%" }
    ]
  },
  {
    title: "Automated Compliance Workflow",
    tagline: "Zero-Touch Processing",
    description:
      "n8n orchestration with Groq LLM inference, extracting and validating compliance data from 150K+ annual filings with 99.8% accuracy and full audit trails.",
    impact: "Eliminated $2.1M annual compliance processing costs",
    icon: ShieldCheck,
    technologies: ["n8n", "Groq LPU", "PostgreSQL", "AWS Lambda"],
    client: "Financial Services Provider",
    duration: "2 months",
    metrics: [
      { label: "Processing", value: "150K+/year" },
      { label: "Accuracy", value: "99.8%" },
      { label: "Cost Savings", value: "$2.1M/year" }
    ]
  },
];

export function QuickWinsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      {/* Enterprise 3D Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-50/80 to-transparent" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100/30 rounded-3xl blur-2xl transform rotate-12" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-100/20 rounded-3xl blur-3xl transform -rotate-6" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-br from-blue-200/15 to-cyan-100/10 rounded-full blur-xl" />
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-12 text-center">
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500 uppercase">Enterprise AI Solutions</p>
          <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mt-2 mb-3">
            We Ship Production-Grade AI Systems
          </h2>
          <p className="text-slate-600 text-lg max-w-4xl mx-auto">
            From multi-agent research automation to large-scale document intelligence, we deliver enterprise AI solutions that drive measurable business impact. Our systems are built for scale, reliability, and real-world performance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {enterpriseProjects.map((project, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 enterprise-project-card relative overflow-hidden"
              style={{
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                zIndex: 10
              }}
            >
              {/* 3D Ribbon Banner */}
              <div 
                className="absolute top-0 right-0 w-32 h-2 bg-gradient-to-l from-blue-400 to-cyan-300 transform rotate-45 translate-x-16 -translate-y-2"
                style={{ zIndex: 1 }}
              />
              
              {/* Enterprise Badge */}
              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                  <Zap size={14} className="mr-1 text-blue-600" />
                  Enterprise Grade
                </span>
              </div>
              
              <div className="relative z-10">
                {/* Project Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center border-2 border-blue-100">
                    <project.icon size={28} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-blue-50 text-blue-700">
                        <Clock size={14} className="mr-1" />
                        {project.tagline}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700">
                        <Users size={12} className="mr-1" />
                        {project.client}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed border-l-2 border-blue-100 pl-3">
                  {project.description}
                </p>

                {/* Key Metrics */}
                <div className="border-t border-slate-100 pt-4 mb-4">
                  <p className="text-sm font-medium text-slate-900 mb-3 flex items-center gap-2">
                    <ArrowRight size={18} className="text-blue-600 flex-shrink-0" />
                    Business Impact
                  </p>
                  <p className="text-sm font-semibold text-slate-900 mb-3">{project.impact}</p>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    {project.metrics.map((metric, i) => (
                      <div key={i} className="bg-slate-50 rounded-lg px-2 py-3">
                        <p className="text-2xl font-bold text-blue-600">{metric.value}</p>
                        <p className="text-xs text-slate-500 mt-1">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-1">
                    <Rocket size={16} className="text-slate-500" />
                    Technology Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  {/* Project Timeline */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                    <Globe size={14} className="text-blue-400" />
                    <span>Implemented in {project.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-slate-900 to-blue-900 text-white p-8 sm:p-10 text-center relative overflow-hidden enterprise-cta">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full -translate-x-20 translate-y-10" />
          
          <div className="relative z-10">
            <p className="text-lg sm:text-xl font-medium mb-2">
              Enterprise AI. Delivered.
            </p>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto mb-6">
              We don't just build prototypes. We ship production-grade AI systems that scale with your business and deliver measurable ROI.
            </p>
            
            {/* Enterprise CTA Button */}
            <div className="inline-flex items-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white rounded-lg transition-all duration-300 transform hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.3)',
                  transform: 'perspective(500px) rotateX(2deg)'
                }}
              >
                Start Your AI Project
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </a>
              
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-4 text-base font-medium text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-300"
                style={{
                  transform: 'perspective(500px) rotateX(1deg)'
                }}
              >
                View All Projects
                <BarChart3 size={18} />
              </a>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-6 flex justify-center items-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-green-400" />
                Enterprise Grade Security
              </span>
              <span className="flex items-center gap-1">
                <Rocket size={14} className="text-blue-400" />
                Production Ready
              </span>
              <span className="flex items-center gap-1">
                <Users size={14} className="text-yellow-400" />
                Fortune 500 Trusted
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
