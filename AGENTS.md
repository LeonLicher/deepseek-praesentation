# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Goal

Create and maintain a German Slidev presentation for the course **Machine and Deep Learning II**.

Topic: **DeepSeek model family with focus on Transformer architectures**  
Course context: **Transformer Architectures II**  
Format: **10 main slides, 10 minutes total, 2 students with about 5 minutes each**

The professor's requirements are binding:

- Start with a concise overview of the DeepSeek model family.
- Select the **latest and benchmark-strongest DeepSeek model available at generation time**.
- Keep the talk architecture-centered, not product- or hype-centered.
- Cite cleanly on slides and in the appendix.
- Include the **original model card** in the appendix.
- Main deck: 10 slides; appendix slides are allowed and do not count toward the 10.

## Source of Truth

- Treat old deck content as replaceable unless the user explicitly asks to preserve it.
- Keep final presentation content in `slides.md`.
- Use `VORTRAG.md` for speaker notes, timing, research notes, and Q&A preparation.
- Keep image assets under `public/` and reference them as `/images/...`.
- Preserve the frontmatter schema (`presentationInfo`, author metadata, chapter metadata), because layouts depend on it.

## Minimal Context Pack

Read in this order:

1. `README.md`
2. `docs/AI_AGENT_GUIDE.md`
3. `docs/COMPONENT_API.md`
4. `slides.md`

Only read component or layout source files when the API docs are insufficient.

## Research Rules

- When choosing or describing the "latest" or "best" DeepSeek model, verify current facts online before editing the final deck.
- Prefer primary sources: DeepSeek technical reports, official GitHub repositories, official Hugging Face model cards, arXiv papers, and benchmark tables from the model authors.
- Use secondary sources only for context, never as the sole source for a technical claim.
- Record source title, URL, publication date if available, and access date.
- Do not copy old benchmark numbers without checking them against the source.

## Slide Structure Contract

Target exactly 10 main slides:

1. Cover: topic, course, team
2. Model family overview: DeepSeek timeline and model taxonomy
3. Selected model and model-card summary
4. Baseline architecture: decoder-only Transformer and design lineage
5. Attention architecture: MLA or the selected model's current attention mechanism
6. Sparse compute architecture: DeepSeekMoE, routing, active parameters
7. Training and inference efficiency: FP8, pipeline/parallelism, MTP, or current equivalents
8. Reasoning/post-training architecture if relevant: RL, GRPO, distillation, or current successor
9. Benchmarks, limitations, and responsible use
10. Architecture takeaways and transition to Q&A

Appendix should include at minimum:

- Original model card or source-faithful model-card excerpt/screenshot with citation.
- Full bibliography.
- Optional backup slides for formulas, benchmark details, and model-family variants.

## Working Rules

- Reuse existing Slidev layouts and components from `docs/COMPONENT_API.md`.
- Do not invent new design primitives unless explicitly requested.
- Prefer concise, scannable slide content with one core message per slide.
- Keep the main talk suitable for 10 minutes; move detail-heavy material into the appendix.
- Write the deck in German unless the user asks otherwise.
- Avoid unsupported claims about training cost, benchmark superiority, licensing, or model size.

## Validation Workflow

- Run `npm run dev` for the main deck when the presentation content changes.
- Run `npm run dev:showcase` when component syntax is uncertain or examples need verification.
- Run `npm run lint` after changing components, layouts, composables, or setup files.
- For Markdown-only scaffolding changes, `npm run build` is an acceptable quick sanity check.

## Token-Efficiency Strategy

- First pass: edit only `slides.md`, `VORTRAG.md`, and documentation Markdown from the API docs.
- Second pass: open individual component/layout files only where needed.
- Avoid loading all Vue files for content-only generation.
