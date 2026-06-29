import { PremiumHero } from "@/components/services/PremiumHero";
import { PremiumTimeline } from "@/components/services/PremiumTimeline";
import { PremiumWorkflowStrip } from "@/components/services/PremiumWorkflowStrip";
import { PremiumServices } from "@/components/services/PremiumServices";
import { PremiumTrust } from "@/components/services/PremiumTrust";
import { PremiumCTA } from "@/components/services/PremiumCTA";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <PremiumHero />

      {/* Delivery Timeline */}
      <PremiumTimeline />

      {/* Workflow Strip */}
      <PremiumWorkflowStrip />

      {/* Service Blocks */}
      <PremiumServices />

      {/* Trust Section */}
      <PremiumTrust />

      {/* Final CTA */}
      <PremiumCTA />
    </div>
  );
}