import { theme } from "@/lib/theme";

export function LoadingScreen() {
  return (
    <div className="min-h-[100svh] flex items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white/80 backdrop-blur-xl shadow-[0_28px_90px_rgba(15,23,42,0.14)] px-8 py-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_52%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.08),_transparent_38%)]" />
        <div className="absolute -top-16 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
        <div className="relative">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
            <img src="/logo.png" alt="Ace Intelligence Systems logo" className="h-10 w-10" />
          </div>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.3em] text-slate-500">Loading</p>
          <h1 className="headline-primary mt-3 text-3xl sm:text-4xl text-slate-900">{theme.brand.name}</h1>
          <p className="mt-3 text-sm sm:text-base leading-6 text-slate-600">
            Preparing a calmer, clearer view of your automation workspace.
          </p>
          <div className="mt-8 grid gap-4">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 rounded-full bg-[linear-gradient(90deg,_rgba(59,130,246,0.15),_rgba(59,130,246,0.75),_rgba(59,130,246,0.15))] animate-[loading-bar_1.6s_ease-in-out_infinite]" />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <span>Aligning workflows</span>
              <span className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse [animation-delay:200ms]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}