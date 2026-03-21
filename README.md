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

## Local usage

```bash
npm install
npm run dev
```

## Reuse in a new module

1. Clone this repo.
2. Edit `slides.md` (frontmatter and content).
3. Replace/extend assets in `public/` as needed.
4. Keep reusable components/layouts in this repo and update once for all future modules.

## Publish as own GitHub repository

Create an empty GitHub repo first (for example `slidev-theme-booky`), then run:

```bash
cd c:/Users/leonl/OneDrive/Desktop/web_und_mobile/slidev-theme-booky
git init
git add .
git commit -m "Initial Slidev theme and layout extraction"
git branch -M main
git remote add origin https://github.com/LeonLicher/slidev-theme-booky.git
git push -u origin main
```

## Optional workflow

For module-specific decks, create separate repos that consume this repo as a template/base and only keep module content there.
