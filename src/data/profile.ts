// Single source of truth for all portfolio content.
// Edit this file to update the site; components read everything from here.

export const profile = {
  name: "Utkarsh Agarwal",
  firstName: "Utkarsh",
  role: "Software Engineer II",
  location: "Hyderabad, India",
  email: "agarwalutkarsh001@gmail.com",
  availability: "Open to freelance & new roles",
  tagline:
    "Full-stack engineer building fast, secure, enterprise-grade web platforms, from Java REST APIs to micro-frontend architectures.",
  about: [
    "I'm a full-stack engineer with 4+ years of shipping production software for enterprise SaaS. I'm currently at MyComplianceOffice. Before that I spent four years at HighRadius, growing from intern to SDE-II across five roles.",
    "Alongside my full-time work, I train and stress-test AI models as a freelance coding evaluator with Surge AI and DataAnnotation.tech.",
    "I care about the parts users feel and the parts they never see: interfaces that load in a blink, APIs that stay secure under pressure, and codebases the next engineer is happy to inherit.",
  ],
  site: "https://utkarsh-agarwal.me",
  links: {
    github: "https://github.com/agarwalU001",
    linkedin: "https://www.linkedin.com/in/utkarsh001",
    leetcode: "https://leetcode.com/u/utkarsh_001",
    resume: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/Utkarsh-Agarwal-Resume.pdf`,
  },
};

export const stats = [
  { value: 4, suffix: "+", label: "Years shipping production software" },
  { value: 60, suffix: "%", label: "Faster load times via micro-frontends" },
  { value: 80, suffix: "%", label: "Cut in payments setup cycles" },
  { value: 50, suffix: "%+", label: "Boost in debugging efficiency" },
];

export const services = [
  {
    title: "Full-stack web apps",
    body: "End-to-end products with Java / Spring REST APIs and Angular or React frontends: designed, built and deployed.",
    tags: ["Java", "Spring", "Angular", "React"],
    icon: "layers",
  },
  {
    title: "Frontend architecture",
    body: "Micro-frontends with Webpack Module Federation that break monoliths into independently shipped modules.",
    tags: ["Module Federation", "Webpack", "TypeScript"],
    icon: "grid",
  },
  {
    title: "Performance & observability",
    body: "Sentry APM, render-tree tuning and load-time work that turns slow dashboards into snappy ones.",
    tags: ["Sentry", "APM", "Web Vitals"],
    icon: "bolt",
  },
  {
    title: "Security & code quality",
    body: "SSO authentication, JUnit coverage and SonarQube / Checkmarx scans that harden legacy codebases.",
    tags: ["SSO", "JUnit", "SonarQube", "Checkmarx"],
    icon: "shield",
  },
];

export type Role = {
  title: string;
  period: string;
  points: string[];
};

export type Company = {
  company: string;
  short: string;
  location: string;
  period: string;
  current?: boolean;
  note?: string;
  roles: Role[];
};

export const experience: Company[] = [
  {
    company: "Surge AI & DataAnnotation.tech",
    short: "AI Training",
    location: "Remote · Freelance",
    period: "2025 - Present",
    current: true,
    note: "Training and stress-testing AI models, alongside my full-time role.",
    roles: [
      {
        title: "AI Coding Evaluator (RLHF)",
        period: "2025 - Present",
        points: [
          "Evaluate and rank LLM-generated code for correctness, efficiency and readability, writing detailed feedback used in RLHF model training.",
          "Debug and fix flawed model outputs, documenting root causes so models learn from the corrected reasoning.",
          "Red-team models with adversarial coding prompts to surface insecure, unsafe or incorrect behaviour.",
        ],
      },
    ],
  },
  {
    company: "MyComplianceOffice",
    short: "MCO",
    location: "Hyderabad, India",
    period: "Jul 2025 - Present",
    current: true,
    roles: [
      {
        title: "Software Engineer II",
        period: "Jul 2025 - Present",
        points: [
          "Full-stack developer on mission-critical enterprise compliance management products, working across Java and Angular.",
          "Architecting and deploying secure backend REST APIs in Java alongside high-performance Angular UI modules for a unified end-to-end experience.",
        ],
      },
    ],
  },
  {
    company: "HighRadius Technologies",
    short: "HighRadius",
    location: "Hyderabad, India",
    period: "Jun 2021 - Jul 2025",
    note: "Grew from intern to SDE-II across 5 roles.",
    roles: [
      {
        title: "Software Development Engineer II",
        period: "Jan 2025 - Jul 2025",
        points: [
          "Integrated Sentry observability into core legacy SaaS apps, establishing automated APM and improving debugging efficiency by 50%+.",
          "Revamped legacy layers with multi-tier JUnit suites and SonarQube / Checkmarx scanning to detect and remediate vulnerabilities.",
        ],
      },
      {
        title: "Software Engineer I",
        period: "Jul 2024 - Dec 2024",
        points: [
          "Modernized central identity services, implementing Single Sign-On (SSO) to secure and synchronize users across systems.",
          "Planned and built a ReactJS micro-frontend platform with cross-functional teams to phase out monolithic UIs.",
        ],
      },
      {
        title: "Associate Software Engineer II",
        period: "Jul 2023 - Jun 2024",
        points: [
          "Co-architected a custom micro-frontend framework on Webpack Module Federation in the R1AR team, unifying several Order-to-Cash apps and cutting load time by 60%.",
          "Built modular O2C workflows natively for the new architecture with responsive rendering trees and faster page transitions.",
        ],
      },
      {
        title: "Associate Software Engineer I",
        period: "Jul 2022 - Jun 2023",
        points: [
          "Contributed to the greenfield design and build of a mid-market Payments module in the O2C pipeline, reducing setup cycles by 80%.",
        ],
      },
      {
        title: "Software Engineer Intern",
        period: "Jun 2021 - Jun 2022",
        points: [
          "Shipped features for the Collections product with the Autonomous team, resolved complex production bugs and took an active part in code reviews.",
        ],
      },
    ],
  },
];

export const skillGroups = [
  { label: "Languages", items: ["Java", "JavaScript (ES6+)", "TypeScript", "SQL"] },
  {
    label: "Frameworks",
    items: ["Angular", "React", "Spring MVC", "Module Federation", "Material UI"],
  },
  { label: "AI & LLMs", items: ["RLHF", "LLM Code Evaluation", "Model Debugging", "Red-teaming"] },
  {
    label: "Tools & Cloud",
    items: ["AWS", "Git", "Firebase", "Sentry", "SonarQube", "Checkmarx", "Jira"],
  },
  {
    label: "Foundations",
    items: ["DSA", "OOP", "SOLID", "TDD", "DBMS", "Networks", "Operating Systems"],
  },
];

export const sphereSkills = [
  "Java", "Angular", "React", "TypeScript", "JavaScript", "Spring MVC", "SQL",
  "AWS", "Webpack", "Module Federation", "Sentry", "SonarQube", "Checkmarx",
  "JUnit", "SSO", "Firebase", "Material UI", "Git", "REST APIs", "Micro-Frontends",
  "TDD", "SOLID", "DSA", "Jira", "RLHF", "LLM Eval", "HTML", "CSS", "OOP",
];

export const work = [
  {
    kicker: "HighRadius · R1AR team",
    title: "Micro-frontend framework for Order-to-Cash",
    body: "A custom runtime-composition framework on Webpack Module Federation that stitched several independent O2C applications into one modern, responsive product.",
    metric: { value: "60%", label: "faster load times" },
    tags: ["React", "Module Federation", "Webpack", "TypeScript"],
    accent: "violet",
  },
  {
    kicker: "HighRadius · O2C",
    title: "Mid-market Payments module",
    body: "Greenfield layout and engineering of a new Payments module built for scale inside the core Order-to-Cash pipeline.",
    metric: { value: "80%", label: "shorter setup cycles" },
    tags: ["React", "Java", "REST"],
    accent: "cyan",
  },
  {
    kicker: "HighRadius · Platform",
    title: "Observability for legacy SaaS",
    body: "Rolled Sentry APM into core legacy apps with automated performance monitoring, so issues surface with context instead of guesswork.",
    metric: { value: "50%+", label: "debugging efficiency" },
    tags: ["Sentry", "APM", "JUnit", "SonarQube"],
    accent: "pink",
  },
  {
    kicker: "Freelance · Contract",
    title: "JEE Simplified: e-learning platform",
    body: "Designed and shipped a responsive, client-facing learning platform with on-demand video streaming, secure checkout and automated transaction notifications.",
    metric: { value: "0 → 1", label: "built end to end" },
    tags: ["React", "Material UI", "Firebase"],
    accent: "lime",
  },
];

export const awards = [
  {
    title: "“You Earned It” Award",
    org: "MyComplianceOffice",
    year: "Current",
    body: "Recognition for technical execution and milestone ownership.",
  },
  {
    title: "HighFlyer Spot Award",
    org: "HighRadius",
    year: "H2 2024",
    body: "Outstanding software delivery achievements.",
  },
  {
    title: "HighFlyer Fresher of the Year",
    org: "HighRadius",
    year: "2023",
    body: "Exceptional ramp-up efficiency and engineering execution.",
  },
  {
    title: "Highako of the Quarter",
    org: "HighRadius",
    year: "Q4 2021",
    body: "Top-tier contributions during the internship.",
  },
];

export const education = {
  school: "KIIT University",
  degree: "B.Tech, Computer Science & Engineering",
  period: "2018 - 2022",
  location: "Bhubaneswar, India",
  grade: "9.2 / 10 CGPA",
};
