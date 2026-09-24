"use client";

import { work } from "@/data/profile";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/ui/primitives";

const accents: Record<string, { text: string; glow: string; bar: string }> = {
  violet: { text: "text-violet", glow: "bg-violet/25", bar: "from-violet" },
  cyan: { text: "text-cyan", glow: "bg-cyan/20", bar: "from-cyan" },
  pink: { text: "text-pink", glow: "bg-pink/20", bar: "from-pink" },
  lime: { text: "text-lime", glow: "bg-lime/15", bar: "from-lime" },
};

export default function Work() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading index="03" eyebrow="Selected work" title="Projects with" accent="measurable impact." />

      <div className="grid gap-5 md:grid-cols-2">
        {work.map((w, i) => {
          const a = accents[w.accent];
          return (
            <Reveal key={w.title} delay={(i % 2) * 0.1}>
              <SpotlightCard className="group h-full overflow-hidden">
                <div className={`pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60 ${a.glow}`} />
                <div className="relative z-10 flex h-full flex-col p-7 md:p-10">
                  <div className="mb-14 flex items-start justify-between gap-4">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">{w.kicker}</span>
                    <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  </div>

                  <div className="mb-8">
                    <div className={`text-6xl font-semibold tracking-tighter md:text-7xl ${a.text}`}>{w.metric.value}</div>
                    <div className="mt-1 text-sm text-muted">{w.metric.label}</div>
                  </div>

                  <h3 className="mb-3 text-2xl font-semibold tracking-tight text-balance">{w.title}</h3>
                  <p className="mb-8 leading-relaxed text-muted text-pretty">{w.body}</p>

                  <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-6">
                    {w.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-fg/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${a.bar} to-transparent opacity-60`} />
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
