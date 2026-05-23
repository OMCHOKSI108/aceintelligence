import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { theme } from "@/lib/theme";

const platformLinks = [
  { label: "ChatPDF API", href: "/api" },
  { label: "Project templates", href: "/templates" },
];

const resourceLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Status", href: "/status" },
  { label: "Support", href: "/support" },
  { label: "Contact Us", href: "/contact" },
];

const teamMembers = [
  { name: "OMCHOKSI108", username: "OMCHOKSI108", href: "https://github.com/OMCHOKSI108" },
  { name: "firefistisdead", username: "firefistisdead", href: "https://github.com/firefistisdead" },
  { name: "anshgajera", username: "anshgajera", href: "https://github.com/anshgajera" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-slate-950 text-slate-400 mt-auto">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <div className="border-t border-slate-800/20 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <div className="lg:pr-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-semibold text-white text-lg">{theme.brand.name}</span>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Building AI products that ship.<br />
                Trusted automation for modern teams.
              </p>
              <p className="text-sm">© {currentYear} {theme.brand.name}</p>
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
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
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
              <h4 className="text-white text-sm font-semibold tracking-wide mb-4">Team</h4>
              <div className="flex items-center gap-4">
                {teamMembers.map((member) => (
                  <Link
                    key={member.username}
                    href={member.href}
                    className="flex flex-col items-center gap-1 text-xs hover:text-white transition-colors duration-200"
                  >
                    <img
                      src={`https://avatars.githubusercontent.com/${member.username}?size=80`}
                      alt={`${member.name} profile`}
                      className="w-10 h-10 rounded-full border border-slate-700"
                    />
                    <span>{member.name}</span>
                  </Link>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
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
          </div>
        </div>

        <div className="border-t border-slate-800/20 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">© {currentYear} {theme.brand.name}</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
