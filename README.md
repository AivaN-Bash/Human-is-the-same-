# Human is the same

React, TypeScript, and Tailwind landing page for the education project. The project follows shadcn/ui conventions; add reusable components under `src/components/ui/`.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Run `npm run build` to create a production build in `dist/`.
Run `npm run check` before publishing to type-check the project and build both pages.

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
- The hero uses one looping, slow-pan adult literacy photo at `public/images/adult-literacy.jpg`; change its path in `src/data/site.ts`.
- About details, activity copy, and the volunteer quote are editable in `src/data/site.ts`.
- The standalone contact page is `contact.html`, with its React entry in `src/contact.tsx`; its email, label, and copy are editable in `src/data/site.ts`.
- The contact form opens a prefilled email draft in the visitor's email app. Visitors review and send it there; the site does not store or send messages through a server.

## shadcn/ui

`components.json`, `tsconfig.json`, and `vite.config.ts` map `@/components/ui` to `src/components/ui`. Keeping UI primitives there matches shadcn CLI defaults and keeps generated components reusable across pages. The shared `cn` helper lives in `src/lib/utils.ts`.

For a new Vite project, run `npx shadcn@latest init -t vite`, then install Tailwind and TypeScript if the starter does not include them. This project already has that structure, plus Tailwind 3 and TypeScript.

## Photo credits

- Adult literacy illustration: [The New York Public Library](https://unsplash.com/photos/a-black-and-white-photo-of-a-woman-reading-a-book-lp3366axla4)
- Adult reading illustration: [Vitaly Gariev](https://unsplash.com/photos/elderly-woman-reading-a-book-on-a-couch-zuLrqcc4Hu0)
- Thai community market illustration: [Kelvin Zyteng](https://unsplash.com/photos/woman-preparing-food-on-market-boat-7_l8HaQ3N1k)

