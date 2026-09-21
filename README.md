# Personal Brand Portfolio

Premium editorial portfolio website built with React, Vite, Tailwind CSS, and Wouter.

## Run in the existing workspace

```bash
pnpm install
pnpm --filter @workspace/personal-brand-portfolio run dev
```

The Replit artifact workflow supplies `PORT` and `BASE_PATH` automatically.

## Customize the site

Edit `src/content.ts` to replace the structured placeholders:

- `[YOUR NAME]`
- `[YOUR ROLE]`
- `[YOUR EMAIL]`
- `[LINKEDIN]`, `[INSTAGRAM]`, `[ARE.NA]`, `[READ.CV]`
- Project, service, experience, and SEO content

Replace the sample artwork in `public/project-*.jpg` with your own images. Keep the same filenames or update the image references in `src/content.ts`.

## Main routes

- `/` — Home
- `/projects` — Project archive
- `/projects/:slug` — Project detail pages
- `/about` — About and experience
- `/services` — Services and process
- `/contact` — Direct email contact
