"use client";

import { useEffect, useRef } from "react";
import { skillGroups, sphereSkills } from "@/data/profile";
import { Reveal, SectionHeading } from "@/components/ui/primitives";

/** Draggable 3D tag sphere rendered with plain DOM transforms (no WebGL). */
function SkillSphere() {
  const wrap = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    // Fibonacci-distributed points on a unit sphere.
    const n = sphereSkills.length;
    const pts = sphereSkills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r };
    });

    let vx = 0.003; // rotation velocity around Y
    let vy = 0.0015; // rotation velocity around X
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let frame = 0;
    let radius = el.clientWidth * 0.42;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const onResize = () => (radius = el.clientWidth * 0.42);
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      el.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      vx = (e.clientX - lastX) * 0.0025;
      vy = (e.clientY - lastY) * 0.0025;
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onUp = () => (dragging = false);

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (!dragging) {
        // ease back toward a gentle idle spin
        vx += (0.003 - vx) * 0.02;
        vy += (0.0012 - vy) * 0.02;
      }
      const cy = Math.cos(vx), sy = Math.sin(vx);
      const cx = Math.cos(vy), sx = Math.sin(vy);

      pts.forEach((p, i) => {
        // rotate around Y then X
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y1 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        p.x = x1; p.y = y1; p.z = z2;

        const t = tags.current[i];
        if (!t) return;
        const depth = (z2 + 1) / 2; // 0 back → 1 front
        const scale = 0.6 + depth * 0.6;
        t.style.transform = `translate(-50%, -50%) translate3d(${x1 * radius}px, ${y1 * radius}px, 0) scale(${scale})`;
        t.style.opacity = String(0.2 + depth * 0.8);
        t.style.zIndex = String(Math.round(depth * 100));
        t.style.filter = depth < 0.35 ? `blur(${(0.35 - depth) * 4}px)` : "none";
      });

      if (!reduced) frame = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative mx-auto aspect-square w-full max-w-[520px] cursor-grab touch-none select-none active:cursor-grabbing"
      aria-label="Interactive sphere of skills, drag to rotate"
    >
      <div className="pointer-events-none absolute inset-[18%] rounded-full bg-violet/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-[8%] rounded-full border border-line" />
      <div className="pointer-events-none absolute inset-[8%] rotate-[70deg] scale-y-[0.3] rounded-full border border-line" />
      {sphereSkills.map((s, i) => (
        <span
          key={s}
          ref={(t) => { tags.current[i] = t; }}
          className="absolute top-1/2 left-1/2 rounded-full border border-line bg-bg/80 px-3 py-1.5 font-mono text-xs whitespace-nowrap text-fg shadow-[0_0_20px_-6px_rgba(139,92,246,0.6)] transition-colors hover:border-violet hover:text-violet md:text-sm"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden py-28 md:py-40">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading index="04" eyebrow="Toolkit" title="The stack I" accent="ship with." />

        <div className="grid items-center gap-16 md:grid-cols-2">
          <Reveal>
            <SkillSphere />
            <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Drag to spin
            </p>
          </Reveal>

          <div className="space-y-10">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.08}>
                <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="text-violet">0{i + 1}</span> {g.label}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-xl border border-line bg-white/[0.03] px-4 py-2 text-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
