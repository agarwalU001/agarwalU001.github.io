"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { profile } from "@/data/profile";
import { MagneticLink } from "@/components/ui/primitives";
import { ArrowDown, ArrowUpRight } from "@/components/ui/icons";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-[12%]">
      <div className="h-72 w-72 animate-pulse rounded-full bg-violet/20 blur-3xl" />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  // Pause the WebGL loop when the hero is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = ["I", "build", "fast,", "secure", "web", "platforms"];

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh items-center overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-violet/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[380px] w-[380px] rounded-full bg-cyan/10 blur-[120px]" />

      <motion.div style={{ scale: sceneScale, opacity: fade }} className="absolute inset-0">
        <div className="h-full w-full opacity-50 md:opacity-100">
          <HeroScene active={active} />
        </div>
      </motion.div>

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="pointer-events-none relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-24 md:px-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="pointer-events-auto mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-muted backdrop-blur-md"
        >
          <span className="h-2 w-2 animate-pulse-dot rounded-full bg-lime" />
          {profile.availability}
        </motion.div>

        <h1>
          <span className="mb-3 block overflow-hidden pb-[0.15em] md:mb-4">
            <motion.span
              className="inline-block font-serif text-[clamp(1.75rem,4vw,3rem)] italic leading-none text-muted"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease }}
            >
              Hey there, I&apos;m
            </motion.span>
          </span>
          <span className="block text-[clamp(4.25rem,15vw,9.5rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
            {[profile.firstName, profile.name.split(" ").slice(1).join(" ")].map((part, i) => (
              // Extra bottom padding keeps descenders (the "g") inside the clip mask and the gradient box.
              <span key={part} className="-mb-[0.14em] block overflow-hidden">
                <motion.span
                  className={`inline-block pr-[0.06em] pb-[0.14em] ${i === 1 ? "text-gradient" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
                >
                  {part}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-7 font-mono text-[11px] tracking-normal text-muted sm:text-sm sm:tracking-wide md:text-base"
        >
          {profile.role} · Java · Angular · React
        </motion.p>

        <h2 className="mt-8 max-w-3xl text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em]">
          {words.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 + i * 0.05, ease }}
              >
                {w}&nbsp;
              </motion.span>
            </span>
          ))}
          <span className="inline-block overflow-hidden pb-1 align-bottom">
            <motion.span
              className="inline-block pr-2 font-serif font-normal italic text-gradient"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 + words.length * 0.05, ease }}
            >
              end to end.
            </motion.span>
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
          className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticLink
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-shadow hover:shadow-[0_0_40px_-5px_rgba(139,92,246,0.8)]"
          >
            Start a project
            <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width={16} height={16} />
          </MagneticLink>
          <MagneticLink
            href="#experience"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-6 py-3.5 text-sm font-medium backdrop-blur-md transition-colors hover:border-white/25"
          >
            View experience
          </MagneticLink>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto flex max-w-7xl items-end justify-between px-5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:px-10"
      >
        <span className="flex items-center gap-2">
          <ArrowDown width={14} height={14} className="animate-bounce" /> Scroll
        </span>
        <span className="hidden md:block">Tip: click the core</span>
        <span>{profile.location}</span>
      </motion.div>
    </section>
  );
}
