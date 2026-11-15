# Human is the same

React, TypeScript, and Tailwind landing page for the education project. The project follows shadcn/ui conventions; add reusable components under `src/components/ui/`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to create a production build in `dist/`.

## Deploy on GitHub Pages

Push to `main` to build and deploy with GitHub Actions. The Vite base path is configured for this repository. In GitHub, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions** if Pages is not already enabled. After the first successful deployment, the site will be available at `https://aivan-bash.github.io/Human-is-the-same-/`.

## Edit the site

- Change text, links, activities, and image paths in `src/data/site.ts`.
- Shared page sections and interactions are in `src/main.tsx`.
- Colors, layout, responsive rules, and reduced-motion behavior are in `src/styles.css`.
- Replace photos in `public/images/` and keep the paths in `src/data/site.ts` in sync.
- `src/components/ui/text-roll.tsx` contains the reusable Thai-aware heading animation.
- `src/components/ui/animated-text-04.tsx` rotates the About section's short learning statements; phrases and timing are configurable.
- `src/components/ui/learning-invitation-card.tsx` contains the volunteer card and animated education quote; its content comes from `src/data/site.ts`.
- The volunteer quote reveals as text in a repeating, reduced-motion-aware animation.
- About's calm blue background is built from CSS gradients in `src/styles.css`; its soft lighting respects reduced-motion settings.
- The hero uses one looping, slow-pan photo at `public/images/hero.jpg`; change its path in `src/data/site.ts`.
- About details, activity copy, and the volunteer quote are editable in `src/data/site.ts`.

## shadcn/ui

`components.json`, `tsconfig.json`, and `vite.config.ts` map `@/components/ui` to `src/components/ui`. Keeping UI primitives there matches shadcn CLI defaults and keeps generated components reusable across pages. The shared `cn` helper lives in `src/lib/utils.ts`.

For a new Vite project, run `npx shadcn@latest init -t vite`, then install Tailwind and TypeScript if the starter does not include them. This project already has that structure, plus Tailwind 3 and TypeScript.

## Photo credits

- Classroom: [Fajar Herlambang Studio](https://unsplash.com/photos/students-in-white-uniforms-sitting-at-desks-in-classroom-SZW4OQA_lME)
- Peer learning: [Ruslan Horovyi](https://unsplash.com/photos/two-young-students-drawing-together-in-a-classroom-ycuGtOTAtuU)
- Tutoring: [Vitaly Gariev](https://unsplash.com/photos/teacher-helping-young-student-with-math-problems-at-desk-wr2OzAO5fpc)
- Adult learning: [The New York Public Library](https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-reading-a-book-lp3366axla4)

