# Copilot Instructions

## Scope

This repository is a reusable Slidev theme/layout base for study module presentations.

## Priority workflow

1. Read `README.md`.
2. Read `docs/AI_AGENT_GUIDE.md`.
3. Read `docs/COMPONENT_API.md`.
4. Edit `slides.md` for content generation tasks.

Only inspect component/layout source when API docs are insufficient.

## Style constraints

- Reuse existing components and layouts.
- Do not introduce new color systems, fonts, or design primitives unless explicitly requested.
- Keep slide text concise and presentation-ready.
- Prefer one key idea per slide.

## Frontmatter contract

Always preserve `presentationInfo` keys used by layouts:
- `title`, `subtitle`, `semester`, `authors`, `chapters`.

## Validation

- `npm run dev` for main deck
- `npm run dev:showcase` for component reference deck
- `npm run lint` for component/layout edits
