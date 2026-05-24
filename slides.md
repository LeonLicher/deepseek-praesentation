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
  subtitle: 'Effiziente Transformer durch MLA, MoE und MTP'
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
      title: 'Modellübersicht'
    - number: 2
      title: 'Architektur-Innovationen'
    - number: 3
      title: 'Fazit'
---
layout: cover

---
title: Agenda
subtitle: Vortragsaufbau (10 Min · 10 Folien + Anhang)
---

<Outline>
  <OutlineItem :number="1" :active="true">Modellübersicht & Basisarchitektur — Leon Licher</OutlineItem>
  <OutlineItem :number="2">Architektur-Innovationen (MLA · MoE · MTP · FP8 · R1) — Daniel Fischer</OutlineItem>
  <OutlineItem :number="3">Zusammenfassung</OutlineItem>
</Outline>

<SubText>Kontext: Modul Deep Learning (MDL 2) · Kapitel „Transformer Architectures II" · Prof. Dr. Wolfgang Wicht · Sommersemester 2026</SubText>

<Footnote text="Vollständige Model Card (Mitchell et al. 2019) und Quellenverzeichnis im Anhang." />

---
title: Modellübersicht — Evolution V1 → R1
subtitle: Zeitleiste der DeepSeek-Modellfamilie
chapter: 1
---

<Table
  :headers="['Modell', 'Datum', 'Parameter (gesamt)', 'aktiv pro Token', 'Kontext', 'Schlüsselbeitrag (Architektur)']"
  :rows="[
    ['DeepSeek-LLM V1', '01/2024', '7B & 67B (dense)', 'alle', '4K', 'Open-source Baseline (LLaMA-Stil) [1]'],
    ['DeepSeek-V2', '05/2024', '236B (MoE)', '21B', '128K', 'Multi-Head Latent Attention (MLA) [2]'],
    ['DeepSeek-V2.5', '09/2024', '236B (MoE)', '21B', '128K', 'Code & Chat zusammengeführt'],
    ['DeepSeek-V3', '12/2024', '671B (MoE)', '37B', '128K', 'MTP · FP8 · aux-loss-free LB [3]'],
    ['DeepSeek-R1-Zero', '01/2025', '671B (MoE)', '37B', '128K', 'Pure RL (GRPO) — kein SFT [4]'],
    ['DeepSeek-R1', '01/2025', '671B (MoE)', '37B', '128K', 'Reasoning (Cold-start + RL) [4]'],
    ['R1-Distill', '01/2025', '1,5B – 70B (dense)', 'alle', '128K', 'R1-Reasoning in kleine Modelle [4]']
  ]"
  accent="blue"
  :highlights="[4, 6]"
  :columnWidths="['18%', '10%', '18%', '12%', '10%', '32%']"
  size="sm"
  caption="Hervorgehoben: V3 (aktuelles Foundation-Modell) und R1 (bestes Reasoning-Modell) — Fokus dieses Vortrags."
/>

<div class="mt-3">
  <ExampleBox title="Fokusmodell" source="DeepSeek-V3 Tech Report (2024) [3] · DeepSeek-R1 (2025) [4]">
    <b>V3</b> ist das aktuellste Foundation-Modell, <b>R1</b> das in Reasoning-Benchmarks (AIME, MATH, Codeforces) beste DeepSeek-Modell. Beide teilen dieselbe 671B-MoE-Architektur — wir vertiefen sie in Kap. 2.
  </ExampleBox>
</div>

<Footnote text="Quellen: [1] arXiv:2401.02954 · [2] arXiv:2405.04434 · [3] arXiv:2412.19437 · [4] arXiv:2501.12948 (vollständige Liste im Anhang)" />

---
title: Basisarchitektur
subtitle: Decoder-only Transformer im LLaMA-Stil
chapter: 1
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Architektur-Stammbaum" source="DeepSeek-LLM (2024), Kap. 2 [1]">
      „We largely follow the design of LLaMA — adopting a Pre-Norm structure with RMSNorm, SwiGLU activation, and Rotary Position Embeddings."
    </DefinitionBox>
    <div class="mt-3">
      <BulletedList title="Baseline-Komponenten (V1, dense)">
        <li><b>Pre-LN + RMSNorm</b> — stabileres Training als Post-LN <SubText>(Zhang & Sennrich 2019)</SubText></li>
        <li><b>SwiGLU</b>-Activation im Feed-Forward-Block <SubText>(Shazeer 2020)</SubText></li>
        <li><b>RoPE</b> — Rotary Positional Embedding <SubText>(Su et al. 2021)</SubText></li>
        <li><b>BPE-Tokenizer</b>, 100k Vocab</li>
        <li><b>GQA</b> beim 67B-Modell <SubText>(Ainslie et al. 2023)</SubText></li>
      </BulletedList>
    </div>
  </div>

  <div>
    <ExampleBox title="Was bleibt vom klassischen Transformer?" source="Vaswani et al. (2017) [7]">
      Self-Attention + FFN-Blöcke, Residual-Verbindungen, kausales Masking — der Grundbauplan ist seit 2017 unverändert.
    </ExampleBox>
    <div class="mt-3">
      <ExampleBox title="Was ändert DeepSeek ab V2?" source="DeepSeek-V2 (2024) [2]">
        Die <HighlightedText>Attention-Mechanik</HighlightedText> (MLA) und der <HighlightedText>FFN-Block</HighlightedText> (DeepSeekMoE) werden grundlegend umgebaut.
      </ExampleBox>
    </div>
    <div class="mt-3">
      <Quotebox source="DeepSeek-V2 Tech Report [2]">
        „Two key innovations: <b>MLA</b> for efficient inference and <b>DeepSeekMoE</b> for economical training."
      </Quotebox>
    </div>
  </div>

</Columns>

<Footnote text="[1] arXiv:2401.02954 · [2] arXiv:2405.04434 · [7] arXiv:1706.03762" />

---
title: Multi-Head Latent Attention (MLA)
subtitle: V2 — KV-Cache-Kompression über latenten Vektor
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Problem: KV-Cache" source="DeepSeek-V2 (2024), Sec. 2.1 [2]">
      Bei klassischer <b>Multi-Head Attention (MHA)</b> muss pro Token und Head ein voller K/V-Vektor gecached werden — Speicher wächst linear mit Kontextlänge × Heads.
    </DefinitionBox>
    <div class="mt-3">
      <BulletedList title="Evolution der Attention-Varianten">
        <li><b>MHA</b> (Vaswani 2017 [7]): jeder Head hat eigene K, V</li>
        <li><b>MQA</b> (Shazeer 2019 [6]): alle Heads teilen ein K, V</li>
        <li><b>GQA</b> (Ainslie 2023): Gruppen teilen K, V</li>
        <li><HighlightedText>MLA</HighlightedText> (DeepSeek 2024 [2]): K, V werden in einen <b>latenten Vektor c</b> komprimiert</li>
      </BulletedList>
    </div>
  </div>

  <div>
    <DefinitionBox title="MLA-Prinzip" source="DeepSeek-V2, Eq. 9–11 [2]">
      Down-Projektion: c<sub>KV</sub> = W<sup>DKV</sup> · h<sub>t</sub><br/>
      Up-Projektion zur Inferenzzeit: K = W<sup>UK</sup> · c<sub>KV</sub>, V = W<sup>UV</sup> · c<sub>KV</sub><br/>
      → Cache nur c<sub>KV</sub> (dim ≈ 4 · d<sub>head</sub>) statt vollem K, V
    </DefinitionBox>
    <div class="mt-3">
      <ExampleBox title="Ergebnis" source="V2 Tech Report, Tab. 1 [2]">
        KV-Cache <HighlightedText>–93,3 %</HighlightedText> vs. MHA bei <b>gleicher oder besserer Qualität</b>. Maximaler Durchsatz <b>5,76× höher</b> als V1-67B.
      </ExampleBox>
    </div>
    <div class="mt-3">
      <Footnote text="Zusätzlich: Decoupled RoPE — Positionsinformation in separatem Vektor, da RoPE nicht direkt auf komprimierte Latents anwendbar [2, Sec. 2.1.3]." />
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
    <DefinitionBox title="Standard-MoE" source="Shazeer et al. (2017) [8] · Mixtral 8x7B (2024)">
      FFN-Block wird durch <b>N Experten</b> ersetzt (z.B. N=8). Ein Router wählt für jedes Token die <b>Top-k</b> Experten (k=2). Restliche Experten werden übersprungen.
    </DefinitionBox>
    <div class="mt-3">
      <BulletedList title="Zwei Innovationen von DeepSeekMoE">
        <li><HighlightedText>Fine-grained segmentation</HighlightedText>: viele kleine Experten statt wenige große <SubText>(DeepSeekMoE-Paper [5])</SubText><br/>
          <SubText>V3: 256 routed experts, top-8 aktiv (statt 8 × top-2)</SubText></li>
        <li><HighlightedText>Shared experts</HighlightedText>: 1 immer-aktiver Expert pro Layer<br/>
          <SubText>Erfasst gemeinsames Wissen, vermeidet Redundanz</SubText></li>
      </BulletedList>
    </div>
  </div>

  <div>
    <ExampleBox title="V3-Konfiguration" source="DeepSeek-V3 Tech Report, Sec. 2.1.2 [3]">
      Pro Layer: <b>1 shared + 256 routed</b> Experten<br/>
      Pro Token aktiv: <b>1 shared + 8 routed = 9</b> Experten<br/>
      → 37B von 671B Parametern (5,5 %) aktiv
    </ExampleBox>
    <div class="mt-3">
      <ExampleBox title="Auxiliary-loss-free Load Balancing" source="V3 Sec. 2.1.1 [3] · Wang et al. (2024)">
        Klassische MoE braucht einen <b>Hilfsverlust</b>, um Experten gleichmäßig auszulasten — verschlechtert die Modellqualität.<br/>
        V3 ersetzt dies durch einen <HighlightedText>dynamischen Bias</HighlightedText> pro Expert: keine Qualitätseinbußen.
      </ExampleBox>
    </div>
  </div>

</Columns>

<Footnote text="[3] arXiv:2412.19437 · [5] arXiv:2401.06066 · [8] arXiv:1701.06538" />

---
title: Multi-Token Prediction (MTP)
subtitle: V3 — dichteres Trainingssignal & Speculative Decoding
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <DefinitionBox title="Klassisches LM-Training">
      An jeder Position <i>t</i> sagt das Modell genau <b>ein</b> Token (t+1) voraus.<br/>
      Cross-Entropy-Loss nur über next-token prediction.
    </DefinitionBox>
    <div class="mt-3">
      <DefinitionBox title="MTP-Prinzip" source="DeepSeek-V3 Sec. 2.2 [3] · Gloeckle et al. (2024)">
        An jeder Position werden zusätzlich <b>D weitere Tokens</b> (in V3: D=1, also t+2) vorhergesagt — durch sequenzielle MTP-Module, die auf dem Hauptmodell aufsetzen.
      </DefinitionBox>
    </div>
  </div>

  <BulletedList title="Vorteile">
    <li><b>Dichteres Training-Signal</b>: jedes Token liefert mehrere Lernsignale</li>
    <li>Modell sieht <HighlightedText>langfristige Abhängigkeiten</HighlightedText> früher im Training</li>
    <li><b>Speculative Decoding</b> bei Inferenz: MTP-Modul schlägt Token t+2 vor, Hauptmodell verifiziert</li>
    <li>V3-berichteter Speedup: <HighlightedText>1,8×</HighlightedText> bei Generierung mit Acceptance-Rate 85–90 % <SubText>[3]</SubText></li>
    <li>Im Pre-Training: Loss-Gewichtung 0,3 für MTP-Tokens — bleibt sekundär</li>
  </BulletedList>

</Columns>

<div class="mt-3">
  <Quotebox source="V3 Tech Report, Sec. 2.2 [3]">
    „We propose Multi-Token Prediction, which extends the prediction scope to multiple future tokens at each position. This densifies training signals and may enable better pre-planning of token representations."
  </Quotebox>
</div>

---
title: Trainingseffizienz
subtitle: FP8 Mixed-Precision + DualPipe Parallelism
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <BulletedList title="FP8 Mixed-Precision Training">
    <li>Erstes <HighlightedText>großes Open-Weight-Modell</HighlightedText>, das in FP8 trainiert wurde <SubText>[3, Sec. 3.3]</SubText></li>
    <li>Theoretisch <b>2× Durchsatz</b> ggü. BF16 auf H100/H800</li>
    <li><b>Fine-grained Quantization</b>: Tile-weise (1×128) statt Tensor-weise — verhindert Outlier-Probleme</li>
    <li>Akkumulationen in FP32 erhalten — numerische Stabilität gesichert</li>
  </BulletedList>

  <BulletedList title="DualPipe Pipeline Parallelism">
    <li>Klassisches Pipeline-Parallelism: <b>Bubbles</b> (GPU-Idle) bei Fwd/Bwd-Synchronisation</li>
    <li>DualPipe <HighlightedText>überlappt</HighlightedText> Berechnung und All-to-All-Kommunikation <SubText>[3, Sec. 3.2]</SubText></li>
    <li>MoE-Expert-Routing parallel zur GEMM-Berechnung</li>
    <li>Resultat: nahezu keine Pipeline-Bubbles bei 2.048 H800-GPUs</li>
  </BulletedList>

</Columns>

<div class="mt-3">
  <ExampleBox title="Trainingskosten V3 (für Kontext)" source="V3 Tech Report, Tab. 1 [3]">
    Pre-training: <b>2.664k H800-Stunden</b> ≈ 5,3 Mio. USD ·
    Context-Extension: <b>119k Std.</b> ≈ 0,24 Mio. USD ·
    Post-training: <b>5k Std.</b><br/>
    <HighlightedText>Gesamt ≈ 5,6 Mio. USD</HighlightedText> für 671B-Parameter-Modell — Größenordnungen unter geschätzten GPT-4-Kosten.
  </ExampleBox>
</div>

---
title: DeepSeek-R1 — Reasoning via Reinforcement Learning
subtitle: Vom Base-Modell zum Reasoner ohne menschliche Demonstrationen
chapter: 2
---

<Columns columns="1fr 1fr" gap="1.5rem">

  <div>
    <BulletedList title="R1-Zero — Reines RL">
      <li>Start: <b>DeepSeek-V3-Base</b> (kein SFT)</li>
      <li><HighlightedText>GRPO</HighlightedText> (Group Relative Policy Optimization) als RL-Algorithmus — kein Value-Modell nötig <SubText>(Shao et al. 2024)</SubText></li>
      <li>Reward: <b>regelbasiert</b> (Korrektheit bei Math/Code + Format) — kein RLHF</li>
      <li>„<i>Aha-Moment</i>": Modell lernt selbst, längere Chain-of-Thought zu nutzen, Schritte zu revidieren <SubText>[4, Sec. 2.2.4]</SubText></li>
      <li>Schwäche: gemischte Sprachen, schlechte Lesbarkeit</li>
    </BulletedList>
  </div>

  <div>
    <BulletedList title="R1 — Cold-Start + RL (4 Stufen)">
      <li>1. Cold-Start-SFT mit Long-CoT-Daten</li>
      <li>2. Reasoning-orientiertes RL (GRPO)</li>
      <li>3. Rejection-Sampling + SFT auf 600k Reasoning-Beispielen</li>
      <li>4. RL-Phase über alle Szenarien (Helpfulness + Safety)</li>
      <li>Resultat: <HighlightedText>o1-vergleichbare</HighlightedText> Performance auf AIME (79,8 %), MATH-500, Codeforces <SubText>[4, Tab. 4]</SubText></li>
    </BulletedList>
  </div>

</Columns>

<div class="mt-3">
  <ExampleBox title="Distillation" source="R1 Tech Report, Sec. 3 [4]">
    R1-Reasoning wurde in 6 kleinere Modelle (Qwen + Llama-Basis, 1,5B – 70B) destilliert.
    <HighlightedText>R1-Distill-Llama-70B</HighlightedText> übertrifft o1-mini auf den meisten Reasoning-Benchmarks.
  </ExampleBox>
</div>

---
title: Zusammenfassung
subtitle: Drei Kernaussagen zur DeepSeek-Architektur
chapter: 3
---

<NumberedList title="Kernaussagen">
  <li>
    <HighlightedText>Architektur statt Skalierung.</HighlightedText>
    <SubText>MLA reduziert KV-Cache um über 90 %, DeepSeekMoE erhöht Expertenspezialisierung — Effizienz kommt aus dem Design, nicht aus mehr Parametern.</SubText>
  </li>
  <li>
    <HighlightedText>Trainingsökonomie als Forschungsziel.</HighlightedText>
    <SubText>FP8-Precision, DualPipe und aux-loss-free Load Balancing senken die Kosten so weit, dass ein 671B-MoE-Modell für ~5,6 Mio. USD trainierbar ist.</SubText>
  </li>
  <li>
    <HighlightedText>Reasoning als emergente Fähigkeit aus reinem RL.</HighlightedText>
    <SubText>R1-Zero zeigt, dass komplexes Schritt-für-Schritt-Denken ohne menschliche Demonstrationen entstehen kann — durch regelbasierte Belohnung und GRPO.</SubText>
  </li>
</NumberedList>

<div class="mt-4">
  <Quotebox source="DeepSeek-R1 Tech Report (2025) [4]">
    „This work demonstrates that the reasoning capabilities of LLMs can be incentivized purely through RL, without supervised fine-tuning as a cold start."
  </Quotebox>
</div>

<Footnote text="Anhang: Vortragende · Model Card (Mitchell et al. 2019) · Quellenverzeichnis" />

---
layout: closing

---
title: Anhang A — Vortragende
subtitle: Team & Aufgabenverteilung
---

<div class="grid grid-cols-2 gap-x-12 mt-8 max-w-2xl mx-auto">

  <div class="flex flex-col items-center text-center">
    <img src="/images/licher.jpg" class="w-32 h-32 object-cover object-top rounded-full mb-3" />
    <p class="font-semibold text-gray-800 text-lg m-0">Leon Licher</p>
    <p class="text-sm text-gray-500 m-0">Matr.-Nr. 1233258</p>
    <p class="text-xs text-gray-400 mt-2">Modellübersicht & Basisarchitektur (Folien 3–4)</p>
  </div>

  <div class="flex flex-col items-center text-center">
    <img src="/images/fischer.jpg" class="w-32 h-32 object-cover object-top rounded-full mb-3" />
    <p class="font-semibold text-gray-800 text-lg m-0">Daniel Fischer</p>
    <p class="text-sm text-gray-500 m-0">Matr.-Nr. 1255216</p>
    <p class="text-xs text-gray-400 mt-2">Architektur-Innovationen & Reasoning (Folien 5–9)</p>
  </div>

</div>

<SubText>Modul Deep Learning (MDL 2) · Sommersemester 2026 · Prof. Dr. Wolfgang Wicht</SubText>

---
title: Anhang B — Model Card (1/2)
subtitle: Standardisierter Steckbrief nach Mitchell et al. (2019), arXiv:1810.03993
---

<Columns columns="1fr 1fr" gap="1rem">

  <div>
    <Table
      :headers="['1. Model Details', 'DeepSeek-V3 / R1']"
      :rows="[
        ['Entwickler', 'DeepSeek AI (Hangzhou, CN)'],
        ['Release', 'V3: 26.12.2024 · R1: 20.01.2025'],
        ['Version', 'V3-Base / V3 / R1 / R1-Zero'],
        ['Modelltyp', 'Decoder-only Transformer + MoE'],
        ['Architektur-Module', 'MLA · DeepSeekMoE · MTP'],
        ['Parameter (gesamt)', '671 Mrd.'],
        ['Aktiv pro Token', '37 Mrd. (5,5 %)'],
        ['Kontextlänge', '128.000 Tokens'],
        ['Lizenz', 'DeepSeek Model License (Open Weights)'],
        ['Kontakt', 'service@deepseek.com'],
        ['Zitation', 'DeepSeek-AI (2024, 2025) — arXiv:2412.19437 / 2501.12948']
      ]"
      accent="blue"
      :columnWidths="['38%', '62%']"
      size="sm"
    />
  </div>

  <div>
    <Table
      :headers="['2. Intended Use', '']"
      :rows="[
        ['Primärer Anwendungsbereich', 'Forschung · Chat · Code-Generierung · komplexes Reasoning (R1)'],
        ['Primäre Nutzergruppe', 'ML-Forschung, Entwickler, Unternehmen mit eigener GPU-Infrastruktur'],
        ['Out-of-Scope', 'Medizinische/juristische Beratung ohne Verifikation · sicherheitskritische Infrastruktur · autonome Hochrisiko-Entscheidungen']
      ]"
      accent="gray"
      :columnWidths="['38%', '62%']"
      size="sm"
    />

    <div class="mt-2">
      <Table
        :headers="['3. Factors', '']"
        :rows="[
          ['Relevante Faktoren', 'Sprache (EN/ZH primär) · Domäne (Math/Code/Conversational) · Promptlänge'],
          ['Evaluation-Faktoren', 'Multilinguale Benchmarks (CMMLU, MMLU), code-spezifische Tests (HumanEval)']
        ]"
        accent="gray"
        :columnWidths="['38%', '62%']"
        size="sm"
      />
    </div>

    <div class="mt-2">
      <Table
        :headers="['4. Metrics', '']"
        :rows="[
          ['Accuracy / Pass@1', 'MMLU, GPQA, HumanEval, MATH, AIME'],
          ['Trainings-Metriken', 'Pre-train Loss · Token-Throughput · GPU-Stunden'],
          ['Entscheidungs-Schwellen', 'Keine — Generation-Modell, keine Klassifikation']
        ]"
        accent="gray"
        :columnWidths="['38%', '62%']"
        size="sm"
      />
    </div>
  </div>

</Columns>

<Footnote text="Schema: Mitchell, M. et al. (2019). Model Cards for Model Reporting. FAT* '19. arXiv:1810.03993 · Quelle: huggingface.co/deepseek-ai/DeepSeek-V3 & /DeepSeek-R1" />

---
title: Anhang B — Model Card (2/2)
subtitle: Standardisierter Steckbrief nach Mitchell et al. (2019)
---

<Columns columns="1fr 1fr" gap="1rem">

  <div>
    <Table
      :headers="['5. Evaluation Data', '']"
      :rows="[
        ['Datasets', 'MMLU · GPQA-Diamond · HumanEval · MBPP · MATH-500 · AIME 2024 · Codeforces · DROP'],
        ['Begründung', 'Standardisierte Benchmarks der englischsprachigen LLM-Community'],
        ['Vorverarbeitung', 'Few-shot Prompting (0–8 shots) je nach Benchmark']
      ]"
      accent="blue"
      :columnWidths="['38%', '62%']"
      size="sm"
    />

    <div class="mt-2">
      <Table
        :headers="['6. Training Data', '']"
        :rows="[
          ['Volumen', '14,8 Billionen Tokens (V3 Pre-Training)'],
          ['Quellen', 'Web-Crawl (Common Crawl-ähnlich) · Code (GitHub) · Mathe-Korpora'],
          ['Filterung', 'Deduplikation · Qualitätsfilter · Sicherheitsfilter'],
          ['Hardware', '2.048 × NVIDIA H800'],
          ['Precision', 'FP8 mixed-precision (Akkumulation FP32)'],
          ['GPU-Stunden', '2.788k · Kosten ≈ 5,6 Mio. USD']
        ]"
        accent="gray"
        :columnWidths="['38%', '62%']"
        size="sm"
      />
    </div>
  </div>

  <div>
    <Table
      :headers="['7. Quantitative Analyses', 'V3', 'GPT-4o', 'Claude-3.5']"
      :rows="[
        ['MMLU (5-shot)', '88,5', '87,2', '88,3'],
        ['GPQA-Diamond', '59,1', '49,9', '65,0'],
        ['HumanEval (Pass@1)', '82,6', '80,5', '81,7'],
        ['MATH-500', '90,2', '74,6', '78,3'],
        ['AIME 2024 (R1)', '79,8*', '13,4', '16,0']
      ]"
      accent="blue"
      :highlights="[5]"
      :columnWidths="['36%', '20%', '22%', '22%']"
      size="sm"
      caption="*R1-Wert · alle anderen Werte: V3 (DeepSeek-V3 Tech Report, Tab. 6)"
    />

    <div class="mt-2">
      <Table
        :headers="['8. Ethical Considerations', '']"
        :rows="[
          ['Sensible Daten', 'Trainingsdaten nicht vollständig dokumentiert (Web-Crawl)'],
          ['Risiken', 'Halluzinationen · politische Voreingenommenheit (CN-Kontext) · Code-Sicherheitslücken'],
          ['Mitigation', 'Sicherheits-RL in Stufe 4 (R1) · Content-Filter']
        ]"
        accent="gray"
        :columnWidths="['38%', '62%']"
        size="sm"
      />
    </div>

    <div class="mt-2">
      <Table
        :headers="['9. Caveats & Recommendations', '']"
        :rows="[
          ['Limitierungen', 'Aktivierte 37B-Parameter benötigen >700 GB VRAM (FP8)'],
          ['Empfehlung', 'Für lokale Nutzung: R1-Distill-Varianten (1,5B–70B)']
        ]"
        accent="gray"
        :columnWidths="['38%', '62%']"
        size="sm"
      />
    </div>
  </div>

</Columns>

<Footnote text="Schema: Mitchell et al. (2019), FAT* '19, arXiv:1810.03993 — Sektionen 1–9 vollständig übernommen." />

---
title: Anhang C — Quellen
subtitle: Primärquellen und weiterführende Literatur
---

<CitationTable
  title="Primärquellen DeepSeek"
  :citations="[
    { id: '1', text: 'DeepSeek-AI (2024): DeepSeek-LLM — Scaling Open-Source Language Models with Longtermism. arXiv:2401.02954' },
    { id: '2', text: 'DeepSeek-AI (2024): DeepSeek-V2 — A Strong, Economical, and Efficient Mixture-of-Experts Language Model. arXiv:2405.04434' },
    { id: '3', text: 'DeepSeek-AI (2024): DeepSeek-V3 Technical Report. arXiv:2412.19437' },
    { id: '4', text: 'DeepSeek-AI (2025): DeepSeek-R1 — Incentivizing Reasoning Capability in LLMs via Reinforcement Learning. arXiv:2501.12948' },
    { id: '5', text: 'Dai, D. et al. (2024): DeepSeekMoE — Towards Ultimate Expert Specialization. arXiv:2401.06066' }
  ]"
  idWidth="40px"
/>

<div class="mt-3">
  <CitationTable
    title="Architektur-Grundlagen"
    :citations="[
      { id: '6', text: 'Shazeer, N. (2019): Fast Transformer Decoding — One Write-Head is All You Need (MQA). arXiv:1911.02150' },
      { id: '7', text: 'Vaswani, A. et al. (2017): Attention Is All You Need. NeurIPS 2017. arXiv:1706.03762' },
      { id: '8', text: 'Shazeer, N. et al. (2017): Outrageously Large Neural Networks — The Sparsely-Gated MoE Layer. ICLR 2017. arXiv:1701.06538' },
      { id: '9', text: 'Mitchell, M. et al. (2019): Model Cards for Model Reporting. FAT* 2019. arXiv:1810.03993' }
    ]"
    idWidth="40px"
  />
</div>

<Footnote text="Alle DeepSeek-Modelle als Open-Weights verfügbar: github.com/deepseek-ai · huggingface.co/deepseek-ai" />
