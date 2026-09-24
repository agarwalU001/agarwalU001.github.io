"use client";

import { useRef, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  accent,
  className = "",
}: {
  index: string;
  eyebrow: string;
  title: string;
  accent?: string;
  className?: string;
}) {
  return (
    <Reveal className={`mb-14 md:mb-20 ${className}`}>
      <div className="mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
        <span className="text-violet">{index}</span>
        <span className="h-px w-10 bg-line" />
        {eyebrow}
      </div>
      <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-balance md:text-6xl">
        {title}{" "}
        {accent && <span className="font-serif font-normal italic text-gradient">{accent}</span>}
      </h2>
    </Reveal>
  );
}

/** Card with a cursor-following glow border and an optional 3D tilt. */
export function SpotlightCard({
  children,
  className = "",
  tilt = true,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });
  const transform = useTransform(
    [srx, sry],
    ([x, y]) => `perspective(1000px) rotateX(${x}deg) rotateY(${y}deg)`,
  );

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tilt && e.pointerType === "mouse") {
      rx.set(((py / r.height) - 0.5) * -8);
      ry.set(((px / r.width) - 0.5) * 8);
    }
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ transform }}
      className={`spotlight rounded-3xl will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** Button that drifts slightly toward the cursor. */
export function MagneticLink({
  href,
  children,
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(0, { stiffness: 250, damping: 15 });
  const y = useSpring(0, { stiffness: 250, damping: 15 });

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
