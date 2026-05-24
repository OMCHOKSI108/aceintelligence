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
    { label: "Services", href: "/services" },
    {
      label: "Quick Wins",
      children: [
        {
          label: "Use Cases",
          children: [
            { label: "Smart Inbox Router", href: "/quick-wins/smart-inbox" },
            { label: "Vendor Invoice Parser", href: "/quick-wins/invoice-parser" },
            { label: "Lead Router & Responder", href: "/quick-wins/lead-router" },
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
            { label: "Team", href: "/about#team" },
            { label: "Research", href: "/research" },
            { label: "Security", href: "/security" },
          ],
        },
        {
          label: "Get in touch",
          children: [
            { label: "Contact", href: "/contact" },
            { label: "Support", href: "/support" },
          ],
        },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Multi-Agent Research", href: "/projects/multi-agent-research" },
    { label: "Food Delivery Agent", href: "/projects/food-delivery-agent" },
    { label: "Multi-Modal RAG Agent", href: "/projects/multi-modal-rag" },
    { label: "ChatPDF", href: "/projects" },
    { label: "Platform", href: "/platform" },
    { label: "Developer Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
  ],
  models: [
    { label: "Workflow Automations", href: "/services" },
    { label: "RAG Architectures", href: "/services" },
    { label: "Cloud Infrastructure", href: "/services" },
  ],
};
