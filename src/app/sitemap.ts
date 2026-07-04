import type { MetadataRoute } from "next";

const siteUrl = "https://aceintelligence.systems";

const staticRoutes = [
  "",
  "/about",
  "/services",
  "/portfolio",
  "/case-studies",
  "/careers",
  "/contact",
  "/research",
  "/security",
  "/use-cases",
  "/docs",
  "/api",
  "/pricing",
  "/whitepapers",
  "/privacy",
  "/terms",
  "/support",
  "/status",
  "/templates",
];

const projectRoutes = [
  "/projects/multi-modal-rag",
  "/projects/multi-agent-research",
  "/projects/chatpdf",
  "/projects/pralay-ai",
  "/projects/trade-like-whale",
  "/projects/food-delivery-agent",
];

const quickWinRoutes = [
  "/quick-wins/smart-inbox",
  "/quick-wins/invoice-parser",
  "/quick-wins/lead-router",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const allRoutes = [...staticRoutes, ...projectRoutes, ...quickWinRoutes];

  return allRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/projects") || route.startsWith("/quick-wins") ? 0.7 : 0.8,
  }));
}
