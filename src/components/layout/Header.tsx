"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navData } from "@/lib/nav-data";
import { colors, theme } from "@/lib/theme";
import { NavDropdown } from "./NavDropdown";
import type { NavItem } from "@/lib/nav-data";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/BEAST.svg" alt="BEAST Logo" className="w-8 h-8" />
            <span className="font-semibold text-slate-900 text-lg">{theme.brand.name}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navData.main.map((item) =>
              item.children ? (
                <NavDropdown key={item.label} item={item} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: colors.accent.primary }}
            >
              Talk to us
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-600"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
          <div className="p-4 space-y-4">
            {navData.main.map((item) =>
              item.children ? (
                <MobileNavGroup key={item.label} item={item} onItemClick={() => setMobileOpen(false)} />
              ) : (
                <Link
                  key={item.label}
                  href={item.href || "#"}
                  className="block text-sm text-slate-600"
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/contact"
              className="block px-4 py-2 text-sm font-medium text-white text-center rounded-lg"
              style={{ backgroundColor: colors.accent.primary }}
              onClick={() => setMobileOpen(false)}
            >
              Talk to us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

interface MobileNavGroupProps {
  item: NavItem;
  onItemClick: () => void;
}

function MobileNavGroup({ item, onItemClick }: MobileNavGroupProps) {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium text-slate-900">{item.label}</span>
      <div className="pl-4 space-y-2">
        {item.children?.map((group) =>
          group.children ? (
            <div key={group.label} className="space-y-2">
              <span className="text-sm font-medium text-slate-500">{group.label}</span>
              <div className="pl-4 space-y-2">
                {group.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href || "#"}
                    className="block text-sm text-slate-600"
                    onClick={onItemClick}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}