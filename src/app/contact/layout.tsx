import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Ace Intelligence Systems. Start a project, request a demo, or reach out for partnerships and support.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Ace Intelligence Systems",
    description:
      "Start a project, request a demo, or reach out for partnerships. We respond within 1-2 business days.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
