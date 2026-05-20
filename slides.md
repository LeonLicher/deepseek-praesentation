---
theme: default
highlighter: shiki
favicon: /images/favicon.png
title: DeepSeek LLM - Architektur
fonts:
  sans: 'Nunito Sans'
  serif: 'Nunito Sans'
  mono: 'Fira Code'
  weights: '400, 500, 600,700'
presentationInfo:
  title: 'DeepSeek LLM - Architektur'
  subtitle: 'Vom V1 bis R1 - Evolution einer offenen Modellfamilie'
  semester: 'Sommersemester 2026'
  authors:
    - name: 'Leon Licher'
      matrikelnummer: '1233258'
      email: 'll609274@fh-muenster.de'
    - name: 'Daniel Fischer'
      matrikelnummer: '1255216'
      email: 'df094981@fh-muenster.de'
  chapters:
    - number: 1
      title: 'Foundation & Modellfamilie'
    - number: 2
      title: 'Key Innovations'
    - number: 3
      title: 'Zusammenfassung'
---
layout: cover

---
title: Agenda
subtitle: Vortragsaufbau (10 Minuten)
---

<Outline>
  <OutlineItem :number="1" :active="true">Foundation & Modellfamilie - Leon Licher</OutlineItem>
  <OutlineItem :number="2">Key Innovations: MLA, MoE, MTP, R1 - Daniel Fischer</OutlineItem>
  <OutlineItem :number="3">Zusammenfassung</OutlineItem>
</Outline>

<SubText>Modul Deep Learning (MDL 2) · Sommersemester 2026 · Prof. Dr. Wolfgang Wicht</SubText>

---
title: Vortragende
subtitle: Modul Deep Learning - MDL 2
---

<div class="grid grid-cols-2 gap-x-12 mt-8 max-w-2xl mx-auto">

  <div class="flex flex-col items-center text-center">
    <img src="/images/licher.jpg" class="w-32 h-32 object-cover object-top rounded-full mb-3" />
    <p class="font-semibold text-gray-800 text-lg m-0">Leon Licher</p>
    <p class="text-sm text-gray-500 m-0">1233258</p>
    <p class="text-xs text-gray-400 mt-2">Foundation & Modellfamilie</p>
  </div>

  <div class="flex flex-col items-center text-center">
    <img src="/images/fischer.jpg" class="w-32 h-32 object-cover object-top rounded-full mb-3" />
    <p class="font-semibold text-gray-800 text-lg m-0">Daniel Fischer</p>
    <p class="text-sm text-gray-500 m-0">1255216</p>
    <p class="text-xs text-gray-400 mt-2">Key Innovations</p>
  </div>

</div>

---
layout: chapter-intro
chapter: 1
---
---
title: Was ist DeepSeek?
subtitle: Kontext, Mission und Zeitleiste
chapter: 1
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <BulletedList title="DeepSeek im Überblick">
    <li>Chinesisches KI-Labor, gegründet <b>Juli 2023</b> (Spin-off des Hedgefonds High-Flyer)</li>
    <li>Open-Weight-Strategie: alle Modelle frei verfügbar (MIT/Modell-Lizenz)</li>
    <li>Fokus auf <HighlightedText>effiziente Architekturen</HighlightedText> statt reiner Skalierung</li>
    <li>V3-Training: nur <b>2.788k H800-GPU-Stunden</b> ≈ 5,6 Mio. USD</li>
    <li>Performance vergleichbar zu GPT-4o / Claude-3.5-Sonnet (Stand 12/2024)</li>
  </BulletedList>

  <div>
    <DefinitionBox title="Forschungsmission" source="DeepSeek-V3 Technical Report (2024)">
      „We aim to push the boundaries of open-source models, particularly in <b>economical training</b> and <b>efficient inference</b>, while maintaining strong model capabilities."
    </DefinitionBox>
    <div class="mt-3">
      <ExampleBox title="Bedeutung" source="MDL 2 Kontext">
        DeepSeek demonstriert, dass <b>architektonische Innovation</b> Recheneffizienz und Modellqualität gleichzeitig steigern kann - ohne proprietäre Hardware-Vorteile.
      </ExampleBox>
    </div>
  </div>

</Columns>

<Footnote text="Quellen: DeepSeek-LLM (arXiv:2401.02954), DeepSeek-V2 (arXiv:2405.04434), DeepSeek-V3 (arXiv:2412.19437), DeepSeek-R1 (arXiv:2501.12948)" />

---
title: Modellfamilie - Evolution V1 → R1
subtitle: Zeitleiste und Kennzahlen
chapter: 1
---

<Table
  :headers="['Modell', 'Datum', 'Parameter (gesamt)', 'aktiv pro Token', 'Kontext', 'Schlüsselbeitrag']"
  :rows="[
    ['DeepSeek-LLM V1', '01/2024', '7B & 67B (dense)', 'alle', '4K', 'Open-source Baseline (LLaMA-Stil)'],
    ['DeepSeek-V2', '05/2024', '236B (MoE)', '21B', '128K', 'Multi-Head Latent Attention (MLA)'],
    ['DeepSeek-V2.5', '09/2024', '236B (MoE)', '21B', '128K', 'Code & Chat zusammengeführt'],
    ['DeepSeek-V3', '12/2024', '671B (MoE)', '37B', '128K', 'MTP + FP8 + aux-loss-free LB'],
    ['DeepSeek-R1-Zero', '01/2025', '671B (MoE)', '37B', '128K', 'Pure RL - keine SFT'],
    ['DeepSeek-R1', '01/2025', '671B (MoE)', '37B', '128K', 'Reasoning (Cold-start + RL)'],
    ['R1-Distill', '01/2025', '1,5B – 70B (dense)', 'alle', '128K', 'R1-Reasoning in kleine Modelle']
  ]"
  accent="blue"
  :highlights="[2, 4, 6]"
  :columnWidths="['18%', '10%', '18%', '12%', '10%', '32%']"
  size="sm"
  caption="MoE = Mixture of Experts. Aktive Parameter = die je Token tatsächlich berechneten Gewichte."
/>

<div class="mt-3">
  <Text>
    Roter Faden: <HighlightedText>jedes Modell</HighlightedText> bringt eine spezifische architektonische Innovation -
    keine reine Parameterskalierung wie bei GPT-3 → GPT-4.
  </Text>
</div>

---
title: Basisarchitektur
subtitle: Decoder-only Transformer wie GPT und Llama
chapter: 1
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Architektur-Stammbaum" source="DeepSeek-LLM (2024), Kap. 2">
      „We largely follow the design of LLaMA - adopting a Pre-Norm structure with RMSNorm, SwiGLU activation, and Rotary Position Embeddings."
    </DefinitionBox>
    <div class="mt-3">
      <BulletedList title="Baseline-Komponenten (V1, dense)">
        <li><b>Pre-LN + RMSNorm</b> - stabileres Training als Post-LN</li>
        <li><b>SwiGLU</b> Activation im Feed-Forward-Block</li>
        <li><b>RoPE</b> (Rotary Positional Embedding) statt absoluter Positionen</li>
        <li><b>BPE-Tokenizer</b> (Byte-Pair Encoding), 100k Vocab</li>
        <li><b>Grouped-Query Attention (GQA)</b> beim 67B-Modell</li>
      </BulletedList>
    </div>
  </div>

  <div>
    <ExampleBox title="Was bleibt vom klassischen Transformer?" source="Vaswani et al. (2017)">
      Self-Attention + FFN-Blöcke, Residual-Verbindungen, kausales Masking - der Grundbauplan ist seit 2017 unverändert.
    </ExampleBox>
    <div class="mt-3">
      <ExampleBox title="Was ändert DeepSeek ab V2?">
        Die <HighlightedText>Attention-Mechanik</HighlightedText> und der <HighlightedText>FFN-Block</HighlightedText> werden grundlegend umgebaut - siehe Teil 2.
      </ExampleBox>
    </div>
    <div class="mt-3">
      <Quotebox source="DeepSeek-V2 Tech Report">
        „Two key innovations: <b>MLA</b> for efficient inference and <b>DeepSeekMoE</b> for economical training."
      </Quotebox>
    </div>
  </div>

</Columns>

---
layout: chapter-intro
chapter: 2
---
---
title: Multi-Head Latent Attention (MLA)
subtitle: DeepSeek-V2 - KV-Cache-Kompression über latenten Vektor
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Problem: KV-Cache" source="DeepSeek-V2 (2024)">
      Bei klassischer <b>Multi-Head Attention (MHA)</b> muss für jedes Token in der Sequenz und jeden Head ein voller K/V-Vektor zwischengespeichert werden - Speicher wächst linear mit Kontextlänge × Heads.
    </DefinitionBox>
    <div class="mt-3">
      <BulletedList title="Evolution der Attention-Varianten">
        <li><b>MHA</b>: jeder Head hat eigene K, V (großer Cache)</li>
        <li><b>MQA</b>: alle Heads teilen ein K, V (klein, Qualitätsverlust)</li>
        <li><b>GQA</b> (Llama): Gruppen teilen K, V (Kompromiss)</li>
        <li><HighlightedText>MLA</HighlightedText>: K, V werden in einen <b>latenten Vektor c</b> komprimiert</li>
      </BulletedList>
    </div>
  </div>

  <div>
    <DefinitionBox title="MLA-Prinzip">
      Down-Projektion: c<sub>KV</sub> = W<sup>DKV</sup> · h<sub>t</sub><br/>
      Up-Projektion zur Inferenzzeit: K = W<sup>UK</sup> · c<sub>KV</sub>, V = W<sup>UV</sup> · c<sub>KV</sub><br/>
      → Cache nur c<sub>KV</sub> (dim ≈ 4 · d<sub>head</sub>) statt vollem K, V
    </DefinitionBox>
    <div class="mt-3">
      <ExampleBox title="Ergebnis" source="V2 Tech Report Tab. 1">
        KV-Cache <HighlightedText>–93,3 %</HighlightedText> vs. MHA bei <b>gleicher oder besserer Qualität</b>. Maximaler Durchsatz <b>5,76× höher</b> als V1-67B.
      </ExampleBox>
    </div>
    <div class="mt-3">
      <Footnote text="Zusätzlich: Decoupled RoPE - Positionsinformation in separatem Vektor, da RoPE nicht direkt auf komprimierte Latents anwendbar." />
    </div>
  </div>

</Columns>

---
title: DeepSeekMoE
subtitle: Fine-Grained Expert Segmentation + Shared Experts
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Standard-MoE (z.B. Mixtral)" source="Shazeer et al. (2017)">
      FFN-Block wird durch <b>N Experten</b> ersetzt (z.B. N=8). Ein Router wählt für jedes Token die <b>Top-k</b> Experten (k=2). Restliche Experten werden übersprungen.
    </DefinitionBox>
    <div class="mt-3">
      <BulletedList title="Zwei Innovationen von DeepSeekMoE">
        <li><HighlightedText>Fine-grained segmentation</HighlightedText>: viele kleine Experten statt wenige große<br/>
          <SubText>V3: 256 routed experts, top-8 aktiv (statt 8 × top-2)</SubText></li>
        <li><HighlightedText>Shared experts</HighlightedText>: 1 immer-aktiver Expert pro Layer<br/>
          <SubText>Erfasst gemeinsames Wissen, vermeidet Redundanz bei Routed Experts</SubText></li>
      </BulletedList>
    </div>
  </div>

  <div>
    <ExampleBox title="V3-Konfiguration" source="DeepSeek-V3 Tech Report">
      Pro Layer: <b>1 shared + 256 routed</b> Experten<br/>
      Pro Token aktiv: <b>1 shared + 8 routed = 9</b> Experten<br/>
      → 37B von 671B Parametern (5,5 %) aktiv
    </ExampleBox>
    <div class="mt-3">
      <ExampleBox title="Auxiliary-loss-free Load Balancing" source="V3 Innovation">
        Klassische MoE braucht einen <b>Hilfsverlust</b>, um Experten gleichmäßig auszulasten - verschlechtert die Modellqualität.<br/>
        V3 ersetzt dies durch einen <HighlightedText>dynamischen Bias</HighlightedText> pro Expert: keine Qualitätseinbußen.
      </ExampleBox>
    </div>
  </div>

</Columns>

---
title: Multi-Token Prediction (MTP)
subtitle: DeepSeek-V3 - Vorhersage mehrerer Tokens parallel
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Klassisches LM-Training">
      An jeder Position <i>t</i> sagt das Modell genau <b>ein</b> Token (t+1) voraus.<br/>
      Cross-Entropy-Loss nur über next-token prediction.
    </DefinitionBox>
    <div class="mt-3">
      <DefinitionBox title="MTP-Prinzip" source="DeepSeek-V3 (2024)">
        An jeder Position werden zusätzlich <b>D weitere Tokens</b> (z.B. D=1, also t+2) vorhergesagt - durch sequenzielle MTP-Module, die auf dem Hauptmodell aufsetzen.
      </DefinitionBox>
    </div>
  </div>

  <BulletedList title="Vorteile">
    <li><b>Dichteres Training-Signal</b>: jedes Token liefert mehrere Lernsignale</li>
    <li>Modell sieht <HighlightedText>langfristige Abhängigkeiten</HighlightedText> früher im Training</li>
    <li><b>Speculative Decoding</b> bei Inferenz: MTP-Modul schlägt Token t+2 vor, Hauptmodell verifiziert</li>
    <li>V3-Berichteter Speedup: <HighlightedText>1,8×</HighlightedText> bei Generierung mit Acceptance-Rate 85–90 %</li>
    <li>Im Pre-Training: Loss-Gewichtung 0,3 für MTP-Tokens - bleibt sekundär</li>
  </BulletedList>

</Columns>

<div class="mt-3">
  <Quotebox source="V3 Tech Report, Sec. 2.2">
    „We propose Multi-Token Prediction, which extends the prediction scope to multiple future tokens at each position. This densifies training signals and may enable better pre-planning of token representations."
  </Quotebox>
</div>

---
title: Trainingseffizienz
subtitle: FP8, DualPipe und Hardware-Co-Design
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <BulletedList title="FP8 Mixed-Precision Training">
    <li>Erstes <HighlightedText>großes Modell</HighlightedText>, das in FP8 trainiert wurde</li>
    <li>Theoretisch <b>2× Durchsatz</b> ggü. BF16 auf H100/H800</li>
    <li>Fine-grained Quantization: Tile-weise statt Tensor-weise - verhindert Outlier-Probleme</li>
    <li>Akkumulationen in FP32 erhalten - numerische Stabilität</li>
  </BulletedList>

  <BulletedList title="DualPipe Pipeline Parallelism">
    <li>Klassische Pipeline-Parallelität: <b>Bubbles</b> (Idle-Zeit) bei Forward/Backward-Synchronisation</li>
    <li>DualPipe <HighlightedText>überlappt</HighlightedText> Berechnung und Kommunikation</li>
    <li>All-to-All-Kommunikation der MoE-Experten parallel zur GEMM-Berechnung</li>
    <li>Resultat: nahezu keine Pipeline-Bubbles</li>
  </BulletedList>

</Columns>

<div class="mt-3">
  <ExampleBox title="Trainingskosten V3 (für Kontext)" source="V3 Tech Report Tab. 1">
    Pre-training: <b>2.664k H800-Stunden</b> ≈ 5,3 Mio. USD ·
    Context-Extension: <b>119k Std.</b> ≈ 0,24 Mio. USD ·
    Post-training: <b>5k Std.</b><br/>
    <HighlightedText>Gesamt ≈ 5,6 Mio. USD</HighlightedText> für 671B-Parameter-Modell - Größenordnungen unter geschätzten GPT-4-Kosten.
  </ExampleBox>
</div>

---
title: DeepSeek-R1 - Reasoning via Reinforcement Learning
subtitle: Vom Base-Modell zum Reasoner ohne menschliches Feedback
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <BulletedList title="R1-Zero - Reines RL">
      <li>Start: <b>DeepSeek-V3-Base</b> (kein SFT)</li>
      <li><HighlightedText>GRPO</HighlightedText> (Group Relative Policy Optimization) als RL-Algorithmus - kein Value-Modell nötig</li>
      <li>Reward: regelbasiert (Korrektheit bei Math/Code + Format)</li>
      <li>„<i>Aha-Moment</i>": Modell lernt selbst, längere Chain-of-Thought zu nutzen, Schritte zu revidieren</li>
      <li>Schwäche: gemischte Sprachen, schlechte Lesbarkeit</li>
    </BulletedList>
  </div>

  <div>
    <BulletedList title="R1 - Cold-Start + RL">
      <li>4-stufige Pipeline:</li>
      <li>1. Cold-Start-SFT mit Long-CoT-Daten</li>
      <li>2. Reasoning-orientiertes RL (GRPO)</li>
      <li>3. Rejection-Sampling + SFT auf 600k Reasoning-Beispielen</li>
      <li>4. RL-Phase über alle Szenarien</li>
      <li>Resultat: <HighlightedText>o1-vergleichbare</HighlightedText> Performance auf AIME, MATH, Codeforces</li>
    </BulletedList>
  </div>

</Columns>

<div class="mt-3">
  <ExampleBox title="Distillation" source="R1 Tech Report Sec. 3">
    R1-Reasoning wurde in 6 kleinere Modelle (Qwen + Llama-Basis, 1,5B – 70B) destilliert.
    <HighlightedText>R1-Distill-Llama-70B</HighlightedText> übertrifft o1-mini auf den meisten Reasoning-Benchmarks.
  </ExampleBox>
</div>

---
layout: chapter-intro
chapter: 3
---
---
title: Zusammenfassung
subtitle: Drei Kernaussagen zur DeepSeek-Architektur
chapter: 3
---

<NumberedList title="Kernaussagen">
  <li>
    <HighlightedText>Architektur statt Skalierung.</HighlightedText>
    <SubText>MLA reduziert KV-Cache um über 90 %, DeepSeekMoE erhöht Expertenspezialisierung - Effizienz kommt aus dem Design, nicht aus mehr Parametern.</SubText>
  </li>
  <li>
    <HighlightedText>Trainingsökonomie als Forschungsziel.</HighlightedText>
    <SubText>FP8-Precision, DualPipe und aux-loss-free Load Balancing senken die Kosten so weit, dass ein 671B-MoE-Modell für ~5,6 Mio. USD trainierbar ist.</SubText>
  </li>
  <li>
    <HighlightedText>Reasoning als emergente Fähigkeit aus reinem RL.</HighlightedText>
    <SubText>R1-Zero zeigt, dass komplexes Schritt-für-Schritt-Denken ohne menschliche Demonstrationen entstehen kann - durch regelbasierte Belohnung und GRPO.</SubText>
  </li>
</NumberedList>

<div class="mt-4">
  <Quotebox source="DeepSeek-R1 Tech Report (2025)">
    „This work demonstrates that the reasoning capabilities of LLMs can be incentivized purely through RL, without supervised fine-tuning as a cold start."
  </Quotebox>
</div>

---
title: Quellen & Weiterführendes
subtitle: Originale Tech Reports und Referenzen
chapter: 3
---

<CitationTable
  title="Primärquellen"
  :citations="[
    { id: '1', text: 'DeepSeek-LLM: Scaling Open-Source Language Models with Longtermism - arXiv:2401.02954 (2024)' },
    { id: '2', text: 'DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model - arXiv:2405.04434 (2024)' },
    { id: '3', text: 'DeepSeek-V3 Technical Report - arXiv:2412.19437 (2024)' },
    { id: '4', text: 'DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning - arXiv:2501.12948 (2025)' },
    { id: '5', text: 'DeepSeekMoE: Towards Ultimate Expert Specialization - arXiv:2401.06066 (2024)' },
    { id: '6', text: 'Shazeer (2019): Fast Transformer Decoding - arXiv:1911.02150 (MQA-Grundlagen)' }
  ]"
  idWidth="50px"
/>

<div class="mt-3">
  <Footnote text="Alle Modelle als Open-Weights verfügbar unter https://github.com/deepseek-ai und https://huggingface.co/deepseek-ai" />
</div>

---
layout: closing
---
