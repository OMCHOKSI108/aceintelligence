"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/nav-data";

interface NavDropdownProps {
  item: NavItem;
}

export function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const [canHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={canHover ? () => setOpen(true) : undefined}
      onMouseLeave={canHover ? () => setOpen(false) : undefined}
    >
      <button
        className="flex items-center gap-1 text-sm text-slate-600 transition-colors duration-150 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/40 rounded-md min-h-[44px]"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && item.children && (
        <div className="absolute top-full left-0 pt-2">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 min-w-[200px]">
            {item.children.map((group, i) => (
              <div key={i}>
                {group.children ? (
                  <div>
                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {group.label}
                    </span>
                    <div className="mt-2 mb-3 space-y-2">
                      {group.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href || "#"}
                          className="block text-sm text-slate-600 hover:text-slate-900"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : group.href ? (
                  <Link
                    href={group.href}
                    className="block text-sm text-slate-600 hover:text-slate-900 mb-2"
                  >
                    {group.label}
                  </Link>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}