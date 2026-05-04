import { ArrowRight } from "lucide-react";

interface LinkCardProps {
  title: string;
  category: string;
  href: string;
}

const links: LinkCardProps[] = [
  { title: "Developer docs", category: "Guide", href: "/docs" },
  { title: "ChatPDF API", category: "Platform", href: "/api" },
  { title: "Project templates", category: "Starter", href: "/templates" },
];

export function LinkCards() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="headline-primary text-3xl sm:text-4xl text-slate-900 mb-8">
        Simple tools for fast developer shipping.
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.title}
            href={link.href}
            className="group flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div>
              <span className="text-xs text-slate-500">{link.category}</span>
              <h3 className="text-sm font-medium text-slate-900 mt-1">{link.title}</h3>
            </div>
            <ArrowRight size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}