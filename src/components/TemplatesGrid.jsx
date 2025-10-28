import { Eye, FileDown } from "lucide-react";
import ResumeDoc from "./ResumeDoc";

function buildVariants(data) {
  return [
    { key: "Corporate", title: "Corporate / Professional" },
    { key: "Modern", title: "Modern / Creative" },
    { key: "Technical", title: "Technical / Developer" },
    { key: "Executive", title: "Executive / Leadership" },
  ].map((t) => ({ ...t, data }));
}

export default function TemplatesGrid({ userData }) {
  if (!userData) return null;
  const variants = buildVariants(userData);

  const handlePreview = (variant) => {
    alert(`Previewing: ${variant.title}\n\nTip: Use browser Print to save as PDF.`);
  };
  const handleExport = (variant) => {
    alert(`Export queued: ${variant.title}\n\nIn a full build, this will export to PDF and DOCX.`);
  };

  return (
    <section className="py-14">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold">High-scoring resume previews</h2>
          <p className="text-black/60 dark:text-white/60">Optimized headings, action verbs, keyword clustering, and clean hierarchy for ATS.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {variants.map((v) => (
            <article key={v.key} className="rounded-xl border border-black/10 dark:border-white/10 p-5 bg-white dark:bg-zinc-950 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{v.title}</h3>
                <div className="text-xs px-2 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black">{userData.stylePref || v.key}</div>
              </div>

              {/* Document */}
              <div className="border rounded-lg overflow-hidden">
                <ResumeDoc variant={v.key} data={userData} />
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
