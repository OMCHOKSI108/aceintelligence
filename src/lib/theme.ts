export interface ThemeConfig {
  brand: {
    name: string;
    primaryColor: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export const theme: ThemeConfig = {
  brand: {
    name: "Ace Intelligence Systems",
    primaryColor: "#3b82f6",
  },
  fonts: {
    heading: "var(--font-playfair-display)",
    body: "var(--font-inter)",
  },
};

export const colors = {
  background: "#ffffff",
  surface: "#f8fafc",
  border: "#e2e8f0",
  text: {
    primary: "#0f172a",
    secondary: "#475569",
    muted: "#94a3b8",
  },
  accent: {
    primary: "#3b82f6",
    hover: "#2563eb",
  },
  footer: {
    bg: "#020617",
    text: "#94a3b8",
  },
} as const;
