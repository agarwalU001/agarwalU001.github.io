"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";
import { profile, services, stats } from "@/data/profile";
import { Reveal, SectionHeading, SpotlightCard } from "@/components/ui/primitives";
import { Bolt, Grid, Layers, Shield } from "@/components/ui/icons";

const icons = { layers: Layers, grid: Grid, bolt: Bolt, shield: Shield };

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, to, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
      <SectionHeading index="01" eyebrow="About" title="Engineering that users feel" accent="and teams trust." />

      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
        <div className="space-y-6 text-lg leading-relaxed text-muted md:text-xl">
          {profile.about.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className="text-pretty">{p}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="bg-bg">
              <div className="flex h-full flex-col justify-between gap-6 p-6 md:p-8">
                <div className="text-5xl font-semibold tracking-tight md:text-6xl">
                  <span className="text-gradient">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </span>
                </div>
                <p className="text-sm leading-snug text-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal className="mt-28 mb-10 flex items-end justify-between gap-6">
        <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
          What I can do <span className="font-serif font-normal italic text-muted">for you</span>
        </h3>
        <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-muted md:block">
          Freelance & full-time
        </span>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-6">
        {services.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          const span = i === 0 || i === 3 ? "md:col-span-4" : "md:col-span-2";
          return (
            <Reveal key={s.title} delay={i * 0.08} className={span}>
              <SpotlightCard className="group h-full p-7 md:p-9">
                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-10 grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.04] text-violet transition-colors group-hover:text-cyan">
                    <Icon width={22} height={22} />
                  </div>
                  <h4 className="mb-3 text-xl font-semibold tracking-tight">{s.title}</h4>
                  <p className="mb-8 max-w-md leading-relaxed text-muted">{s.body}</p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
