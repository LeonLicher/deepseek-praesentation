# DeepSeek Presentation

Slidev project for a German university presentation in **Machine and Deep Learning II**.

The previous Booky-specific deck content is legacy. The reusable Slidev component/layout system remains useful, but the presentation is now about **DeepSeek in the context of Transformer Architectures II**.

## Assignment

- Topic: DeepSeek model family / model collection
- Focus: architecture, especially Transformer modifications
- Time: 10 minutes total
- Team: 2 students, about 5 minutes each
- Length: 10 main slides, appendix allowed
- Required: clean citations
- Required: original model card in the appendix
- Required: begin with a model overview
- Required: use the latest and benchmark-strongest DeepSeek model available when the final deck is generated

## Repository Map

- `slides.md` - main Slidev deck; final presentation content belongs here.
- `VORTRAG.md` - speaker notes, timing, research checklist, backup Q&A.
- `docs/AI_AGENT_GUIDE.md` - workflow for AI agents creating the deck.
- `docs/COMPONENT_API.md` - compact API reference for available layouts/components.
- `slides.showcase.md` - runnable component syntax reference.
- `public/` - images and other static assets referenced from slides.
- `components/`, `layouts/`, `composables/`, `setup/` - reusable Slidev system.

## Working Principle

Do not trust the old deck as factual source material. Before generating the final presentation, verify the selected DeepSeek model, benchmark claims, architecture details, license, and model-card content from primary sources.

Preferred source order:

1. Official DeepSeek technical reports and papers
2. Official DeepSeek GitHub repositories
3. Official DeepSeek Hugging Face model cards
4. arXiv papers cited by the reports
5. Secondary sources only for context

## Target Deck Shape

The main deck should contain exactly 10 slides:

1. Cover
2. DeepSeek model family overview
3. Selected latest/best model and model-card summary
4. Decoder-only Transformer baseline
5. Attention mechanism and context efficiency
6. MoE/sparse-compute architecture
7. Training and inference efficiency
8. Reasoning or post-training architecture
9. Benchmarks, limitations, and responsible use
10. Key architecture takeaways

The appendix should include the original model card, full bibliography, and optional backup material.

## Local Usage

```bash
npm install
npm run dev
```

For component examples:

```bash
npm run dev:showcase
```

For a quick static check:

```bash
npm run build
```

Run lint after changing Vue, JS, TS, layout, component, or setup files:

```bash
npm run lint
```

## AI Agent Workflow

For efficient deck generation, provide agents with:

1. `README.md`
2. `docs/AI_AGENT_GUIDE.md`
3. `docs/COMPONENT_API.md`
4. `slides.md`

Then ask them to research the current DeepSeek model landscape, choose the correct target model with citations, and replace `slides.md` with the final 10-slide deck plus appendix.
