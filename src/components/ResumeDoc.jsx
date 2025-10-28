function capitalize(str) {
  return str ? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

function normalizeBullets(raw) {
  if (!raw) return [];
  const sentences = raw
    .split(/\n|\.|;/)
    .map((s) => s.trim())
    .filter(Boolean);

  const verbBoost = [
    [/(handled|did|worked on|helped|assisted)/i, "Delivered"],
    [/(made|created)/i, "Built"],
    [/(improved|optimized)/i, "Optimized"],
    [/(led|managed)/i, "Led"],
    [/(fixed|resolved)/i, "Resolved"],
    [/(collaborated|worked with)/i, "Collaborated"],
    [/(increased|grew)/i, "Increased"],
    [/(reduced|decreased)/i, "Reduced"],
    [/(implemented|integrated)/i, "Implemented"],
  ];

  return sentences.slice(0, 7).map((s) => {
    let out = s;
    for (const [re, rep] of verbBoost) {
      if (re.test(out)) {
        out = out.replace(re, rep);
        break;
      }
    }
    // Ensure action-oriented capitalization
    return capitalize(out.replace(/^\-\s*/, ""));
  });
}

function splitSkills(raw) {
  const list = (raw || "")
    .split(/,|\n|\|/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 24);

  const technicalKeywords = [
    "javascript","typescript","react","vue","angular","node","python","java","go","ruby","aws","gcp","azure","docker","kubernetes","sql","nosql","mongodb","postgres","redis","rest","graphql","ci/cd","git","linux","jest","cypress","tailwind","html","css"
  ];

  const technical = [];
  const soft = [];
  for (const s of list) {
    if (technicalKeywords.includes(s.toLowerCase())) technical.push(s);
    else soft.push(s);
  }
  return { technical, soft };
}

export default function ResumeDoc({ variant, data }) {
  const name = data.name || "Your Name";
  const role = data.targetRole || "Professional";
  const contact = [data.email, data.location].filter(Boolean).join(" • ");
  const summary = `"${role}" with a track record of delivering measurable outcomes. Adept at cross-functional collaboration, prioritization, and continuous improvement.`;
  const bullets = normalizeBullets(data.achievements || data.experience);
  const edu = data.education || "";
  const { technical, soft } = splitSkills(data.skills);

  const theme = getTheme(variant);

  return (
    <div className={`rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-black ${theme.font} print:bg-white`}> 
      {/* Header */}
      <div className={`px-6 pt-6 pb-4 border-b ${theme.headerBorder} ${theme.headerBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h3 className={`text-2xl font-extrabold tracking-tight ${theme.nameColor}`}>{name}</h3>
            <div className={`text-sm ${theme.roleColor}`}>{role}</div>
          </div>
          <div className={`text-xs sm:text-sm ${theme.contactColor}`}>{contact}</div>
        </div>
      </div>

      {/* Summary */}
      <Section title="Professional Summary" accent={theme.accent}>
        <p className="text-sm leading-relaxed text-black/80 dark:text-white/80">
          {summary}
        </p>
      </Section>

      {/* Skills */}
      {(technical.length || soft.length) ? (
        <Section title="Skills" accent={theme.accent}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {technical.length > 0 && (
              <div>
                <div className="font-semibold mb-1">Technical</div>
                <div className="flex flex-wrap gap-2">
                  {technical.map((s, i) => (
                    <Chip key={i} text={s} className={theme.chip} />
                  ))}
                </div>
              </div>
            )}
            {soft.length > 0 && (
              <div>
                <div className="font-semibold mb-1">Core</div>
                <div className="flex flex-wrap gap-2">
                  {soft.map((s, i) => (
                    <Chip key={i} text={s} className="bg-black/5 dark:bg-white/10" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </Section>
      ) : null}

      {/* Experience */}
      {bullets.length > 0 && (
        <Section title="Experience Highlights" accent={theme.accent}>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            {bullets.map((b, i) => (
              <li key={i}>
                {b}
                {/[0-9]%|\$[0-9]|\b\d{2,}\b/.test(b) ? null : (
                  <span className="text-black/60 dark:text-white/60"> — add impact with numbers (%, $ or count)</span>
                )}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* Education */}
      {edu && (
        <Section title="Education" accent={theme.accent}>
          <p className="text-sm whitespace-pre-line">{edu}</p>
        </Section>
      )}

      {/* Footer Hint */}
      <div className="px-6 py-4 text-[11px] text-black/50 dark:text-white/50 border-t border-black/10 dark:border-white/10">
        Tip: Keep it one page. Use consistent verbs, quantify results, and mirror keywords from the job post.
      </div>
    </div>
  );
}

function Section({ title, children, accent }) {
  return (
    <section className="px-6 py-5">
      <h4 className={`text-sm font-bold tracking-wide uppercase ${accent}`}>{title}</h4>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function Chip({ text, className = "" }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-md ${className}`}>{text}</span>
  );
}

function getTheme(variant) {
  switch (variant) {
    case "Corporate":
      return {
        font: "font-inter",
        nameColor: "text-gray-900",
        roleColor: "text-gray-600",
        contactColor: "text-gray-700",
        accent: "text-blue-700",
        chip: "bg-blue-600/10 text-blue-800 dark:text-blue-300",
        headerBg: "bg-white dark:bg-zinc-950",
        headerBorder: "border-black/10 dark:border-white/10",
      };
    case "Modern":
      return {
        font: "font-manrope",
        nameColor: "text-gray-900",
        roleColor: "text-gray-600",
        contactColor: "text-gray-700",
        accent: "text-pink-700",
        chip: "bg-pink-600/10 text-pink-800 dark:text-pink-300",
        headerBg: "bg-white dark:bg-zinc-950",
        headerBorder: "border-black/10 dark:border-white/10",
      };
    case "Technical":
      return {
        font: "font-ibm-plex-sans",
        nameColor: "text-gray-900",
        roleColor: "text-gray-600",
        contactColor: "text-gray-700",
        accent: "text-emerald-700",
        chip: "bg-emerald-600/10 text-emerald-800 dark:text-emerald-300",
        headerBg: "bg-white dark:bg-zinc-950",
        headerBorder: "border-black/10 dark:border-white/10",
      };
    case "Executive":
      return {
        font: "font-geist",
        nameColor: "text-gray-900",
        roleColor: "text-gray-600",
        contactColor: "text-gray-700",
        accent: "text-amber-700",
        chip: "bg-amber-600/10 text-amber-800 dark:text-amber-300",
        headerBg: "bg-white dark:bg-zinc-950",
        headerBorder: "border-black/10 dark:border-white/10",
      };
    default:
      return {
        font: "font-inter",
        nameColor: "text-gray-900",
        roleColor: "text-gray-600",
        contactColor: "text-gray-700",
        accent: "text-gray-800",
        chip: "bg-gray-800/10 text-gray-800 dark:text-gray-300",
        headerBg: "bg-white dark:bg-zinc-950",
        headerBorder: "border-black/10 dark:border-white/10",
      };
  }
}
