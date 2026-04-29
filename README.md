# Lovable Prompt Builder

A playful Vue 3 wizard that turns a 6-step guided flow into a copy-pasteable, well-structured **Lovable** prompt — with a live preview, presets, and a one-click **Build with Lovable** launcher.

> Live URL: _add after first deploy_

<img width="1377" height="1112" alt="lovable-prompt-builder" src="https://github.com/user-attachments/assets/0639b246-1346-42ca-bec8-808b6ffe5eea" />

## How to use

1. Walk through six short steps (Basics, Design, Pages, Features & Data, Backend, Final Touches). Skip what you don't care about — every field has a sensible default.
2. Copy the generated prompt, download it as Markdown, or hit **Build with Lovable** to launch a new Lovable session pre-filled with your prompt.

That's it. No accounts, no backend, no data leaves your browser.

## Features

- **6-step wizard** mapped to Lovable's "Initial Prompt Template" (Purpose, Target User, Design, Pages, Core Features, Data Model, Backend, Constraints, Kickoff).
- **Live preview** that re-renders idempotently — jump back to any step and the affected section updates in place.
- **5 starter presets** (SaaS landing, dashboard, marketplace, etc.) so you can begin from a working example instead of a blank screen.
- **Copy / download / Build-with-Lovable** outputs. Section markers are stripped from anything that leaves the app.
- **Light + dark theme** with pre-paint guard (no FOUC).
- **Accessible defaults**: semantic HTML, keyboard navigation, focus management, alt text.

## Stack

- Vue 3 + Vite + TypeScript
- Pinia for wizard state
- Tailwind CSS v3 (with the Lovable color palette)
- Vitest for the snippet engine's unit tests
- No backend. No database. No persistence library. Pure SPA.

## Develop

```bash
nvm use            # Node 20
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check + production build to dist/
npm run preview    # serve dist/ locally
npm run typecheck  # vue-tsc --noEmit
npm run test       # vitest run
```

## Deploy

This is a static SPA — drop it on anything that serves a `dist/` folder.

- **Netlify** — `netlify.toml` is committed. Connect the repo, push to `main`, done. Build command: `npm run build`. Publish dir: `dist`. SPA fallback redirect is already configured.
- **Vercel** — import the repo; framework preset "Vite" auto-detects everything. Add a rewrite from `/(.*)` to `/index.html` if you hit 404s on deep links.

No environment variables required.

## Build with Lovable

The launcher opens `https://lovable.dev/?autosubmit=true#prompt=<url-encoded>` in a new tab. The prompt rides in the URL fragment, so it never leaves your browser. Lovable's URL ceiling sits around ~8k characters — the app warns before launching anything longer.

## Roadmap (post-MVP)

- AI-assisted prompt building (Claude / Lovable API). Intentionally deferred for the MVP.
- Save/load prompts locally.
- Sharable prompt URLs (the same fragment trick, but pointing back to this app).

## Credits

Built to make starting a new [Lovable](https://lovable.dev) project feel less like staring at a blank box.

## License

MIT — see [LICENSE](./LICENSE).
