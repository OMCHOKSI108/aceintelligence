import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 text-center">
        <h2 className="headline-primary text-3xl sm:text-4xl mb-4">
          Ready to eliminate hallucinations from your AI?
        </h2>
        <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
          Join our beta. Book a demo. See how Ace Intelligence navigates your data
          — instead of guessing.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-slate-900 bg-white rounded-lg hover:bg-slate-100 transition-colors"
          >
            Book a Demo
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Join Beta
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
          >
            Contact Sales
          </Link>
        </div>
      </div>
    </section>
  );
}
