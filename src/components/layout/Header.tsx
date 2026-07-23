"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navData } from "@/lib/nav-data";
import { colors, theme } from "@/lib/theme";
import { NavDropdown } from "./NavDropdown";
import { LanguageSwitcher } from "./LanguageSwitcher";
import type { NavItem } from "@/lib/nav-data";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [checkingCareersAuth, setCheckingCareersAuth] = useState(false);
  const [hasCareersSession, setHasCareersSession] = useState(false);

  const isCareersApp = pathname?.startsWith("/careers");
  const isProtectedCareersRoute =
    pathname?.startsWith("/careers/admin") ||
    pathname?.startsWith("/careers/profile") ||
    pathname?.endsWith("/apply");

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

  useEffect(() => {
    if (!isCareersApp || !isProtectedCareersRoute) {
      setCheckingCareersAuth(false);
      setHasCareersSession(false);
      return;
    }

    let cancelled = false;
    setCheckingCareersAuth(true);
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => {
        if (!cancelled) setHasCareersSession(res.ok);
      })
      .catch(() => {
        if (!cancelled) setHasCareersSession(false);
      })
      .finally(() => {
        if (!cancelled) setCheckingCareersAuth(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isCareersApp, isProtectedCareersRoute, pathname]);

  if (isProtectedCareersRoute && (checkingCareersAuth || hasCareersSession)) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Ace Intelligence Systems logo" className="w-8 h-8" />
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

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            <Link
              href="/contact"
              className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
              style={{ backgroundColor: colors.accent.primary }}
            >
              Start a Project
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-3 -mr-2 text-slate-600 active:text-slate-900 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Toggle menu"
            type="button"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-[60]"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="lg:hidden fixed right-0 top-16 w-full max-w-sm bg-white z-[70] h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain shadow-xl">
            <div className="p-4 space-y-4 min-h-full">
              {navData.main.map((item) =>
                item.children ? (
                  <MobileNavGroup key={item.label} item={item} onItemClick={() => setMobileOpen(false)} />
                ) : (
                  <Link
                    key={item.label}
                    href={item.href || "#"}
                    className="block text-sm text-slate-600 min-h-[44px] flex items-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-slate-100">
                <div className="mb-3">
                  <LanguageSwitcher />
                </div>
                <Link
                  href="/contact"
                  className="block w-full px-4 py-3 text-sm font-medium text-white text-center rounded-lg"
                  style={{ backgroundColor: colors.accent.primary }}
                  onClick={() => setMobileOpen(false)}
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </div>
        </>
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
