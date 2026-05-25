---
theme: default
highlighter: shiki
favicon: /images/favicon.png
title: DeepSeek - Architektur
fonts:
  sans: 'Nunito Sans'
  serif: 'Nunito Sans'
  mono: 'Fira Code'
  weights: '400, 500, 600,700'
presentationInfo:
  title: 'DeepSeek - Architektur'
  subtitle: 'Transformer Architectures II'
  semester: 'Sommersemester 2026'
  authors:
    - name: 'TODO Student 1'
      matrikelnummer: 'TODO'
      email: 'TODO'
    - name: 'TODO Student 2'
      matrikelnummer: 'TODO'
      email: 'TODO'
  chapters:
    - number: 1
      title: 'Modellfamilie und Auswahl'
    - number: 2
      title: 'Architektur'
    - number: 3
      title: 'Einordnung'
---
layout: cover

---
title: DeepSeek-Modellfamilie
subtitle: Überblick vor der Architekturentscheidung
chapter: 1
---

<Todo text="Finale Folie: DeepSeek-Modellfamilie als kompakte Timeline/Taxonomie darstellen. Nur verifizierte Releases, Daten, Modellgrößen und Modelltypen verwenden." />

<Table
  :headers="['Modell', 'Release', 'Typ', 'Architekturbeitrag']"
  :rows="[
    ['TODO', 'TODO', 'TODO', 'TODO'],
    ['TODO', 'TODO', 'TODO', 'TODO'],
    ['TODO', 'TODO', 'TODO', 'TODO']
  ]"
  :columnWidths="['22%', '18%', '22%', '38%']"
  accent="gray"
  size="sm"
/>

<Footnote text="Quellen vor finaler Erstellung prüfen: offizielle DeepSeek Reports, GitHub, Hugging Face Model Cards." />

---
title: Ausgewähltes Modell
subtitle: Latest und benchmark-stärkstes DeepSeek-Modell
chapter: 1
---

<Columns columns="1fr 1fr" gap="1.25rem">
  <DefinitionBox title="Auswahlregel">
    Vor der finalen Erstellung online prüfen: Welches DeepSeek-Modell ist aktuell das neueste, welches ist in den relevanten Benchmarks am stärksten, und warum wird genau dieses Modell im Vortrag fokussiert?
  </DefinitionBox>

  <ExampleBox title="Model-Card-Summary">
    Diese Folie fasst die offizielle Model Card nur knapp zusammen. Die originale Model Card gehört unverändert oder source-faithful in den Anhang.
  </ExampleBox>
</Columns>

<Todo text="Finale Folie: Modellname, Release, Parameter, aktive Parameter, Kontextlänge, Lizenz, Training/Post-Training, Intended Use, Limitations, zentrale Benchmarks." />

---
title: Transformer-Basis
subtitle: Was DeepSeek vom decoder-only Transformer übernimmt
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.25rem">
  <BulletedList title="Baseline">
    <li>Decoder-only Transformer als autoregressives Sprachmodell</li>
    <li>Self-Attention, Residuals, Normalisierung, Feed-Forward-Blöcke</li>
    <li>Position Encoding und Tokenizer nur mit Quelle nennen</li>
  </BulletedList>

  <DefinitionBox title="Architekturfrage">
    Welche Teile bleiben klassischer Transformer, und welche Teile verändert DeepSeek, um Speicher, Rechenkosten oder Reasoning-Leistung zu verbessern?
  </DefinitionBox>
</Columns>

<Footnote text="Vaswani et al. (2017) plus offizieller DeepSeek-Report des ausgewählten Modells zitieren." />

---
title: Attention und Kontext
subtitle: KV-Cache, lange Kontexte und DeepSeek-spezifische Lösung
chapter: 2
---

<Todo text="Finale Folie: Attention-Mechanismus des ausgewählten Modells erklären, z. B. MLA, KV-Cache-Kompression, RoPE-Variante oder aktueller Nachfolger." />

<Columns columns="1fr 1fr" gap="1.25rem">
  <DefinitionBox title="Problem">
    Bei langen Kontexten wird der KV-Cache häufig zum Inferenz-Bottleneck.
  </DefinitionBox>

  <ExampleBox title="Architekturbeitrag">
    Zeige, welche Projektionen, Cache-Repräsentationen oder Attention-Varianten DeepSeek nutzt und welcher messbare Effekt berichtet wird.
  </ExampleBox>
</Columns>

---
title: Sparse Compute und MoE
subtitle: Expertenrouting statt alle Parameter pro Token
chapter: 2
---

<Todo text="Finale Folie: DeepSeekMoE oder aktuelle sparse-compute Architektur erklären: Expertenzahl, Routing, shared/routed experts, aktive Parameter, Load Balancing." />

<Table
  :headers="['Aspekt', 'Final zu recherchieren']"
  :rows="[
    ['Gesamtparameter', 'TODO'],
    ['Aktive Parameter pro Token', 'TODO'],
    ['Experten pro Layer', 'TODO'],
    ['Routing/Load Balancing', 'TODO']
  ]"
  :columnWidths="['35%', '65%']"
  accent="blue"
  size="sm"
/>

---
title: Training und Inferenz
subtitle: Effizienz als Architektur- und Systemdesign
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.25rem">
  <BulletedList title="Zu prüfen">
    <li>Precision und Quantisierung im Training</li>
    <li>Parallelismus, Pipeline-Design, Expert-Kommunikation</li>
    <li>Multi-Token Prediction oder aktuelle Inferenzbeschleunigung</li>
  </BulletedList>

  <ExampleBox title="Kernaussage">
    Effizienz nur mit Zahlen aus Primärquellen belegen: GPU-Stunden, Trainingskosten, Durchsatz, Speicherersparnis oder Acceptance Rate.
  </ExampleBox>
</Columns>

---
title: Reasoning und Post-Training
subtitle: Wenn das Zielmodell Reasoning-Fähigkeiten betont
chapter: 2
---

<Todo text="Finale Folie: Post-Training des ausgewählten Modells erklären, z. B. RL, GRPO, Cold-Start-Daten, Rejection Sampling, Distillation oder aktueller Nachfolger." />

<DefinitionBox title="Abgrenzung">
  Klar trennen zwischen Basisarchitektur, Pre-Training, Post-Training und Distillation. Nicht jede Benchmarkverbesserung ist eine neue Transformer-Architektur.
</DefinitionBox>

---
title: Benchmarks und Grenzen
subtitle: Was die Zahlen zeigen und was sie nicht zeigen
chapter: 3
---

<Todo text="Finale Folie: Nur verifizierte Benchmarkwerte aus Primärquellen verwenden. Vergleichsmodelle, Benchmarkversion und Datum nennen." />

<Table
  :headers="['Benchmark', 'DeepSeek-Modell', 'Vergleich', 'Quelle']"
  :rows="[
    ['TODO', 'TODO', 'TODO', 'TODO'],
    ['TODO', 'TODO', 'TODO', 'TODO'],
    ['TODO', 'TODO', 'TODO', 'TODO']
  ]"
  :columnWidths="['24%', '24%', '24%', '28%']"
  accent="gray"
  size="sm"
/>

---
title: Architektur-Takeaways
subtitle: Drei Punkte für Transformer Architectures II
chapter: 3
---

<NumberedList title="Final zu formulieren">
  <li>
    DeepSeek verändert zentrale Transformer-Bottlenecks gezielt.
    <SubText>Attention/KV-Cache, sparse FFN/MoE oder aktuelle Architekturentscheidung.</SubText>
  </li>
  <li>
    Effizienz entsteht aus Architektur plus Systemdesign.
    <SubText>Training, Parallelismus, Precision und Inferenz müssen zusammen betrachtet werden.</SubText>
  </li>
  <li>
    Benchmarks müssen in Modellversion und Trainingsverfahren eingeordnet werden.
    <SubText>Base Model, Chat Model, Reasoning Model und Distill Model nicht vermischen.</SubText>
  </li>
</NumberedList>

---
title: Anhang A - Original Model Card
subtitle: Source-faithful appendix, not a paraphrase
chapter: 3
---

<Todo text="Hier die originale Model Card des ausgewählten Modells einfügen: als Screenshot, offizieller Auszug oder anderweitig source-faithful. Quelle, URL und Zugriffsdatum nennen." />

---
title: Anhang B - Quellen
subtitle: Vollständige Bibliografie
chapter: 3
---

<CitationTable
  title="Quellen"
  :citations="[
    { id: 'TODO', text: 'DeepSeek official model card. URL. Zugriff: TODO.' },
    { id: 'TODO', text: 'DeepSeek technical report. arXiv/URL. Zugriff: TODO.' },
    { id: 'TODO', text: 'Transformer reference paper oder relevante Architekturquelle. URL/DOI. Zugriff: TODO.' }
  ]"
  idWidth="70px"
/>
