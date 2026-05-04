export interface NavItem {
  label: string;
  href?: string;
  children?: NavGroup[];
}

export interface NavGroup {
  label: string;
  children?: NavItem[];
  href?: string;
}

export interface NavSection {
  main: NavItem[];
  products: NavItem[];
  models: NavItem[];
}

export const navData: NavSection = {
  main: [
    { label: "Research", href: "/research" },
    { label: "Economic Futures", href: "/economic-futures" },
    {
      label: "Commitments",
      children: [
        {
          label: "Initiatives",
          children: [
            { label: "Company Constitution", href: "/constitution" },
            { label: "Transparency", href: "/transparency" },
            { label: "Responsible Scaling", href: "/responsible-scaling" },
          ],
        },
        {
          label: "Trust Center",
          children: [
            { label: "Security", href: "/security" },
          ],
        },
      ],
    },
    {
      label: "Learn",
      children: [
        { label: "Academy", href: "/academy" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Use Cases", href: "/use-cases" },
        { label: "Engineering", href: "/engineering" },
      ],
    },
  ],
  products: [
    { label: "ChatPDF", href: "/claude" },
    { label: "Voice Chat", href: "/code" },
    { label: "Workspaces", href: "/cowork" },
    { label: "Platform", href: "/platform" },
    { label: "Pricing", href: "/pricing" },
  ],
  models: [
    { label: "Opus", href: "/models/opus" },
    { label: "Sonnet", href: "/models/sonnet" },
    { label: "Haiku", href: "/models/haiku" },
  ],
};