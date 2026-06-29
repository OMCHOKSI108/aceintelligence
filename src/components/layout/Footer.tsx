import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { theme } from "@/lib/theme";

const platformLinks = [
  { label: "Multi Agent Research", href: "/projects/multi-agent-research" },
  { label: "Multi Modal RAG Agent", href: "/projects/multi-modal-rag" },
  { label: "ChatPDF", href: "/projects" },
];

const researchLinks = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/quick-wins/smart-inbox" },
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
        <div className="border-t border-slate-800/20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-1 lg:pr-4">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-white text-lg">{theme.brand.name}</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                AI, automation, and intelligent software services agency.<br />
                Bespoke architectures for modern enterprises.
              </p>
              <div className="flex gap-4">
                <Link
                  href="https://x.com/aceintellegence"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label="X"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.842 7.26H6.925l5.323 9.565z" />
                  </svg>
                </Link>
                <Link
                  href="https://discord.gg/aceintellegence"
                  className="text-slate-400 hover:text-white transition-colors duration-200"
                  aria-label="Discord"
                >
                  <MessageSquare size={18} />
                </Link>
              </div>
            </div>

            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Platform</h4>
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

            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Research &amp; Proof</h4>
              <ul className="space-y-3">
                {researchLinks.map((link) => (
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

            <div>
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Legal &amp; Security</h4>
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
                      <span className="text-sm font-medium">{founder.name}</span>
                      <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">
                        {founder.role} portfolio link ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/20 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {currentYear} {theme.brand.name}</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Engagement
            </Link>
            <Link href="/security" className="hover:text-white transition-colors duration-200">
              Security &amp; AI Safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
