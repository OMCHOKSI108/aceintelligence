import type { Metadata } from "next";
import { Inter, Geist_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/layout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "aceintellegence",
  description: "Building AI products that ship. Workflow automation and trusted operations for modern teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} ${playfairDisplay.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen flex flex-col antialiased bg-[var(--color-background)]"
        suppressHydrationWarning
      >
        {process.env.NODE_ENV === "development" && (
          <Script
            id="dev-hydration-sanitizer"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(() => {
  const shouldRemove = (name) =>
    name === 'bis_skin_checked' ||
    name === 'bis_register' ||
    name.startsWith('bis_') ||
    name.startsWith('__processed_') ||
    name.startsWith('data-bis-') ||
    name === 'data-dynamic-id';

  try {
    if (!window.__ace_attr_patch__) {
      window.__ace_attr_patch__ = true;

      const origSetAttribute = Element.prototype.setAttribute;
      const origSetAttributeNS = Element.prototype.setAttributeNS;
      const origToggleAttribute = Element.prototype.toggleAttribute;

      Element.prototype.setAttribute = function (name, value) {
        try {
          if (typeof name === 'string' && shouldRemove(name)) return;
        } catch {
          // ignore
        }
        return origSetAttribute.call(this, name, value);
      };

      Element.prototype.setAttributeNS = function (ns, name, value) {
        try {
          if (typeof name === 'string' && shouldRemove(name)) return;
        } catch {
          // ignore
        }
        return origSetAttributeNS.call(this, ns, name, value);
      };

      if (typeof origToggleAttribute === 'function') {
        Element.prototype.toggleAttribute = function (name, force) {
          try {
            if (typeof name === 'string' && shouldRemove(name)) return false;
          } catch {
            // ignore
          }
          return origToggleAttribute.call(this, name, force);
        };
      }
    }
  } catch {
    // ignore
  }

  const stripElement = (el) => {
    if (!el || el.nodeType !== 1) return;
    for (const attr of el.getAttributeNames()) {
      if (shouldRemove(attr)) el.removeAttribute(attr);
    }
  };

  const stripTree = () => {
    try {
      stripElement(document.documentElement);
      stripElement(document.head);
      stripElement(document.body);
      for (const el of document.querySelectorAll('*')) stripElement(el);
    } catch {
      // ignore
    }
  };

  // Initial cleanup as early as possible.
  stripTree();

  // Some extensions keep mutating attributes after initial load; observe briefly.
  try {
    const obs = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.target) stripElement(m.target);
        if (m.type === 'childList') {
          for (const n of m.addedNodes) {
            stripElement(n);
            if (n && n.nodeType === 1) {
              try {
                for (const el of n.querySelectorAll('*')) stripElement(el);
              } catch {
                // ignore
              }
            }
          }
        }
      }
    });

    obs.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    window.addEventListener('DOMContentLoaded', () => {
      stripTree();
      setTimeout(() => obs.disconnect(), 2000);
    });
  } catch {
    // ignore
  }
})();`,
            }}
          />
        )}
        <div className="site-pillar site-pillar-left" aria-hidden="true" />
        <div className="site-pillar site-pillar-right" aria-hidden="true" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}