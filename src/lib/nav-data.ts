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
      label: "Projects",
      children: [
        {
          label: "Implemented Projects",
          children: [
            { label: "Multi-Agent Research Automation", href: "/projects/multi-agent-research" },
            { label: "Enterprise Document Intelligence", href: "/projects/multi-modal-rag" },
            { label: "Automated Compliance Workflow", href: "/projects/compliance-automation" },
          ],
        },
        {
          label: "Quick Wins",
          children: [
            
          ],
        },
      ],
    },
    {
      label: "Company",
      children: [
        {
          label: "About",
          children: [
            { label: "Overview", href: "/about" },
          ],
        },
        {
          label: "Get in touch",
          children: [
            { label: "Contact", href: "/contact" },
          ],
        },
      ],
    },
    { label: "Contact", href: "/contact" },
  ],
  products: [
    { label: "Multi Agent Research", href: "/projects/multi-agent-research" },
    { label: "Multi Modal RAG Agent", href: "/projects/multi-modal-rag" },
    { label: "ChatPDF", href: "/projects" },
  ],
  models: [
    { label: "Workflow Automations", href: "/services" },
    { label: "RAG Architectures", href: "/services" },
    { label: "Cloud Infrastructure", href: "/services" },
  ],
};
