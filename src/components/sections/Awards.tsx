"use client";

import { awards } from "@/data/profile";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/ui/primitives";
import { Trophy } from "@/components/ui/icons";

export default function Awards() {
  return (
    <section id="awards" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-32">
      <SectionHeading index="05" eyebrow="Recognition" title="Awarded for" accent="showing up and shipping." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {awards.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.08} className="h-full">
            <SpotlightCard className="h-full p-7">
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-10 flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet/30 to-cyan/10 text-fg">
                    <Trophy width={20} height={20} />
                  </div>
                  <span className="font-mono text-xs text-muted">{a.year}</span>
                </div>
                <h3 className="mb-1 text-lg font-semibold leading-snug tracking-tight">{a.title}</h3>
                <p className="mb-4 font-mono text-xs text-violet">{a.org}</p>
                <p className="mt-auto text-sm leading-relaxed text-muted">{a.body}</p>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
