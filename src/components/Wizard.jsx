import { useState } from "react";
import { Wand2, ArrowRight, ArrowLeft } from "lucide-react";

const steps = [
  { id: 1, title: "Basics" },
  { id: 2, title: "Experience" },
  { id: 3, title: "Skills & Goal" },
];

export default function Wizard({ onComplete }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    location: "",
    education: "",
    experience: "",
    achievements: "",
    skills: "",
    targetRole: "",
    stylePref: "Corporate",
  });

  const canNext = () => {
    if (step === 1) return form.name && form.email;
    if (step === 2) return form.experience;
    if (step === 3) return form.skills && form.targetRole;
    return true;
  };

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const finish = () => {
    if (!canNext()) return;
    onComplete?.(form);
  };

  return (
    <section className="py-14">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div className={`h-8 px-3 rounded-full border ${
                  step === s.id
                    ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white"
                    : "bg-white/60 dark:bg-white/10 border-black/10 dark:border-white/10"
                } flex items-center`}> {s.title} </div>
                {i < steps.length - 1 && <div className="w-6 h-px bg-black/20 dark:bg-white/20" />}
              </div>
            ))}
          </div>
          <h2 className="mt-6 text-2xl sm:text-3xl font-bold">Tell me a bit about you</h2>
          <p className="text-black/60 dark:text-white/60">I’ll turn this into strong, action-driven bullets and multiple templates.</p>
        </div>

        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Input label="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
            <TextArea label="Education (degrees, schools, dates)" rows={3} value={form.education} onChange={(v) => setForm({ ...form, education: v })} />
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 gap-4">
            <TextArea label="Work experience (roles, companies, durations)" rows={5} value={form.experience} onChange={(v) => setForm({ ...form, experience: v })} />
            <TextArea label="Key achievements (impact, metrics)" rows={4} value={form.achievements} onChange={(v) => setForm({ ...form, achievements: v })} />
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextArea label="Skills (comma-separated)" rows={3} value={form.skills} onChange={(v) => setForm({ ...form, skills: v })} />
            <Input label="Target role / job title" value={form.targetRole} onChange={(v) => setForm({ ...form, targetRole: v })} />
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-2">Preferred style</label>
              <select
                value={form.stylePref}
                onChange={(e) => setForm({ ...form, stylePref: e.target.value })}
                className="w-full h-11 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3"
              >
                <option>Corporate</option>
                <option>Modern</option>
                <option>Technical</option>
                <option>Minimal</option>
                <option>Executive</option>
              </select>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 1}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-lg border border-black/10 dark:border-white/10 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <div className="flex items-center gap-3">
            {step < 3 ? (
              <button
                onClick={next}
                disabled={!canNext()}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-black text-white dark:bg-white dark:text-black disabled:opacity-50"
              >
                Next <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={finish}
                disabled={!canNext()}
                className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-gradient-to-r from-orange-500 to-amber-600 text-white disabled:opacity-50"
              >
                <Wand2 className="h-4 w-4" /> Generate Resumes
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3"
      />
    </label>
  );
}

function TextArea({ label, value, onChange, rows = 3 }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-2">{label}</span>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black px-3 py-2"
      />
    </label>
  );
}
