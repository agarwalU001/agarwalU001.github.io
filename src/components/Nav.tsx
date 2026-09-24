"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { profile } from "@/data/profile";

const links = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 400 && !open);
  });

  // Highlight the section currently in view.
  useEffect(() => {
    const sections = ["#top", ...links.map((l) => l.href)]
      .map((href) => document.querySelector(href))
      .filter((s): s is Element => !!s);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActiveId(`#${e.target.id}`));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-500 ${
            scrolled
              ? "border-line bg-bg/70 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="group flex items-center gap-2.5 pl-2">
            <span className="relative grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet via-cyan to-pink text-[11px] font-bold text-bg">
              UA
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    activeId === l.href ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {activeId === l.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}`}
              className="hidden rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-transform hover:scale-[1.03] sm:block"
            >
              Hire me
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 h-px w-4 bg-fg transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-bg/95 px-8 backdrop-blur-xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                className="border-b border-line py-5 text-4xl font-semibold tracking-tight"
              >
                {l.label}
              </motion.a>
            ))}
            <a href={`mailto:${profile.email}`} className="mt-10 font-mono text-sm text-muted">
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
