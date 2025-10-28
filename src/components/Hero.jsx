import Spline from "@splinetool/react-spline";
import { Play } from "lucide-react";

export default function Hero({ onStart }) {
  return (
    <section className="relative min-h-[80vh] w-full flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Gradient overlays should not block interaction with Spline */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white to-transparent dark:from-black" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 text-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Black & White Mini Bot — Playful, Friendly, Interactive
          </div>
          <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Build a standout resume with AI guidance
          </h1>
          <p className="mt-4 text-lg text-black/70 dark:text-white/70">
            I’ll interview you step-by-step and craft multiple ATS-optimized resume versions — corporate, modern, technical, and minimal.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onStart}
              className="inline-flex items-center gap-2 px-5 h-12 rounded-xl bg-black text-white dark:bg-white dark:text-black shadow hover:opacity-90 transition"
            >
              <Play className="h-5 w-5" />
              Start Building
            </button>
            <span className="text-sm text-black/60 dark:text-white/60">
              No signup required. Export to PDF or DOCX.
            </span>
          </div>
        </div>
        <div className="w-full lg:w-1/2" />
      </div>
    </section>
  );
}
