---
theme: default
highlighter: shiki
favicon: /images/favicon.png
title: DeepSeek V4 - Architektur
fonts:
  sans: 'Nunito Sans'
  serif: 'Nunito Sans'
  mono: 'Fira Code'
  weights: '400, 500, 600,700'
presentationInfo:
  title: 'DeepSeek V4'
  subtitle: 'Architektur im Kontext Transformer Architectures II'
  semester: 'Sommersemester 2026'
  authors:
    - name: 'Leon Licher'
      matrikelnummer: '1233258'
      email: 'll609274@fh-muenster.de'
      image: '/images/licher.jpg'
    - name: 'Daniel Fischer'
      matrikelnummer: '1255216'
      email: 'df094981@fh-muenster.de'
      image: '/images/fischer.jpg'
  chapters:
    - number: 1
      title: 'Modellfamilie'
    - number: 2
      title: 'Architektur'
    - number: 3
      title: 'Einordnung'
---
layout: cover

---
title: Modellübersicht
subtitle: DeepSeek-Familie im Überblick
chapter: 1
footnotes:
  - 'Release-Timeline: DeepSeek API Docs, News-Liste und V4 Preview Release, Zugriff 25.05.2026.'
---

<ModelTimeline
  :items="[
    { date: '2023', title: 'DeepSeek LLM', detail: 'Dense Transformer im Llama-Stil' },
    { date: '2024', title: 'DeepSeek-V2', detail: 'DeepSeekMoE + MLA eingeführt' },
    { date: 'Dez. 2024', title: 'DeepSeek-V3', detail: '671B/37B MoE, MLA, MTP, FP8' },
    { date: 'Jan. 2025', title: 'DeepSeek-R1', detail: 'Reasoning via RL (GRPO)' },
    { date: '2025', title: 'DeepSeek-V3.2', detail: 'DeepSeek Sparse Attention (DSA)' },
    { date: 'Apr. 2026', title: 'DeepSeek-V4', detail: 'Hybrid Attention, mHC, Muon', active: true }
  ]"
/>

---
title: Technologische Grundlagen
subtitle: Bausteine aus V2 und V3
chapter: 1
footnotes:
  - 'Quellen: DeepSeek-V2 arXiv:2405.04434; DeepSeek-V3 arXiv:2412.19437; DeepSeekMoE arXiv:2401.06066.'
---

<BulletedList title="Bisherige DeepSeek-Bausteine">
  <li>
    <b>Multi-Head Latent Attention (MLA)</b> (V2)
    <SubText>komprimiert den KV-Cache in eine latente Darstellung.</SubText>
  </li>
  <li>
    <b>DeepSeekMoE</b> (V2)
    <SubText>aktiviert pro Token nur wenige Experten statt das gesamte Netz.</SubText>
  </li>
  <li>
    <b>Multi-Token Prediction (MTP)</b> (V3)
    <SubText>sagt im Training mehrere kommende Tokens zugleich voraus.</SubText>
  </li>
  <li>
    <b>Auxiliary-Loss-Free Load Balancing</b> (V3)
    <SubText>balanciert Experten dynamisch über Router-Bias statt Straf-Loss.</SubText>
  </li>
</BulletedList>

---
title: Technische Fakten zu DeepSeek V4
subtitle: Pro, Flash und neue Architekturhebel
chapter: 1
footnotes:
  - 'Quelle: DeepSeek V4 Preview Release und Hugging Face Model Card deepseek-ai/DeepSeek-V4-Pro, Zugriff 25.05.2026.'
---

<BulletedList title="DeepSeek V4 in einem Blick">
  <li>
    <b>V4-Pro</b>: 1.6T Parameter, 49B aktiv pro Token
    <SubText>Flagship-Variante für Reasoning, Knowledge und Coding.</SubText>
  </li>
  <li>
    <b>V4-Flash</b>: 284B Parameter, 13B aktiv pro Token
    <SubText>effizientere Variante für Standardaufgaben.</SubText>
  </li>
  <li>
    <b>Gemeinsamkeiten</b>: 1M Kontext, MIT-Lizenz, FP4/FP8 Mixed Precision
    <SubText>beide bleiben Mixture-of-Experts-Modelle.</SubText>
  </li>
  <li>
    <b>Neue Hebel</b>: Hybrid Attention, mHC, Muon
    <SubText>V4 verbessert Kontextkosten, Signalfluss und Training.</SubText>
  </li>
</BulletedList>

---
title: Hybrid Attention
subtitle: 'Besonderheiten von DeepSeek: CSA und HCA'
chapter: 2
footnotes:
  - 'Quelle: DeepSeek-V4 Model Card, Hybrid Attention Architecture, Zugriff 25.05.2026.'
---

<Columns columns="1.35fr 0.9fr" gap="1rem">
  <div class="space-y-3">
    <BulletedList title="CSA">
      <li>Token-Blöcke komprimieren</li>
      <li>Indexer wählt Top-k Blöcke</li>
      <li>Sliding Window behält lokale Details</li>
    </BulletedList>
    <Text title="HCA">
      stärker komprimierter globaler Überblick für lange Sequenzen.
    </Text>
    <Text>
      <HighlightedText>Konsequenz:</HighlightedText>
      Bei 1M Kontext nur 27 % FLOPs und 10 % KV-Cache im Vergleich zu V3.2.
    </Text>
  </div>

  <Image
    src="/images/abbildungen/csa.png"
    alt="Compressed Sparse Attention"
    caption="Compressed Sparse Attention mit Lightning Indexer"
    maxWidth="100%"
    height="345px"
    source="DeepSeek-V4 Technical Report"
  />
</Columns>

---
title: Manifold-Constrained Hyper-Connections
subtitle: 'Besonderheiten von DeepSeek: mHC'
chapter: 2
footnotes:
  - 'Quelle: DeepSeek-V4 Model Card und Technical Report, mHC-Abschnitt.'
---

<Columns columns="1.2fr 0.85fr" gap="1rem">
  <div class="space-y-3">
    <NumberedList title="mHC in drei Schritten" size="sm">
      <li>Residual-Stream auf mehrere Pfade erweitern</li>
      <li>Pre-, Post- und Res-Mapping kontrollieren</li>
      <li>Projektion stabilisiert die Signalenergie</li>
    </NumberedList>
    <Text>
      <HighlightedText>Konsequenz:</HighlightedText>
      bessere Signalweitergabe über viele Layer ohne instabiles Training.
    </Text>
  </div>

  <Image
    src="/images/abbildungen/mHC.png"
    alt="Residual Connections, Hyper-Connections und mHC"
    caption="Von Residual Connections zu manifold-constrained Hyper-Connections"
    maxWidth="100%"
    height="350px"
    source="DeepSeek-V4 Technical Report"
  />
</Columns>

---
title: Muon und Post-Training
subtitle: 'Besonderheiten von DeepSeek: Optimizer und Konsolidierung'
chapter: 2
footnotes:
  - 'Quelle: DeepSeek-V4 Model Card; Muon-Algorithmus nach Keller Jordan, Zugriff 25.05.2026.'
---

<Columns columns="1fr 1fr" gap="1rem">
  <div class="space-y-3">
    <BulletedList title="Muon">
      <li>orthogonalisierte Updates für Hauptmatrizen</li>
      <li>AdamW bleibt für Spezialteile wie Embeddings</li>
      <li>Newton-Schulz beschleunigt die Orthogonalisierung</li>
    </BulletedList>
    <Text title="Post-Training">
      SFT + GRPO pro Domäne, danach On-Policy-Distillation in ein Modell.
    </Text>
    <Text>
      <HighlightedText>Konsequenz:</HighlightedText>
      stabileres Training und bessere Zusammenführung spezialisierter Experten.
    </Text>
  </div>

  <div>
    <Image
      src="/images/abbildungen/muon-algorithm.png"
      alt="Muon Algorithmus"
      caption="Muon Optimizer: orthogonalisierte Parameter-Updates"
      maxWidth="100%"
      height="190px"
      source="Keller Jordan, Muon"
    />
    <div class="mt-2">
      <Image
        src="/images/abbildungen/muon-benchmark.png"
        alt="Muon Benchmark"
        caption="Optimizer-Vergleich auf NanoGPT"
        maxWidth="100%"
        height="135px"
        source="Understanding Muon"
      />
    </div>
  </div>
</Columns>

---
title: Architekturübersicht
subtitle: V4-Pro vs. V4-Flash
chapter: 2
---

<figure class="m-0">
  <img
    src="/images/abbildungen/architecture_deepseekv4.png"
    alt="DeepSeek V4 Architecture Overview"
    class="w-full h-[365px] object-contain object-left"
  />
  <figcaption class="text-xs text-gray-500 italic mt-1">Quelle: DeepSeek-V4 Architekturdiagramm und Technical Report, Zugriff 25.05.2026.</figcaption>
</figure>

---
title: Benchmarks
subtitle: V4-Pro verbessert vor allem Knowledge und Agentic Coding
chapter: 3
footnotes:
  - 'Quelle: DeepSeek-V4 Hugging Face Model Card, Evaluation Results, Zugriff 25.05.2026.'
---

<Columns columns="1fr 1fr" gap="1rem">
  <Table
    :headers="['Base', 'V3.2', 'V4-Pro']"
    :rows="[
      ['MMLU', '87.8', '90.1'],
      ['MMLU-Pro', '65.5', '73.5'],
      ['C-Eval', '90.4', '93.1'],
      ['MultiLoKo', '38.7', '51.1']
    ]"
    :columnWidths="['42%', '29%', '29%']"
    accent="blue"
    size="sm"
  />

  <Table
    :headers="['HF Eval', 'V4-Pro']"
    :rows="[
      ['SWE-Bench Verified', '80.6'],
      ['SWE-Bench Pro', '55.4'],
      ['GPQA Diamond', '90.1'],
      ['Terminal-Bench 2', '67.9']
    ]"
    :columnWidths="['65%', '35%']"
    accent="gray"
    size="sm"
  />
</Columns>

<div class="mt-4">
  <ExampleBox title="Einordnung">
    Zahlen sind modell- und benchmark-spezifisch: Base, Instruct und Thinking Mode nicht vermischen.
  </ExampleBox>
</div>

---
title: Fazit
subtitle: Was DeepSeek V4 architektonisch zeigt
chapter: 3
---

<NumberedList title="Drei Takeaways">
  <li>
    1M-Kontext braucht selektive Attention.
    <SubText>CSA/HCA ersetzt teures Voll-Lesen durch Kompression und Retrieval.</SubText>
  </li>
  <li>
    Skalierung bleibt sparse.
    <SubText>MoE liefert hohe Kapazität bei wenigen aktiven Parametern.</SubText>
  </li>
  <li>
    Stabilität ist Teil der Architektur.
    <SubText>mHC, Muon und Post-Training sind keine Randdetails, sondern Enablement.</SubText>
  </li>
</NumberedList>

<div class="mt-4">
  <ExampleBox title="Kernsatz">
    DeepSeek V4 ist weniger „mehr Transformer“ als ein Umbau der Engpässe: Kontext, Routing, Signalfluss, Training.
  </ExampleBox>
</div>

---
title: Anhang A - Model Card
subtitle: Originalquelle und kompakter Auszug
chapter: 3
footnotes:
  - 'Originale Model Card: Hugging Face deepseek-ai/DeepSeek-V4-Pro, Zugriff 25.05.2026.'
---

<Table
  :headers="['Feld', 'DeepSeek-V4-Pro']"
  :rows="[
    ['Original', 'https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro'],
    ['Report', 'DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence'],
    ['Modellfamilie', 'V4-Pro und V4-Flash, Mixture-of-Experts'],
    ['Parameter', '1.6T total, 49B aktiv'],
    ['Kontext', '1M Tokens'],
    ['Precision', 'FP4 + FP8 Mixed'],
    ['Lizenz', 'MIT License'],
    ['Nutzung', 'Chat, Reasoning, Coding, Agentic Workflows']
  ]"
  :columnWidths="['28%', '72%']"
  accent="blue"
  size="sm"
/>

---
title: Anhang B - Quellen
subtitle: Primärquellen und verwendete Abbildungen
chapter: 3
---

<CitationTable
  title="Quellen"
  :citations="[
    { id: 'Q1', text: 'DeepSeek API Docs: DeepSeek V4 Preview Release, 24.04.2026. https://api-docs.deepseek.com/news/news260424. Zugriff: 25.05.2026.' },
    { id: 'Q2', text: 'DeepSeek-AI: DeepSeek-V4-Pro Model Card. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro. Zugriff: 25.05.2026.' },
    { id: 'Q3', text: 'DeepSeek-AI: DeepSeek-V4 Technical Report PDF. https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/blob/main/DeepSeek_V4.pdf. Zugriff: 25.05.2026.' },
    { id: 'Q4', text: 'DeepSeek-AI: DeepSeek-V2, arXiv:2405.04434; DeepSeek-V3, arXiv:2412.19437; DeepSeekMoE, arXiv:2401.06066.' },
    { id: 'Q5', text: 'Keller Jordan: Muon optimizer notes. https://kellerjordan.github.io/posts/muon/. Zugriff: 25.05.2026.' }
  ]"
  idWidth="55px"
/>
