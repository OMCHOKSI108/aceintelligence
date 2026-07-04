"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQCategory = {
  category: string;
  questions: { q: string; a: string }[];
};

export function FAQAccordion({ categories }: { categories: FAQCategory[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => setOpenIndex(openIndex === idx ? null : idx);

  return (
    <div className="space-y-8">
      {categories.map((cat, catIdx) => (
        <div key={catIdx}>
          <h3 className="text-lg font-semibold text-slate-900 mb-3">{cat.category}</h3>
          <div className="space-y-2">
            {cat.questions.map((item, qIdx) => {
              const globalIdx = catIdx * 100 + qIdx;
              const isOpen = openIndex === globalIdx;
              return (
                <div
                  key={qIdx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggle(globalIdx)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-medium text-slate-900">{item.q}</span>
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-4 pt-0">
                      <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
