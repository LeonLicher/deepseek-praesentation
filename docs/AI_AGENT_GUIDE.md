# AI Agent Guide

This guide is optimized for generating the DeepSeek Slidev presentation with low prompt size and high factual reliability.

## 1) Task Frame

Create a German 10-minute presentation for **Machine and Deep Learning II** in the chapter **Transformer Architectures II**.

The deck must present one DeepSeek model family/model collection with an architecture focus. It should start with a model overview, then focus on the latest and benchmark-strongest DeepSeek model available at the time of generation.

Main deck: exactly 10 slides. Appendix: allowed.

## 2) Required Research Before Final Generation

Before writing final content, verify:

- Which DeepSeek model is currently the latest relevant release.
- Which DeepSeek model is benchmark-strongest for the tasks discussed.
- Whether the latest model and benchmark-best model are the same. If not, explain the selection.
- Architecture details: attention, MoE/sparsity, context handling, training precision, parallelism, post-training/RL, distillation.
- Model-card content, license, intended use, limitations, and official source URL.
- Benchmark names, values, comparison models, and evaluation date/version.

Prefer primary sources:

- Official DeepSeek model cards on Hugging Face
- Official DeepSeek GitHub repositories
- DeepSeek technical reports
- arXiv papers from the model authors
- Official benchmark tables from the reports/model cards

Use access dates for web sources.

## 3) Prompt Structure for Deck Generation

Use this prompt shape:

```text
Replace slides.md with a German Slidev deck.
Topic: DeepSeek architecture in Transformer Architectures II.
Audience: Machine and Deep Learning II students.
Length: exactly 10 main slides + appendix.
Time: 10 minutes total, 2 speakers.
Required: model overview first, latest/best model selection, architecture focus, clean citations, original model card in appendix.
Use only existing layouts/components from docs/COMPONENT_API.md.
```

Then provide:

- `README.md`
- `docs/AI_AGENT_GUIDE.md`
- `docs/COMPONENT_API.md`
- current `slides.md`

## 4) Frontmatter Contract

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

Do not remove these keys unless component/layout code is changed accordingly.

## 5) Recommended Main-Deck Outline

1. Cover
2. Model family overview
3. Selected model and model-card summary
4. Transformer baseline and architectural lineage
5. Attention/context mechanism
6. MoE/sparse compute and routing
7. Training and inference efficiency
8. Reasoning/post-training architecture
9. Benchmarks, limitations, and responsible use
10. Architecture takeaways

Appendix:

- Original model card
- Full bibliography
- Optional backup: formulas, benchmark table, model-family details

## 6) Citation Standard

Use short citations on content slides and full citations in the appendix.

Good slide-level citation examples:

- `DeepSeek technical report, 2025`
- `DeepSeek Hugging Face model card, accessed 2026-05-25`
- `Vaswani et al., 2017`

Full bibliography entries should include:

- Author or organization
- Title
- Year or publication date
- URL or DOI/arXiv ID
- Access date for web pages/model cards

Every numeric claim needs a source: model size, active parameters, context length, cost, GPU count, benchmark score, license, training tokens.

## 7) Content Style

- German slide text.
- One core message per slide.
- Prefer compact tables and diagrams over dense prose.
- Do not read formulas as the main story; use them as support.
- Keep architecture vocabulary precise: decoder-only Transformer, attention heads, KV cache, MoE, routing, active parameters, post-training.
- Move implementation-heavy details to appendix.

## 8) Component Usage

Use `docs/COMPONENT_API.md` as the API source. Prefer:

- `Table` for model overview, model card, and benchmarks.
- `Columns` for side-by-side architecture comparisons.
- `DefinitionBox` for technical mechanisms.
- `ExampleBox` for implications and results.
- `CitationTable` for bibliography.
- `Image` for diagrams, architecture figures, and model-card screenshots.
- `Footnote` for slide-level citations.

Use `slides.showcase.md` only when component syntax examples are needed.

## 9) Validation

For final deck changes:

```bash
npm run build
```

Use local preview for visual checks:

```bash
npm run dev
```

If component syntax is uncertain:

```bash
npm run dev:showcase
```

Run lint only after code changes:

```bash
npm run lint
```
