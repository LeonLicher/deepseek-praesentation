# Vortrags-Guide: DeepSeek — Architektur

> Diese Datei erklärt jede Folie in einfachen Worten — zum Verstehen und Üben.
> Ziel: **10 Min Vortrag** (5 Min Leon + 5 Min Daniel) · **10 Folien + Anhang**.

> **Struktur-Vorgabe Prof. Wicht (Kontext „Transformer Architectures II"):**
> Modellübersicht zuerst · Fokus auf aktuellstes & benchmark-bestes Modell (V3/R1) ·
> Architektur-Besonderheiten im Hauptteil · Model Card im Anhang (Mitchell et al. 2019) · sauber zitieren.

---

## Die große Story in einem Satz

> **DeepSeek zeigt, dass clevere Architektur (MLA + MoE + MTP) ein KI-Modell auf GPT-4-Niveau bringt — bei einem Bruchteil der Kosten und mit offenen Gewichten.**

---

## Grundbegriffe (musst du sicher beherrschen)

| Begriff | Einfache Erklärung |
|---|---|
| **LLM** | Large Language Model — sagt das nächste Wort voraus. |
| **Decoder-only Transformer** | Rechte Hälfte des Original-Transformers (Vaswani 2017). Generiert Text Wort für Wort. |
| **Parameter / aktiv pro Token** | Bei MoE-Modellen wird nicht jeder Parameter für jedes Token berechnet. V3: 671B gesamt, nur 37B aktiv. |
| **MoE** | Mixture of Experts — Router wählt pro Token wenige Experten aus vielen. |
| **KV-Cache** | Zwischenspeicher der Attention-Keys/Values während der Inferenz. Wächst mit Kontextlänge. |
| **MLA** | Multi-Head Latent Attention — DeepSeeks Trick zur KV-Cache-Kompression (−93 %). |
| **MTP** | Multi-Token Prediction — sagt während des Trainings 2 Tokens parallel voraus. |
| **GRPO** | Group Relative Policy Optimization — RL-Variante ohne separates Value-Modell. Wird in R1 verwendet. |
| **FP8** | 8-Bit-Floating-Point. Halbiert Speicher ggü. BF16, verdoppelt Durchsatz. |
| **RLHF vs. regelbasiertes RL** | RLHF braucht menschliche Präferenzdaten. R1-Zero nutzt nur regelbasierte Rewards (korrekt/nicht korrekt). |

---

# Folienplan — exakt 10 Folien

| # | Folie | Sprecher | Zeit |
|---|---|---|---|
| 1 | Cover | Leon | 10 s |
| 2 | Agenda | Leon | 15 s |
| 3 | Modellübersicht V1 → R1 | Leon | 90 s |
| 4 | Basisarchitektur | Leon | 60 s |
| 5 | MLA | Daniel | 75 s |
| 6 | DeepSeekMoE | Daniel | 75 s |
| 7 | MTP | Daniel | 60 s |
| 8 | Trainingseffizienz (FP8 + DualPipe) | Daniel | 60 s |
| 9 | DeepSeek-R1 — Reasoning | Daniel | 75 s |
| 10 | Zusammenfassung | gemeinsam | 30 s |
| — | **Anhang A** Vortragende | nur auf Nachfrage | |
| — | **Anhang B** Model Card (Mitchell et al.) | nur auf Nachfrage | |
| — | **Anhang C** Quellen | nur auf Nachfrage | |

Summe Hauptteil: ~9,5 Min — Puffer ~30 s für Übergänge.

---

# TEIL 1 — Leon (Modellübersicht & Basisarchitektur, ~5 Min)

## Folie 1: Cover
*„Guten Tag, wir präsentieren die Architektur von DeepSeek im Rahmen des Kapitels Transformer Architectures II."* (10 s)

## Folie 2: Agenda
*„Wir teilen den Vortrag in drei Teile: Ich beginne mit der Modellübersicht und der Basisarchitektur. Daniel übernimmt die fünf zentralen Architektur-Innovationen, dann fassen wir zusammen. Im Anhang finden Sie zusätzlich eine vollständige Model Card nach Mitchell et al."* (15 s)

## Folie 3: Modellübersicht V1 → R1

**Was du sagen musst (90 s):**

> Die Tabelle zeigt die DeepSeek-Modellfamilie chronologisch. **Wichtig:** Jedes Modell bringt eine konkrete architektonische Innovation mit — keine reine Parameterskalierung.
>
> - **V1 (Januar 2024)**: Klassisches dense LLaMA-Design, 7 und 67 Milliarden Parameter. Baseline.
> - **V2 (Mai 2024)**: 236 Mrd. Parameter, aber nur **21 Mrd. aktiv** dank Mixture of Experts. Hier kommt **Multi-Head Latent Attention (MLA)** dazu.
> - **V3 (Dezember 2024)**: 671 Mrd. gesamt, 37 Mrd. aktiv. Drei neue Bausteine: **Multi-Token Prediction**, **FP8-Training** und **aux-loss-free Load Balancing**.
> - **R1 (Januar 2025)**: V3-Base + Reinforcement Learning → **Reasoner** auf o1-Niveau.
> - **R1-Distill**: Reasoning aus R1 in kleine Modelle (1,5B–70B) destilliert.
>
> **Unser Fokus** ist V3 als aktuellstes Foundation-Modell und R1 als bestes Reasoning-Modell — beide teilen dieselbe 671B-MoE-Architektur, die wir gleich vertiefen.

**Hinweis:** Hervorgehobene Zeilen (V3 + R1) sind der Vortragsfokus — auf diese kommt Daniel zurück.

**Mögliche Prof-Fragen:**
- *„Was bedeutet ‚aktiv pro Token'?"* → Bei MoE wird pro Token nur eine Teilmenge der Experten aktiviert (V3: 9 von 257 Experten pro Layer). Das spart Rechenzeit bei der Inferenz.
- *„Warum dieser Fokus auf V3/R1?"* → Beide sind die aktuellsten Modelle (Stand Vortrag) und führen in den jeweiligen Benchmark-Klassen (V3: allgemein, R1: Reasoning).

## Folie 4: Basisarchitektur

**Was du sagen musst (60 s):**

> Vor den Innovationen kurz die Basis. DeepSeek folgt dem LLaMA-Design — also den Standardkomponenten moderner Decoder-only Transformer:
>
> - **Pre-LN + RMSNorm**: Normalisierung VOR der Attention — stabilisiert das Training.
> - **SwiGLU**: Activation-Function im FFN, hat sich gegen ReLU/GELU durchgesetzt.
> - **RoPE**: Rotary Position Embedding — codiert Positionen durch Rotation im Vektorraum.
> - **BPE-Tokenizer**: Sub-Wort-Einheiten, 100k Vocab.
> - **GQA** im 67B-Modell — eine effiziente Attention-Variante.
>
> **Wichtig:** Bis hierhin macht DeepSeek nichts grundlegend Neues. Der innovative Teil beginnt ab V2 — und hier übergebe ich an Daniel.

**Übergang zu Daniel:** *„Daniel zeigt jetzt die fünf zentralen architektonischen Innovationen."*

---

# TEIL 2 — Daniel (Architektur-Innovationen, ~5 Min)

## Folie 5: Multi-Head Latent Attention (MLA)

**Was Daniel sagen muss (75 s):**

> Das Hauptproblem moderner LLMs bei der **Inferenz** ist nicht die Berechnung, sondern der **KV-Cache**. Bei 128.000 Tokens Kontext und vielen Attention-Heads wächst er auf Gigabyte-Größenordnung pro Anfrage.
>
> Vorherige Lösungen:
> - **MQA** (Shazeer 2019): alle Heads teilen ein K/V — klein, aber Qualitätsverlust.
> - **GQA** (Llama 2): Kompromiss — Gruppen teilen.
>
> **MLA**: Statt K und V zu cachen, werden sie in einen **latenten Vektor c** komprimiert. Bei der Inferenz wird c durch Up-Projektion wieder zu K, V aufgefaltet.
>
> **Ergebnis**: KV-Cache **–93 %** bei gleicher Qualität · Inferenz-Durchsatz **5,76× höher** als V1-67B.

**Analogie:** *Wie eine ZIP-Datei: du speicherst nicht 100 Bücher einzeln, sondern komprimierst sie und entpackst nur das, was du gerade brauchst.*

**Prof-Frage:** *„Wo geht durch die Kompression Information verloren?"*
**Antwort:** Die Down-/Up-Projektion ist gelernt — das Modell lernt selbst, was wichtig ist. Empirisch kaum Qualitätsverlust (V2 Tab. 1).

## Folie 6: DeepSeekMoE

**Was Daniel sagen muss (75 s):**

> Standard-MoE (Mixtral, GPT-4): 8 Experten, davon 2 aktiv pro Token. Zwei Probleme: Redundanz zwischen Experten und schwierige Lastverteilung.
>
> **DeepSeekMoE bringt zwei Innovationen:**
>
> 1. **Fine-grained Segmentation**: 256 kleine Experten statt 8 große — feinere Spezialisierung möglich.
> 2. **Shared Experts**: 1 immer-aktiver Experte pro Layer für Grundwissen — andere 256 spezialisieren sich. Keine Wissens-Duplikation.
>
> **V3 konkret**: 1 shared + 8 von 256 routed = 9 aktive Experten pro Token. Damit nur **37 von 671 Mrd. Parametern** aktiv (5,5 %).
>
> **Bonus**: **Aux-loss-free Load Balancing** — statt Hilfsverlust ein dynamischer Bias pro Experte. Spart Qualität.

## Folie 7: Multi-Token Prediction (MTP)

**Was Daniel sagen muss (60 s):**

> Klassisches LM-Training sagt pro Position genau ein Token voraus.
>
> **MTP-Idee**: Sage zusätzlich das **übernächste** Token vorher und gewichte es im Loss.
>
> Zwei Vorteile:
>
> 1. **Beim Training**: dichteres Lernsignal, Modell lernt Mehr-Schritt-Planung.
> 2. **Bei der Inferenz**: MTP-Modul schlägt t+2 vor → **Speculative Decoding** → **1,8× schnellere Generierung** bei ~85 % Acceptance-Rate.
>
> MTP-Loss-Gewichtung im Pre-Training: 0,3 — also sekundär. Hauptziel bleibt next-token prediction.

**Analogie:** *Wie ein Schachspieler, der nicht nur den nächsten, sondern auch den übernächsten Zug plant.*

## Folie 8: Trainingseffizienz (FP8 + DualPipe)

**Was Daniel sagen muss (60 s):**

> Zwei technische Tricks, die V3 für ~5,6 Mio. USD trainierbar machen:
>
> **1. FP8 Mixed-Precision**: 8-Bit-Floats statt 16. Halbiert Speicher, verdoppelt Durchsatz. Stabilität durch **Fine-grained Quantization** (Tile-weise statt Tensor-weise) und FP32-Akkumulation. V3 ist das **erste große Open-Weight-Modell** in FP8.
>
> **2. DualPipe**: Beim Pipeline-Parallelism entstehen normalerweise **Bubbles** (GPU-Idle bei Synchronisation). DualPipe überlappt Berechnung mit All-to-All-Kommunikation der MoE-Experten — praktisch keine Idle-Zeit.
>
> **Resultat**: 2.788k H800-Stunden ≈ **5,6 Mio. USD** für ein 671B-Modell. Geschätzte GPT-4-Kosten: >100 Mio.

## Folie 9: DeepSeek-R1 — Reasoning

**Was Daniel sagen muss (75 s):**

> R1 ist das Highlight 2025. Schritt-für-Schritt-Denken bei Mathe/Code, vergleichbar mit OpenAIs o1.
>
> **R1-Zero** (links): Reines RL auf V3-Base, **OHNE SFT**.
> - **GRPO** statt PPO — spart Value-Modell, ist effizienter (Shao et al. 2024).
> - **Reward regelbasiert**: korrekt? kompiliert? — kein menschliches Feedback.
> - **„Aha-Moment"**: Modell lernt selbstständig längere Chain-of-Thought zu nutzen — emergent, nicht antrainiert.
> - Schwäche: gemischte Sprachen, schwer lesbar.
>
> **R1** (rechts): 4-stufige Pipeline behebt Lesbarkeit:
> 1. Cold-Start-SFT mit Long-CoT-Daten
> 2. Reasoning-RL (GRPO)
> 3. Rejection-Sampling + SFT (600k Beispiele)
> 4. Finales RL über alle Szenarien
>
> Resultat: **o1-vergleichbar** auf AIME (79,8 %), MATH-500, Codeforces.
>
> **Distillation**: R1-Reasoning übertragen in 6 kleine Modelle. R1-Distill-Llama-70B **übertrifft o1-mini**.

**Prof-Fragen:**
- *„Was ist GRPO?"* → Group Relative Policy Optimization. Wie PPO, aber Rewards einer Antwort-Gruppe werden zueinander normalisiert — kein separates Value-Modell.
- *„Was ist Distillation?"* → Ein kleines Modell wird trainiert, die Outputs eines großen zu imitieren. Lehrer-Schüler-Prinzip.

---

# TEIL 3 — Zusammen

## Folie 10: Zusammenfassung

**Wer den Schluss übernimmt (30 s):**

> Drei Kernaussagen zum Mitnehmen:
>
> 1. **Architektur statt Skalierung**: MLA + DeepSeekMoE bringen mehr Effizienz als mehr Parameter.
> 2. **Trainingsökonomie als Forschungsziel**: FP8, DualPipe, aux-loss-free LB — KI-Forschung wird demokratisiert.
> 3. **Reasoning ohne menschliches Feedback**: R1-Zero — komplexes Denken emergent aus regelbasiertem RL.
>
> *„Vielen Dank — gerne nehmen wir Fragen an. Im Anhang finden Sie die vollständige Model Card und das Quellenverzeichnis."*

---

# Anhang (nur auf Nachfrage öffnen)

## Anhang A: Vortragende
Kurze Vorstellung — kann übersprungen werden, wenn der Prof Cover/Folie 1 akzeptiert hat.

## Anhang B: Model Card (Mitchell et al. 2019)
**Wichtig zu wissen:**
- Schema nach **Mitchell et al. 2019** (FAT* '19, arXiv:1810.03993) — der etablierte Industriestandard (HuggingFace, Google, Anthropic verwenden ihn).
- Alle **9 Sektionen** sind enthalten: Model Details, Intended Use, Factors, Metrics, Evaluation Data, Training Data, Quantitative Analyses, Ethical Considerations, Caveats.
- Auf 2 Folien aufgeteilt (1–4 / 5–9), damit alles lesbar bleibt.

**Mögliche Prof-Fragen:**
- *„Was ist eine Model Card?"* → Standardisierte Modell-Dokumentation nach Mitchell et al., Google 2019. Soll Architektur, Trainingsdaten, Performance, Limitationen und ethische Aspekte transparent machen.
- *„Welche Sektion ist bei DeepSeek schwach dokumentiert?"* → Ehrlich: Trainingsdaten und Ethical Considerations sind in den Tech Reports knapp gehalten — der Web-Crawl-Anteil ist nicht offengelegt.

## Anhang C: Quellen
Alle DeepSeek-Tech-Reports auf arXiv, alle Modelle auf HuggingFace/GitHub als Open-Weights.

---

# Tipps zum Vortrag

## Technisches
- **Stoppuhr**: Üben bis du in 5 Min durch deinen Teil bist (Leon: 1–4 / Daniel: 5–9).
- **Folie 3 (Tabelle)**: Nicht alles vorlesen — auf die hervorgehobenen Zeilen V3 + R1 zeigen.
- **Folie 5 (MLA-Formel)**: Nur das Prinzip erklären, nicht die Matrizen ausrechnen. Wichtig ist der Effekt (–93 %).

## Inhaltlich
- **Halte die Story**: Architektur > Skalierung · Effizienz > Größe · Open Weights > Closed.
- **Wenn der Prof fragt** und du es nicht weißt: *„Das müssten wir im Originalpaper nachschlagen — der vollständige Verweis steht im Anhang C."* Besser als Raten.

## Fallen
- **Verwechsele nicht**: V3 = Foundation Model (kein Reasoning), R1 = Reasoning auf V3-Base aufgesetzt.
- **MoE-Zahlen**: 671B gesamt, 37B aktiv — *nicht* „37B-Modell".
- **Open-Weight ≠ Open-Source**: Gewichte frei, Trainings-Code teilweise, Trainingsdaten **nicht**.

## Wahrscheinlichste Prof-Fragen
1. *„Wie unterscheidet sich DeepSeek von Llama?"* → MLA + DeepSeekMoE + MTP. Llama ist dense und nutzt GQA.
2. *„Warum war DeepSeek so günstig?"* → MoE (nur 5,5 % aktiv) + FP8 (halbierter Speicher) + DualPipe (keine GPU-Idle).
3. *„Was ist der wichtigste Beitrag?"* → Diskutabel. Wirtschaftlich: FP8 + MoE-Effizienz. Wissenschaftlich: R1-Zeros „Aha-Moment".
4. *„Wie verhält sich R1 zu OpenAI o1?"* → Vergleichbare Performance auf Reasoning-Benchmarks, R1 ist offen, o1 closed.
5. *„Warum eine Model Card im Anhang?"* → Mitchell-Standard ist seit 2019 etabliert (HuggingFace, EU AI Act zunehmend Pflicht). Wir wollten den Hauptvortrag architekturzentriert halten, aber die Dokumentationspraxis trotzdem vollständig zeigen.

---

**Viel Erfolg!**
