# AGENTS.md

Guidance for AI coding agents working in this repository.

## Goal

Generate and maintain Slidev presentations using the reusable Booky component/layout system with minimal token usage.

## Minimal context pack (read in this order)

1. `README.md`
2. `docs/AI_AGENT_GUIDE.md`
3. `docs/COMPONENT_API.md`
4. `slides.md`

Only read component/layout source files if API docs are insufficient.

## Working rules

- Keep all presentation content in `slides.md` unless explicitly asked otherwise.
- Reuse existing layouts/components; do not invent new design primitives unless requested.
- Preserve frontmatter schema (`presentationInfo`, chapter metadata) because layouts depend on it.
- Prefer concise, scannable slide content (one core message per slide).
- Keep image paths under `public/` and reference as `/images/...`.

## Validation workflow

- Run `npm run dev` for the main deck.
- Run `npm run dev:showcase` to verify component syntax/examples.
- Run `npm run lint` after changing components/layouts.

## Token-efficiency strategy

- First pass: edit only `slides.md` from API docs.
- Second pass: open individual component files only where needed.
- Avoid loading all Vue files when content-only generation is requested.
