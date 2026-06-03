# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
npm run dev          # start dev server at http://localhost:5173
npm run build        # type-check + build for production
npm run preview      # preview production build at http://localhost:4173
npm run type-check   # vue-tsc type checking only

npm run lint         # run oxlint then eslint (both with --fix)
npm run format       # prettier format src/

npm run test:unit              # vitest (watch mode)
npx vitest run                 # vitest single run
npx vitest run src/path/to/file.spec.ts  # single test file

npm run test:e2e               # playwright (requires dev server running or starts one)
npx playwright test --project=chromium   # single browser
npx playwright test e2e/vue.spec.ts      # single e2e file
npx playwright test --debug              # debug mode
```

For e2e tests on CI, build first (`npm run build`) then run with `CI=true`.

## Architecture

**Stack:** Vue 3 (Composition API / `<script setup>`) + TypeScript + Vite + Pinia + Vue Router.

**Path alias:** `@` resolves to `src/`.

This is **Dead Byte Journal** — a 90s hacker terminal-style ethical hacking articles site with a DedSec/Watch Dogs 2 aesthetic (monochrome + green phosphor accent, CRT scanlines, glitch text, VT323 bitmap font).

### Data layer

`src/data/articles.ts` is the single source of truth. It exports `ARTICLES: Article[]` and `byId(id)`. Each article has a `body` array of typed blocks:

| Block type | Shape |
|---|---|
| `h` | section heading (also anchors TOC) |
| `p` | paragraph |
| `code` | `{ label, lines: CodeLine[] }` — terminal code block |
| `ascii` | preformatted ASCII art |
| `note` | "authorized use only" callout |
| `list` | `x: string[]` bullet list |

`CodeLine.t` is `'cmd' | 'out' | 'ok' | 'prompt'`, each rendered with different accent coloring.

### Routing

`src/router/index.ts` — HTML5 history mode, `scrollBehavior` resets to top on navigation.

| Path | View | Notes |
|---|---|---|
| `/` | `HomeView` | eagerly loaded |
| `/archive` | `ArchiveView` | lazy |
| `/article/:id` | `ArticleView` | lazy, `id` passed as prop |
| `/about` | `AboutView` | lazy |

### State

No active Pinia stores. The `src/stores/counter.ts` scaffold remains but is unused.

### CSS

All terminal styling lives in `src/assets/main.css` (imported via `src/main.ts`). It defines:
- CSS custom properties under `.site` (`--bg`, `--fg`, `--acc`, `--line`, `--bit`, `--mono`, etc.)
- Every utility class the components use (`.glow`, `.dim`, `.acc`, `.stencil`, `.glitch`, `.cur`, `.panel`, `.ticks`, `.tag`, `.btn`, `.tile`, `.arow`, `.boot`, `.marq`, `.crt`)

The root element in `App.vue` carries `class="site"` — all CSS variables and scoped styles depend on this.

Fonts (JetBrains Mono + VT323) are loaded via `<link>` in `index.html`.

### Key component patterns

- **`GlitchSpan`** — pure CSS glitch effect. Wraps text in `.glitch[data-text]`; `::before`/`::after` pseudo-elements read `data-text` for the glitch layers. Pass `:block="true"` when text needs to wrap (e.g. article H1).
- **`ScrambleText`** — same `.glitch[data-text]` output as `GlitchSpan` but animates characters on mount (scramble → reveal). Accepts `delay` (ms before starting) and `block` props.
- **`StencilText`** — `<div class="stencil">` wrapper for large bitmap headings. Props: `size` (font-size in px, default 48) and `glow` (boolean).
- **`SitePanel`** — renders `.panel.ticks` with corner-tick pseudo-elements; a `<span class="tk">` child provides the bottom-corner ticks (the CSS targets `.ticks > .tk`).
- **`BootOverlay`** — full-screen boot animation that plays once per browser session (tracked via `sessionStorage.dbj_booted`). Clicking anywhere skips it. `App.vue` listens for the `done` emit then sets the flag.
- **`ArticleView`** — computes `body` as `AnnotatedBlock[]` (adds `secId` to heading blocks) so the template never mutates state during render. TOC scroll-spy listens on `window scroll`.

### Article authoring conventions

- **IDs** follow the `0xNN` hex pattern (`0x01`, `0x02`, …).
- **`pinned`** — only one article should have `pinned: true`; `HomeView` uses `ARTICLES.find(a => a.pinned) ?? ARTICLES[0]` for the hero tile.
- **`toc[]` and `h` blocks must stay in sync** — `ArticleView` auto-generates `secId` as `sec-0`, `sec-1`, … from heading blocks in order. The `toc` array is indexed the same way, so every `toc` entry needs a corresponding `{ t: 'h', … }` block and vice versa.
- **`LEGAL` constant** — `articles.ts` exports a pre-built `note` block with the authorized-use disclaimer. Spread it into `body` rather than duplicating the text.
- **`CodeLine.p`** — when `t: 'prompt'`, the `p` field overrides the default `$` prefix in `CodeBlock` (use for custom shell prompts like `>>>` or `root@kali`).

### Linting pipeline

oxlint runs first (faster, catches most issues), then ESLint handles Vue-specific and TypeScript rules. Both auto-fix. Run them together with `npm run lint`.
