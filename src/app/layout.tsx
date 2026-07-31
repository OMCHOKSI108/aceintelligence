import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import BotpressChatbot from "@/components/BotpressChatbot";

const siteUrl = "https://aceintelligence.systems";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "Ace Intelligence Systems",
  url: siteUrl,
  description:
    "Custom AI automation, enterprise RAG architectures, and scalable cloud infrastructure for startups and enterprises.",
  foundingDate: "2025",
  founders: [
    { "@type": "Person", name: "Ansh Gajera", jobTitle: "CEO" },
    { "@type": "Person", name: "Om Choksi", jobTitle: "CTO & Chief Architect" },
    { "@type": "Person", name: "Yash Khare", jobTitle: "Founder" },
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Workflow Automation",
    "Enterprise RAG",
    "Multi Agent Systems",
    "Cloud Infrastructure",
  ],
  offers: [
    {
      "@type": "Service",
      name: "Intelligent Workflow Automation",
      description:
        "Smart email triage, document parsing, and zero touch lead routing using n8n, Groq, and custom APIs.",
    },
    {
      "@type": "Service",
      name: "Custom Generative AI & Conversational Agents",
      description:
        "Enterprise RAG architectures, multi agent workflows via LangGraph, and tier 1 support bots.",
    },
    {
      "@type": "Service",
      name: "Enterprise Cloud Infrastructure & Analytics",
      description: "Custom admin dashboards, predictive AI models, and scalable backend APIs.",
    },
  ],
  funder: { "@type": "Person", name: "Ansh Gajera" },
  sameAs: [
    "https://github.com/OMCHOKSI108",
    "https://github.com/anshgajera",
    "https://github.com/firefistisdead",
  ],
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og-image.png`,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: "Ace Intelligence Systems",
  description:
    "Custom AI automation, enterprise RAG architectures, and scalable cloud infrastructure for startups and enterprises.",
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-US",
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Ace Intelligence Systems | AI & Automation Agency",
    template: "%s | Ace Intelligence Systems",
  },
  description:
    "aceintelligence (Ace Intelligence Systems) delivers custom AI automation, enterprise RAG architectures, and scalable cloud infrastructure for modern startups.",
  keywords: [
    "AI automation agency",
    "enterprise RAG",
    "multi-agent systems",
    "workflow automation",
    "custom AI development",
    "LLM fine-tuning",
    "enterprise AI",
    "Ace Intelligence",
    "chatbot development",
    "AI consulting",
  ],
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Ace Intelligence Systems | AI & Automation Agency",
    description:
      "Custom AI automation, enterprise RAG architectures, and scalable cloud infrastructure for startups and enterprises.",
    url: siteUrl,
    siteName: "Ace Intelligence Systems",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ace Intelligence Systems - AI & Automation Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ace Intelligence Systems | AI & Automation Agency",
    description:
      "Custom AI automation, enterprise RAG architectures, and scalable cloud infrastructure for modern startups.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "B5PHKm7RdJ9GC8HLsHRzAEpntaJV1e73Au6QqIx1Zqg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NVQKSPGF');`,
        }}
      />
      {/* End Google Tag Manager */}
      {/* Google Analytics 4 */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-LGCLQMBXDC"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LGCLQMBXDC');
          `,
        }}
      />
      {/* End Google Analytics 4 */}
      <body
        className="min-h-screen flex flex-col antialiased bg-[var(--color-background)]"
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NVQKSPGF"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          strategy="beforeInteractive"
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          strategy="beforeInteractive"
        />
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
        <BotpressChatbot />
      </body>
    </html>
  );
}