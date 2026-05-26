---
theme: default
highlighter: shiki
favicon: /images/favicon.png
title: DeepSeek
fonts:
  sans: 'Nunito Sans'
  serif: 'Nunito Sans'
  mono: 'Fira Code'
  weights: '400, 500, 600,700'
presentationInfo:
  title: 'DeepSeek'
  subtitle: 'Architektur und Besonderheiten'
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
  - 'Release-Timeline: DeepSeek API Docs, News-Liste und V4 Preview Release,
    Zugriff 25.05.2026.'
---

<!-- Architektur: Reiner Dense Transformer im Llama-Sti -->

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

<!--
Start auf Basis von Llama Modell 
eigener Datensatz
-->

---
title: Technologische Grundlagen
subtitle: Bausteine aus V2 und V3
chapter: 1
footnotes:
  - 'Quellen: DeepSeek-V2 arXiv:2405.04434; DeepSeek-V3 arXiv:2412.19437;
    DeepSeekMoE arXiv:2401.06066.'
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

<!--
Multi Head Latent Attention
Komprimieren des Arbeitsspeichers, des Kontext des Modells 
93% weniger Speicherbedarf
Analogie Komissar legt 99+1 Blätter Schreibtisch

Multi Token Prediction
Mehrere Token werden auf ein mal vorhergesagt. 
Parallel ein Strang SingleToken Prediction und MTP
Statisch Sinn = behalten -> Effizenz
-->

---
title: Technische Fakten zu DeepSeek V4
subtitle: Pro, Flash und neue Architekturhebel
chapter: 1
footnotes:
  - 'Quelle: DeepSeek V4 Preview Release und offizielle DeepSeek V4 Model Card
    PDF, Zugriff 25.05.2026.'
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

<!--
Löwenanteil des Speichers in FP4 abgelegt
-->

---
title: Hybrid Attention
subtitle: 'Besonderheiten von DeepSeek: CSA und HCA'
chapter: 2
footnotes:
  - 'Quelle: DeepSeek-V4 Model Card, Hybrid Attention Architecture, Zugriff
    25.05.2026.'
---

<Columns columns="1.35fr 0.9fr" gap="1rem">
  <div class="space-y-3">
    <BulletedList title="CSA (Compressed Sparse Attention)">
      <li>Token-Blöcke komprimieren</li>
      <li>Indexer wählt Top-k Blöcke</li>
      <li>Sliding Window behält lokale Details</li>
    </BulletedList>
    <Text title="HCA (Heavily Compressed Attention)">
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
    source="Q3"
  />
</Columns>

<!--
Kontext steigt normal quadratisch 100*100 Wörter
-->

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
    source="Q3"
  />
</Columns>

<!--
c) Mathematik zur Stabilisierung der Matrix
vanishing/ exploding Gradient

Lösung mit Hyper-Connections
-->

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

  <div class="flex flex-col items-center">
    <Image
      src="/images/abbildungen/muon-algorithm.png"
      alt="Muon Algorithmus"
      caption="Muon Optimizer: orthogonalisierte Parameter-Updates"
      maxWidth="100%"
      height="190px"
      source="Q5"
      captionAlign="center"
    />
    <div class="mt-2 flex justify-center">
      <Image
        src="/images/abbildungen/muon-benchmark.png"
        alt="Muon Benchmark"
        caption="Optimizer-Vergleich auf NanoGPT"
        maxWidth="100%"
        height="135px"
        source="Q6"
        captionAlign="center"
      />
    </div>
  </div>
</Columns>

---
title: Architekturübersicht
subtitle: V4-Pro vs. V4-Flash
chapter: 2
---

<figure class="m-0 flex flex-col items-center">
  <img
    src="/images/abbildungen/architecture_deepseekv4.png"
    alt="DeepSeek V4 Architecture Overview"
    class="w-full h-[365px] object-contain object-center"
  />
  <figcaption class="text-xs text-gray-500 italic mt-1 text-center">Quelle: Q3.</figcaption>
</figure>

---
title: Benchmarks
subtitle: Übersicht der Benchmarks
chapter: 3
footnotes:
  - 'Quelle: Offizielle DeepSeek V4 Model Card PDF, Evaluation Results, Zugriff 25.05.2026.'
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
  <ExampleBox title="Interpretationshinweis">
    Die Werte beziehen sich auf spezifische Modellvarianten und Evaluationsmodi; Base-, Instruct- und Thinking-Ergebnisse sind getrennt zu interpretieren.
  </ExampleBox>
</div>

---
title: Fazit
subtitle: Zusammenfassung
chapter: 3
---

<NumberedList title="Architekturelle Schlussfolgerungen">
  <li>
    Langer Kontext erfordert selektive Attention.
    <SubText>CSA/HCA reduzieren Berechnung und KV-Cache durch Sequenzkompression und blockweise Auswahl relevanter Inhalte.</SubText>
  </li>
  <li>
    Sparse MoE entkoppelt Modellkapazität vom aktiven Rechenaufwand.
    <SubText>Pro Token wird nur ein Teil der Experten aktiviert; die Gesamtparameterzahl steigt ohne proportionalen Inferenzaufwand.</SubText>
  </li>
  <li>
    Trainingsstabilität wird architektonisch adressiert.
    <SubText>mHC, Muon und Post-Training stabilisieren Signalfluss, Optimierung und die Zusammenführung spezialisierter Fähigkeiten.</SubText>
  </li>
</NumberedList>

---
title: Anhang A - Quellen
subtitle: Primärquellen und verwendete Abbildungen
chapter: 3
---

<CitationTable
  :citations="[
    { id: 'Q1', text: 'DeepSeek API Docs: DeepSeek V4 Preview Release, 24.04.2026. https://api-docs.deepseek.com/news/news260424. Zugriff: 25.05.2026.' },
    { id: 'Q2', text: 'DeepSeek: DeepSeek V4 Model Card PDF. https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026. Lokale Kopie: public/model-card/deepseek-V4-model-card-EN.pdf.' },
    { id: 'Q3', text: 'DeepSeek V4 architecture deep dive. https://boringbot.substack.com/p/deepseek-v4-architecture-deep-dive?trk=public_post_comment-text. Zugriff: 26.05.2026.' },
    { id: 'Q4', text: 'DeepSeek-AI: DeepSeek-V2, arXiv:2405.04434; DeepSeek-V3, arXiv:2412.19437; DeepSeekMoE, arXiv:2401.06066.' },
    { id: 'Q5', text: 'Keller Jordan: Muon optimizer notes. https://kellerjordan.github.io/posts/muon/. Zugriff: 25.05.2026.' },
    { id: 'Q6', text: 'Laker Newhouse: Understanding Muon, 2025. https://www.lakernewhouse.com/muon/. Zugriff: 25.05.2026.' }
  ]"
  idWidth="55px"
/>

---
title: Anhang B - Abkürzungsverzeichnis
subtitle: Architektur- und Benchmark-Kürzel
chapter: 3
---

<Columns columns="1fr 1fr" gap="1rem">
  <Table
    :headers="['Kürzel', 'Bedeutung']"
    :rows="[
      ['CSA', 'Compressed Sparse Attention'],
      ['DSA', 'DeepSeek Sparse Attention'],
      ['FLOPs', 'Floating Point Operations'],
      ['FP4/FP8', '4-/8-Bit Floating Point'],
      ['GRPO', 'Group Relative Policy Optimization'],
      ['HCA', 'Heavily Compressed Attention'],
      ['KV-Cache', 'Key-Value-Cache'],
      ['mHC', 'Manifold-Constrained Hyper-Connections']
    ]"
    :columnWidths="['30%', '70%']"
    accent="blue"
    size="sm"
  />

  <Table
    :headers="['Kürzel', 'Bedeutung']"
    :rows="[
      ['GPQA', 'Graduate-Level Google-Proof Q&A'],
      ['MMLU', 'Massive Multitask Language Understanding'],
      ['MIT', 'MIT License'],
      ['MLA', 'Multi-Head Latent Attention'],
      ['MoE', 'Mixture of Experts'],
      ['MTP', 'Multi-Token Prediction'],
      ['RL', 'Reinforcement Learning'],
      ['SFT', 'Supervised Fine-Tuning'],
      ['SWE-Bench', 'Software Engineering Benchmark']
    ]"
    :columnWidths="['30%', '70%']"
    accent="blue"
    size="sm"
  />
</Columns>

---
title: Anhang C.1 - Model Card
subtitle: Originalseite 1/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-1.png"
  alt="Original DeepSeek V4 Model Card Seite 1"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.2 - Model Card
subtitle: Originalseite 2/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-2.png"
  alt="Original DeepSeek V4 Model Card Seite 2"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.3 - Model Card
subtitle: Originalseite 3/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-3.png"
  alt="Original DeepSeek V4 Model Card Seite 3"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.4 - Model Card
subtitle: Originalseite 4/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-4.png"
  alt="Original DeepSeek V4 Model Card Seite 4"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.5 - Model Card
subtitle: Originalseite 5/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-5.png"
  alt="Original DeepSeek V4 Model Card Seite 5"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.6 - Model Card
subtitle: Originalseite 6/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-6.png"
  alt="Original DeepSeek V4 Model Card Seite 6"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.7 - Model Card
subtitle: Originalseite 7/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-7.png"
  alt="Original DeepSeek V4 Model Card Seite 7"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>

---
title: Anhang C.8 - Model Card
subtitle: Originalseite 8/8
chapter: 3
footnotes:
  - 'Original: DeepSeek V4 Model Card PDF, https://fe-static.deepseek.com/chat/transparency/deepseek-V4-model-card-EN.pdf. Zugriff: 25.05.2026.'
---

<img
  src="/model-card/pages/deepseek-v4-model-card-8.png"
  alt="Original DeepSeek V4 Model Card Seite 8"
  class="mx-auto h-[455px] max-w-full rounded border border-gray-200 bg-white object-contain"
/>
