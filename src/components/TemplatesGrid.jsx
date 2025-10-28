import { Eye, FileDown } from "lucide-react";

function makeBullets(text) {
  if (!text) return [];
  return text
    .split(/\n|\.|;/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 6)
    .map((s) => s.replace(/^(handled|did|worked on)/i, (m) => ({ handled: "Led", did: "Delivered", "worked on": "Implemented" }[m.toLowerCase()] || m)));
}

function buildResumeVariants(data) {
  const nameLine = data.name || "Your Name";
  const contact = [data.email, data.location].filter(Boolean).join(" • ");
  const edu = data.education || "";
  const exp = makeBullets(data.achievements || data.experience);
  const skills = (data.skills || "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 12);

  const base = { nameLine, contact, edu, exp, skills, targetRole: data.targetRole };

  return [
    { key: "Corporate", title: "Corporate / Professional", accent: "border-blue-600", heading: "text-gray-900", chip: "bg-blue-600 text-white" },
    { key: "Modern", title: "Modern / Creative", accent: "border-pink-600", heading: "text-gray-900", chip: "bg-pink-600 text-white" },
    { key: "Technical", title: "Technical / Developer", accent: "border-emerald-600", heading: "text-gray-900", chip: "bg-emerald-600 text-white" },
    { key: "Minimal", title: "Minimal / ATS-Friendly", accent: "border-gray-700", heading: "text-gray-900", chip: "bg-gray-800 text-white" },
  ].map((t) => ({ ...t, ...base }));
}

export default function TemplatesGrid({ userData }) {
  if (!userData) return null;
  const variants = buildResumeVariants(userData);

  const handlePreview = (variant) => {
    alert(`Previewing: ${variant.title}\n\nTip: You can print this section to save as PDF.`);
  };
  const handleExport = (variant) => {
    alert(`Export queued: ${variant.title}\n\nIn a full build, this will export to PDF and DOCX.`);
  };

  return (
    <section className="py-14 bg-gradient-to-b from-white to-white dark:from-black dark:to-black">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">Your resume drafts are ready</h2>
          <p className="text-black/60 dark:text-white/60">Four styles, all ATS-optimized. Pick one to preview and export.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variants.map((v) => (
            <article key={v.key} className={`rounded-xl border ${v.accent} p-5 bg-white dark:bg-zinc-950 shadow-sm`}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{v.title}</h3>
                <div className={`text-xs px-2 py-1 rounded-full ${v.chip}`}>{userData.stylePref || v.key}</div>
              </div>
              <div className="mt-4 border rounded-lg p-4 bg-white dark:bg-black">
                <div className="text-xl font-bold">{v.nameLine}</div>
                <div className="text-sm text-black/70 dark:text-white/70">{v.contact}</div>
                {v.targetRole && (
                  <div className="mt-2 text-sm font-medium">Target: {v.targetRole}</div>
                )}
                {v.skills.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm font-semibold">Skills</div>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {v.skills.map((s, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-md bg-black/5 dark:bg-white/10">{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {v.exp.length > 0 && (
                  <div className="mt-3">
                    <div className="text-sm font-semibold">Highlights</div>
                    <ul className="mt-1 list-disc pl-5 space-y-1 text-sm">
                      {v.exp.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {v.edu && (
                  <div className="mt-3">
                    <div className="text-sm font-semibold">Education</div>
                    <p className="text-sm">{v.edu}</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button onClick={() => handlePreview(v)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-black/10 dark:border-white/10">
                  <Eye className="h-4 w-4" /> Preview
                </button>
                <button onClick={() => handleExport(v)} className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-black text-white dark:bg-white dark:text-black">
                  <FileDown className="h-4 w-4" /> Export
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
