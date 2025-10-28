import { Rocket } from "lucide-react";

export default function Navbar({ onStart }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 dark:bg-black/60 border-b border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="text-lg">ResumeCraft AI</span>
        </div>
        <nav className="flex items-center gap-3">
          <button
            onClick={onStart}
            className="inline-flex items-center gap-2 px-4 h-10 rounded-lg bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            Get Started
          </button>
        </nav>
      </div>
    </header>
  );
}
