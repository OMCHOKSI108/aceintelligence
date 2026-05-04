import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { HowItWorks } from "./HowItWorks";
import { ProjectsSection } from "./ProjectsSection";
import { WhyDifferent } from "./WhyDifferent";
import { UseCases } from "./UseCases";
import { PricingSection } from "./PricingSection";
import { SecuritySection } from "./SecuritySection";
import { SocialProof } from "./SocialProof";
import { FounderSection } from "./FounderSection";
import { FinalCTA } from "./FinalCTA";

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <ProjectsSection />
        <WhyDifferent />
        <UseCases />
        <PricingSection />
        <SecuritySection />
        <SocialProof />
        <FounderSection />
        <FinalCTA />
      </div>
    </main>
  );
}