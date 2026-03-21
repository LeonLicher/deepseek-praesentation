# Component API

Compact reference for AI agents and developers.

## Layouts

### `cover`
- Uses `presentationInfo` from global frontmatter.
- Shows title, subtitle, semester, and authors.

### `chapter-intro`
- Expects per-slide `chapter` in frontmatter.
- Renders chapter progress with `ChapterOutline`.

### `default`
- Uses per-slide `title`, `subtitle`, `chapter`.
- Wraps content in `SlideLayout` (header, divider, footer, footnotes).

### `closing`
- Uses `presentationInfo.authors`.

### `appendix-desktop`
- Default layout with centered single desktop-style visual.

### `appendix-mobile`
- Default layout with 3-column grid for mobile screenshots.

### `appendix-screenshots`
- Default layout with 2 columns (`Columns`).

## Components

### `BulletedList`
- Props: `title?: string`
- Slot: list items (`<li>` expected)

### `NumberedList`
- Props: `title?: string`, `size?: 'sm' | 'md'`, `start?: number`
- Slot: list items (`<li>` expected)

### `Text`
- Props: `title?: string`
- Slot: rich text content

### `SubText`
- Slot: secondary text line

### `HighlightedText`
- Props: `color?: string`, `weight?: string`
- Slot: inline highlighted content

### `DefinitionBox`
- Props: `title: string`, `source?: string`
- Slot: box content

### `ExampleBox`
- Props: `title: string`, `source?: string`
- Slot: box content

### `Quotebox`
- Props: `source?: string`
- Slot: quote text

### `Divider`
- Props: `length?: string | number`, `color?: string`, `thickness?: string`

### `Columns`
- Props: `columns?: string`, `gap?: string`
- Slot: column content

### `Image`
- Props:
  - `src: string` (required)
  - `title?: string`, `alt?: string`, `caption?: string`, `source?: string`
  - `width?: string`, `maxWidth?: string`, `height?: string`
  - `figureId?: string`
  - `captionAlign?: 'left' | 'center' | 'right'`
- Registers figure numbering when `caption` or `source` is set.

### `FigureList`
- Props: `title?: string` (default `Abbildungsverzeichnis`)
- Uses figures registered by `Image`.

### `Footnote`
- Props: `text: string` (required)
- Inline footnote marker; rendered in footer area by layout.

### `Table`
- Props:
  - `headers: any[]` (required)
  - `rows: any[]` (required)
  - `caption?: string`
  - `columnWidths?: string[]`
  - `size?: 'sm' | 'md' | 'lg'`
  - `accent?: 'blue' | 'gray'`
  - `highlights?: number[]`
- Supports `v-html` in cells.

### `CitationTable`
- Props: `title?: string`, `citations?: Array<{ id: string; text: string }>`, `idWidth?: string`
- Optional slot below table.

### `ChapterOutline`
- Props: `chapter: number` (required)
- Reads chapter labels from `presentationInfo.chapters`.

### `Outline`
- Slot: outline item components

### `OutlineItem`
- Props: `number: number | string`, `active?: boolean`, `disabled?: boolean`
- Slot: label text

### `NumberBadge`
- Props: `number: number | string`, `active?: boolean`, `disabled?: boolean`, `size?: 'sm' | 'md'`

### `SectionTitle`
- Props: `text?: string`
- Slot: title override

### `SlideLayout`
- Props: `title?: string`, `subtitle?: string`
- Slot: slide body

### `Todo`
- Props: `text?: string`

## Composables

### `useFigures`
- `registerFigure(uniqueId, figure)`
- `getFigures()`
- `clearFigures()`
- `hasFigure(uniqueId)`

### `provideFootnotes(slideContext)`
- Returns `{ register, footnotes }` for per-slide footnote handling.
