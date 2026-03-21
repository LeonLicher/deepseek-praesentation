# AI Agent Guide

This document is optimized for AI-assisted slide generation with low prompt size and high consistency.

## 1) Fast start for new presentations

Use this prompt structure:

```text
Create/replace slides.md for topic: <topic>
Language: <de/en>
Target audience: <audience>
Slide count: <n>
Chapter plan: <chapter list>
Use existing components/layouts from docs/COMPONENT_API.md only.
Keep one key message per slide.
```

Then provide only:
- `docs/COMPONENT_API.md`
- `slides.md`

## 2) Frontmatter contract

Required top-level frontmatter keys used by layouts/components:

- `presentationInfo.title`
- `presentationInfo.subtitle`
- `presentationInfo.semester`
- `presentationInfo.authors[]` with `name`, `matrikelnummer`, `email`
- `presentationInfo.chapters[]` with `number`, `title`

Per-slide keys commonly used:
- `layout`
- `title`
- `subtitle`
- `chapter`
- optional `footnotes`

## 3) Recommended slide skeleton

1. `cover`
2. `chapter-intro`
3. content slides with `default`
4. `closing`

## 4) Token-efficient editing workflow

1. Draft outline only (headings + 1 bullet each).
2. Expand each slide using known components.
3. Add references/tables/images after structure is stable.
4. Validate in browser, then refine wording.

## 5) Regression/reference deck

Use `slides.showcase.md` as syntax reference for all custom components and layouts.

Run:

```bash
npm run dev:showcase
```
