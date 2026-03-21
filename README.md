# Slidev Theme Booky

Reusable Slidev theme/layout repository extracted from your Booky presentation so you can reuse it across other modules.

## Included

- `components/` custom Slidev/Vue components
- `layouts/` custom layouts (`cover`, `chapter-intro`, `default`, `closing`, ...)
- `composables/` helper composables
- `setup/` Slidev setup hooks
- `public/images/` required shared image assets used by layouts
- `style.css`, `uno.config.ts`, `vite.config.ts`, `eslint.config.js`
- `slides.md` as starter template for a new module presentation
- `slides.showcase.md` with example usage of all custom components/layouts
- `docs/COMPONENT_API.md` compact API reference
- `docs/AI_AGENT_GUIDE.md` token-efficient generation workflow for AI agents

## Local usage

```bash
npm install
npm run dev
```

For full component examples:

```bash
npm run dev:showcase
```

## Reuse in a new module

1. Clone this repo.
2. Edit `slides.md` (frontmatter and content).
3. Replace/extend assets in `public/` as needed.
4. Keep reusable components/layouts in this repo and update once for all future modules.

## AI Agent workflow (recommended)

For best quality and token efficiency when you ask an AI to generate a new deck:

1. Give the AI only these files first:
	- `README.md`
	- `docs/AI_AGENT_GUIDE.md`
	- `docs/COMPONENT_API.md`
2. Tell the AI your topic, chapter structure, and desired slide count.
3. Let the AI generate content in `slides.md` only.
4. Optionally ask the AI to open `slides.showcase.md` when it needs concrete component syntax.

This keeps prompts small while still giving the AI everything it needs.

## Publish as own GitHub repository

Create an empty GitHub repo first (for example `slidev-theme-booky`), then run:

```bash
cd c:/Users/leonl/OneDrive/Desktop/web_und_mobile/slidev-theme-booky
git init
git add .
git commit -m "Initial Slidev theme and layout extraction"
git branch -M main
git remote add origin https://github.com/<your-user>/slidev-theme-booky.git
git push -u origin main
```

## Optional workflow

For module-specific decks, create separate repos that consume this repo as a template/base and only keep module content there.

## Maintenance

- Update `docs/COMPONENT_API.md` when component props/slots change.
- Keep `slides.showcase.md` runnable as a living regression/reference deck.
- Use `npm run lint` before committing larger component/layout changes.
