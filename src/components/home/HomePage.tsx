import { Hero } from "./Hero";
import { LinkCards } from "./LinkCards";
import { ProjectsSection } from "./ProjectsSection";

export function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="relative z-10">
        <Hero />
        <LinkCards />
        <ProjectsSection />
      </div>
    </main>
  );
}