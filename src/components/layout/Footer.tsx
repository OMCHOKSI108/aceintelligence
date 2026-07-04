import Link from "next/link";
import { MessageSquare, Mail } from "lucide-react";
import { theme } from "@/lib/theme";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const platformLinks = [
  { label: "Multi-Agent Research", href: "/projects/multi-agent-research" },
  { label: "Multi-Modal RAG Agent", href: "/projects/multi-modal-rag" },
  { label: "ChatPDF", href: "/portfolio" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Engagement", href: "/terms" },
  { label: "Security & AI Safety", href: "/security" },
];

const founders = [
  { name: "Om Choksi", role: "CTO", href: "https://www.omchoksi.code" },
  { name: "Ansh Gajera", role: "CEO", href: "https://anshgajera.dev" },
  { name: "Yash Khare", role: "Founder", href: "https://yashkhare-portfolio.netlify.app" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-slate-950 text-slate-400 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="border-t border-slate-800/20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
            {/* Column 1: Brand & Identity */}
            <div className="lg:col-span-1 lg:pr-4">
              <span className="font-semibold text-white text-lg">{theme.brand.name}</span>
              <p className="text-sm leading-relaxed mt-3 mb-5">
                Bespoke AI architectures for modern enterprises.
              </p>
              <div className="flex gap-3">
                <Link
                  href="https://x.com/aceintellegence"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200"
                  aria-label="X"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.842 7.26H6.925l5.323 9.565z" />
                  </svg>
                </Link>
                <Link
                  href="https://linkedin.com/company/aceintelligence"
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              </div>
              <div className="mt-5 space-y-1.5">
                <a href="mailto:omchoksi.pro@gmail.com" className="text-xs text-slate-500 hover:text-blue-400 transition-colors block">
                  omchoksi.pro@gmail.com
                </a>
                <a href="mailto:401anshgajera@gmail.com" className="text-xs text-slate-500 hover:text-blue-400 transition-colors block">
                  401anshgajera@gmail.com
                </a>
                <a href="mailto:yashco.ltd@gmail.com" className="text-xs text-slate-500 hover:text-blue-400 transition-colors block">
                  yashco.ltd@gmail.com
                </a>
              </div>
            </div>

            {/* Column 2: Company */}
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Platform & Resources */}
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Platform &amp; Resources</h4>
              <ul className="space-y-3">
                {platformLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5: Leadership */}
            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Leadership</h4>
              <ul className="space-y-3">
                {founders.map((founder) => (
                  <li key={founder.name}>
                    <a
                      href={founder.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col hover:text-white transition-colors duration-200"
                    >
                      <span className="text-sm font-medium group-hover:text-blue-400 transition-colors duration-200">
                        {founder.name}
                      </span>
                      <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors duration-200">
                        {founder.role}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/20 py-6 text-center">
          <p className="text-sm">&copy; {currentYear} {theme.brand.name}</p>
        </div>
      </div>
    </footer>
  );
}
