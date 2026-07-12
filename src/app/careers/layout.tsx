import type { Metadata } from "next";
import CareersProvider from "./careers-provider";
import "./careers.css";

export const metadata: Metadata = {
  title: "Careers at Ace Intelligence",
  description:
    "Join Ace Intelligence Systems. Browse open positions in engineering, AI, and automation.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers at Ace Intelligence | Browse Open Positions",
    description:
      "Build the future of enterprise AI at Ace Intelligence Systems.",
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <CareersProvider>{children}</CareersProvider>;
}
