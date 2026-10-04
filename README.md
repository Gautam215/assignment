# assignment

## ITZ FIZZ — Cinematic Next.js Hero

A complete Next.js App Router project featuring a premium slate-gray automotive hero, a bundled transparent Aventador SVJ image, local Manrope type, and a scroll-controlled progress road.

## Requirements

- Node.js 20.9 or newer
- npm

## Run the project

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Start from a fresh Next.js scaffold instead

If you prefer to scaffold the current folder yourself, run:

```bash
npx create-next-app@latest itz-fizz-next-app --typescript --tailwind --eslint --app
cd itz-fizz-next-app
npm install gsap @fontsource-variable/manrope
```

Then copy this project's `app/`, `public/`, `next.config.ts`, and `postcss.config.mjs` into the scaffold. Start the development server with:

```bash
npm run dev
```

## Included files

```text
app/
├── globals.css       # Tailwind import and responsive visual styling
├── layout.tsx        # Root layout and metadata
└── page.tsx          # Hero, stat metrics, intro, and ScrollTrigger scenes
public/
├── car.webp          # Optimized transparent car artwork
└── highway.svg       # Bundled cinematic background scene
next.config.ts
package.json
postcss.config.mjs
tsconfig.json
```

One scrubbed ScrollTrigger timeline moves the car and road. The headline begins fully hidden and its clip mask follows the car's trailing edge; each glass spec card fades and scales in at its track position. A soft radial shadow tracks under the car. The intro respects reduced-motion preferences and the geometric Manrope font is bundled locally.
