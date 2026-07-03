"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "zh-CN", name: "Chinese (Simpl.)", native: "简体中文" },
];

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: { translate: { TranslateElement: any; TranslateElementEnum: any } };
  }
}

function getGoogleLangCode(code: string) {
  return code === "zh-CN" ? "zh-CN" : code;
}

function findGoogleSelect(): HTMLSelectElement | null {
  return document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
}

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(languages[0]);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Load Google Translate widget once ── */
  useEffect(() => {
    if (document.getElementById("google-translate-script")) return;

    // Hidden host element Google needs
    const host = document.createElement("div");
    host.id = "google_translate_element";
    host.style.display = "none";
    document.body.appendChild(host);

    // Global callback
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,es,fr,zh-CN",
          autoDisplay: false,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  /* ── Poll until the hidden <select> appears ── */
  useEffect(() => {
    pollRef.current = setInterval(() => {
      if (findGoogleSelect()) {
        setReady(true);
        if (pollRef.current) clearInterval(pollRef.current);
      }
    }, 300);

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  /* ── Restore saved language on mount ── */
  useEffect(() => {
    if (!ready) return;
    const saved = localStorage.getItem("lang");
    if (!saved || saved === "en") return;
    const match = languages.find((l) => l.code === saved);
    if (match) {
      setCurrent(match);
      triggerTranslate(match.code);
    }
  }, [ready]);

  /* ── Click-outside ── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function triggerTranslate(code: string) {
    const select = findGoogleSelect();
    if (!select) return;
    select.value = getGoogleLangCode(code);
    select.dispatchEvent(new Event("change"));
  }

  function switchLanguage(lang: (typeof languages)[0]) {
    setCurrent(lang);
    setOpen(false);
    localStorage.setItem("lang", lang.code);
    triggerTranslate(lang.code);

    // If not ready yet, queue for when widget loads
    if (!ready) {
      const waitForReady = setInterval(() => {
        if (findGoogleSelect()) {
          setReady(true);
          clearInterval(waitForReady);
          triggerTranslate(lang.code);
        }
      }, 300);
    }
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 transition-colors px-2 py-1 rounded-lg hover:bg-slate-100"
      >
        <Globe size={14} />
        <span>{current.code === "zh-CN" ? "ZH" : current.code.toUpperCase()}</span>
        <ChevronDown size={12} />
      </button>

      {open && (
        <div className="absolute top-full right-0 pt-2">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2 min-w-[180px]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang)}
                className="w-full flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <span>
                  <span className="font-medium text-slate-900">
                    {lang.code === "zh-CN" ? "ZH" : lang.code.toUpperCase()}
                  </span>{" "}
                  <span className="text-slate-500">{lang.native}</span>
                </span>
                {current.code === lang.code && (
                  <Check size={14} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
