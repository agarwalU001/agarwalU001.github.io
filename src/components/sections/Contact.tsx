"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import { MagneticLink, Reveal } from "@/components/ui/primitives";
import { ArrowUpRight, Check, Copy, Download, GitHub, LeetCode, LinkedIn, Mail } from "@/components/ui/icons";

const socials = [
  { label: "GitHub", href: profile.links.github, Icon: GitHub },
  { label: "LinkedIn", href: profile.links.linkedin, Icon: LinkedIn },
  { label: "LeetCode", href: profile.links.leetcode, Icon: LeetCode },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden pt-28 pb-10 md:pt-40">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[520px] w-[900px] max-w-full -translate-x-1/2 translate-y-1/3 rounded-full bg-gradient-to-r from-violet/40 via-cyan/25 to-pink/30 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted">
            <span className="text-violet">06</span>
            <span className="h-px w-10 bg-line" />
            Contact
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="text-[clamp(3rem,11vw,10rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
            Let&apos;s build
            <br />
            <span className="font-serif font-normal italic text-gradient">something great.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-muted md:text-xl">
            Hiring for a full-stack or frontend role, or need a freelance engineer to take a product
            from idea to launch? Let&apos;s talk.
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <MagneticLink
            href={`mailto:${profile.email}?subject=${encodeURIComponent("Let's work together")}`}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-fg px-7 py-4 text-base font-medium text-bg transition-shadow hover:shadow-[0_0_60px_-5px_rgba(139,92,246,0.9)]"
          >
            <Mail width={18} height={18} />
            Email me
            <ArrowUpRight width={18} height={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticLink>

          <button
            onClick={copy}
            className="inline-flex items-center justify-center gap-3 rounded-full border border-line bg-white/[0.03] px-6 py-4 font-mono text-sm backdrop-blur-md transition-colors hover:border-white/25"
          >
            {profile.email}
            {copied ? <Check width={16} height={16} className="text-lime" /> : <Copy width={16} height={16} className="text-muted" />}
          </button>

          <a
            href={profile.links.resume}
            download
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-4 text-sm transition-colors hover:border-white/25"
          >
            <Download width={16} height={16} /> Resume
          </a>
        </Reveal>

        <div className="mt-28 flex flex-col-reverse items-start justify-between gap-8 border-t border-line pt-8 md:flex-row md:items-center">
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <div className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group flex items-center gap-2 rounded-full border border-line bg-bg/40 px-4 py-2.5 text-sm text-muted backdrop-blur-md transition-colors hover:border-white/25 hover:text-fg"
              >
                <Icon width={16} height={16} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
