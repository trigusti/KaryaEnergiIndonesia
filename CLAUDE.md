# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `ui-ux-pro-max` skill** before writing any frontend code, every session, no exceptions.

## Permissions & Autonomy
- **Auto-accept all actions** — do not ask for permission before writing, editing, creating, or running code. Execute immediately without confirmation prompts.
- Never pause to ask "Should I proceed?" or "Can I create this file?" — just do it.
- Only stop to ask the user when genuinely ambiguous requirements need clarification (e.g. missing content or unknown brand colors).

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is installed at `C:/Users/nateh/AppData/Local/Temp/puppeteer-test/`. Chrome cache is at `C:/Users/nateh/.cache/puppeteer/`.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- `screenshot.mjs` lives in the project root. Use it as-is.
- After screenshotting, read the PNG from `temporary screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- **Multi-page structure:** every website must be built as separate `.html` files — one file per page. Never put everything into a single `index.html`.
- Each page lives in its own folder using the permalink slug (e.g. `about/index.html`, `blog/index.html`, `blog/post-name/index.html`).
- Internal navigation links must use real relative URLs pointing to separate `.html` files — never use anchor (`#section`) links as a substitute for separate pages.
- Shared styles go in `assets/css/styles.css`, linked via `<link rel="stylesheet" href="/assets/css/styles.css">`.
- Shared scripts go in `assets/js/main.js`.
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive

## Project Structure
```
project-root/
├── index.html                  ← homepage
├── about/
│   └── index.html              ← /about/
├── blog/
│   ├── index.html              ← /blog/
│   └── post-name/
│       └── index.html          ← /blog/post-name/
├── contact/
│   └── index.html              ← /contact/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── main.js
│   └── images/
├── brand_assets/               ← logos, color guides, style guides
├── serve.mjs
└── screenshot.mjs
```

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.

## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- **Do not put everything into a single `index.html`** — always split into separate page files per route
- **Do not use anchor (`#`) links as substitutes for separate pages** — each page must be its own `.html` file
- **Do not use `<a href="#">`** for navigation items that represent real pages
