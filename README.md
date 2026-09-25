# Utkarsh Agarwal: Portfolio

Next.js 16 + Tailwind v4 + React Three Fiber + Motion. Fully static export.

## Edit content
All text, roles, stats, projects and awards live in `src/data/profile.ts`.
Replace `public/Utkarsh-Agarwal-Resume.pdf` to update the downloadable resume.

## Develop
```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy
```bash
npm run build      # outputs static site to ./out
```
- **Vercel (recommended):** push to GitHub, import the repo at vercel.com/new, zero config.
- **Netlify / GitHub Pages / any host:** upload the `out/` folder.

## Resume
`resume/resume.html` is the source for the downloadable PDF. To regenerate after editing:
```bash
"C:/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --no-pdf-header-footer --print-to-pdf=public/Utkarsh-Agarwal-Resume.pdf resume/resume.html
```
