"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { NavItem } from "@/lib/nav-data";

interface NavDropdownProps {
  item: NavItem;
}

export function NavDropdown({ item }: NavDropdownProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 transition-colors">
        {item.label}
        <ChevronDown size={14} />
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