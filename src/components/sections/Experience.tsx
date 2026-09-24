"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { education, experience } from "@/data/profile";
import { Reveal, SectionHeading } from "@/components/ui/primitives";
import { Cap } from "@/components/ui/icons";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading index="02" eyebrow="Experience" title="From intern to" accent="SDE-II and beyond." />

      <div ref={ref} className="relative">
        {/* progress rail */}
        <div className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-[calc(33%+7px)]" />
        <motion.div
          style={{ scaleY: progress }}
          className="absolute top-0 bottom-0 left-[7px] w-px origin-top bg-gradient-to-b from-violet via-cyan to-pink md:left-[calc(33%+7px)]"
        />

        {experience.map((c) => (
          <div key={c.company} className="relative grid gap-8 pb-20 md:grid-cols-[33%_1fr] md:gap-0">
            <div className="pl-10 md:pl-0 md:pr-14">
              <div className="md:sticky md:top-32">
                <Reveal>
                  <div className="mb-3 flex items-center gap-3">
                    {c.current && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-lime/30 bg-lime/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-lime">
                        <span className="h-1.5 w-1.5 rounded-full bg-lime" /> Now
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted">{c.period}</span>
                  </div>
                  <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{c.company}</h3>
                  <p className="mt-2 text-muted">{c.location}</p>
                  {c.note && <p className="mt-6 max-w-xs text-sm text-muted">{c.note}</p>}
                </Reveal>
              </div>
            </div>

            <div className="space-y-6 md:pl-14">
              {c.roles.map((r, i) => (
                <Reveal key={r.title} delay={i * 0.05} className="relative pl-10 md:pl-0">
                  <span className="absolute top-8 left-0 h-[15px] w-[15px] rounded-full border-2 border-bg bg-violet shadow-[0_0_0_4px_rgba(139,92,246,0.2)] md:-left-14" />
                  <div className="rounded-3xl border border-line bg-white/[0.02] p-6 transition-colors hover:border-white/15 hover:bg-white/[0.035] md:p-8">
                    <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                      <h4 className="text-xl font-semibold tracking-tight">{r.title}</h4>
                      <span className="font-mono text-xs text-muted">{r.period}</span>
                    </div>
                    <ul className="space-y-3">
                      {r.points.map((p) => (
                        <li key={p} className="flex gap-3 leading-relaxed text-muted">
                          <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                          <span className="text-pretty">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        ))}

        {/* education closes the timeline */}
        <div className="relative grid gap-8 md:grid-cols-[33%_1fr] md:gap-0">
          <div className="pl-10 md:pl-0 md:pr-14">
            <Reveal>
              <span className="font-mono text-xs text-muted">{education.period}</span>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">Education</h3>
            </Reveal>
          </div>
          <Reveal className="relative pl-10 md:pl-14">
            <span className="absolute top-8 left-0 h-[15px] w-[15px] rounded-full border-2 border-bg bg-pink shadow-[0_0_0_4px_rgba(244,114,182,0.2)]" />
            <div className="flex items-start gap-5 rounded-3xl border border-line bg-white/[0.02] p-6 md:p-8">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-line text-pink">
                <Cap width={22} height={22} />
              </div>
              <div>
                <h4 className="text-xl font-semibold tracking-tight">{education.school}</h4>
                <p className="mt-1 text-muted">{education.degree}</p>
                <p className="mt-4 inline-flex rounded-full border border-line px-3 py-1 font-mono text-xs">
                  {education.grade}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
