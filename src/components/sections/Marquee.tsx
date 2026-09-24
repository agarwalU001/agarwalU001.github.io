const items = [
  "Java", "Angular", "React", "TypeScript", "Spring MVC", "Module Federation",
  "AWS", "Sentry", "SSO", "JUnit", "SonarQube", "Firebase", "Micro-Frontends", "REST APIs",
];

export default function Marquee() {
  const row = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-elev/60 py-6 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-2xl font-medium tracking-tight text-muted/80 md:text-3xl">
            {item}
            <span className="text-violet/70">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
