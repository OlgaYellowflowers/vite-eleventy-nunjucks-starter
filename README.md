# vite_eleventy_nunjunks_starter

> Running locally at http://localhost:8081/

A landing page starter powered by Eleventy, Vite, and Nunjucks.

This project is built for fast client project kickoffs with reusable sections, structured SCSS, modern asset bundling, and a simple build pipeline.

## Stack

- Eleventy for static site generation
- Nunjucks for templates and components
- Vite for JS and SCSS bundling
- Sass for styles
- ESLint and Prettier for code quality

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Start development mode:

```bash
npm run dev
```

3. Open the site at:

- http://localhost:8081/

## Local URL and How It Is Powered

When development mode runs, the site appears on http://localhost:8081/.

Why this URL:

- The dev server port is set in `.eleventy.js` using `eleventyConfig.setServerOptions({ port: 8081 })`.

How development works:

1. Eleventy serves HTML generated from Nunjucks templates.
2. Vite runs in watch mode and rebuilds assets from `src/assets/**`.
3. The page loads compiled files from `/assets/css/main.min.css` and `/assets/js/main.min.js`.

## Landing Page Composition

The default page in `src/index.njk` is built from these sections:

1. Hero (`src/_includes/components/hero.html`)
2. Features (`src/_includes/components/features.html`)
3. Contact CTA (`src/_includes/components/contact-cta.html`)
4. Logo Carousel (`src/_includes/components/logo-carousel.html`)
5. Contact Form (`src/_includes/components/contact-form.html`)

Global layout wrappers are provided by:

- Header (`src/_includes/components/header.njk`)
- Footer (`src/_includes/components/footer.njk`)
- Base layout (`src/_includes/layouts/base.njk`)

## Features Included

- Reusable section-based landing page structure
- Starter placeholder content and placeholder image assets
- SCSS architecture with base, component, and layout layers
- Image optimization flow with PNG to WebP conversion for production output
- Linting and formatting scripts

## PNG to WebP Build Behavior

During production builds, PNG images in `src/assets/images` are processed as follows:

1. Vite scans `src/assets/images/**/*.png`.
2. If a matching `.webp` file does not exist, it generates one.
3. WebP files are copied to `dist/assets/images`.
4. PNG files are removed from `dist/assets/images` so the final deploy output stays WebP-first.

Source PNG files can still exist in the repository; the cleanup applies to the build output.

## Scripts

```bash
npm run dev
npm run dev:eleventy
npm run dev:vite
npm run build
npm run build:vite
npm run build:eleventy
npm run cleanup:png
npm run lint
npm run lint:fix
npm run format
npm run format:check
```

## Production Build

```bash
npm run build
```

Build order:

1. `npm run build:vite`
2. `npm run build:eleventy`
3. `npm run cleanup:png`

## Project Structure

```text
.
├── src/
│   ├── index.njk
│   ├── _includes/
│   ├── _data/
│   └── assets/
│       ├── js/
│       ├── scss/
│       ├── images/
│       └── fonts/
├── scripts/
├── dist/
├── .eleventy.js
├── vite.config.js
└── package.json
```

## Customization Checklist

Before shipping a client project, replace:

1. Placeholder text and section copy
2. Placeholder images and logo assets
3. SEO metadata (title, description, social tags)
4. Brand colors and typography tokens in SCSS
5. Form handling strategy (if backend submission is required)

## Suggested Next Improvements

1. Add a dedicated `starter.config.js` for theme tokens and section toggles.
2. Add one more demo page (for example, `about.njk`) to demonstrate multi-page setups.
3. Add Playwright smoke tests for key page interactions and build output checks.
4. Add CI workflow for lint, format check, and production build.
5. Add optional dark-mode tokens using CSS variables.
