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
    {
      label: "Services",
      children: [
        {
          label: "Solutions",
          children: [
            { label: "Workflow Automation", href: "/services/document-intelligence" },
            { label: "Human-in-the-loop", href: "/services/rag" },
            { label: "Operator Experience", href: "/services/voice" },
            { label: "Developer Platform", href: "/platform" },
          ],
        },
        {
          label: "Accelerators",
          children: [
            { label: "ChatPDF", href: "/projects" },
            { label: "Templates", href: "/templates" },
            { label: "API", href: "/api" },
          ],
        },
      ],
    },
    {
      label: "Industries",
      children: [
        {
          label: "Use Cases",
          children: [
            { label: "Startups", href: "/industries/startups" },
            { label: "Finance", href: "/industries/finance" },
            { label: "Healthcare", href: "/industries/healthcare" },
            { label: "Legal", href: "/industries/legal" },
          ],
        },
      ],
    },
    { label: "Insights", href: "/insights" },
    {
      label: "Company",
      children: [
        {
          label: "About",
          children: [
            { label: "Overview", href: "/about" },
            { label: "Research", href: "/research" },
            { label: "Security", href: "/security" },
            { label: "Transparency", href: "/transparency" },
          ],
        },
        {
          label: "Get in touch",
          children: [
            { label: "Contact", href: "/contact" },
            { label: "Support", href: "/support" },
            { label: "Status", href: "/status" },
          ],
        },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "ChatPDF", href: "/projects" },
    { label: "Platform", href: "/platform" },
    { label: "Developer Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ],
  models: [
    { label: "Automation", href: "/services/rag" },
    { label: "Approvals", href: "/services/document-intelligence" },
    { label: "Operator UI", href: "/services/voice" },
  ],
};
