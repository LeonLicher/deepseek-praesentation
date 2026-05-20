# Vortrags-Guide: DeepSeek LLM Architektur

> Diese Datei erklärt jede Folie in einfachen Worten — zum Verstehen und Üben.
> Ziel: **10 Min Vortrag** (5 Min Leon + 5 Min Daniel).

---

## 🎯 Die große Story in einem Satz

> **DeepSeek zeigt, dass man durch clevere Architektur-Tricks ein KI-Modell auf GPT-4-Niveau bauen kann — für einen Bruchteil der Kosten und mit offenen Gewichten.**

Wenn dich der Prof unterbricht und du nur einen Satz sagen kannst — das ist er.

---

## Grundbegriffe (musst du sicher beherrschen)

| Begriff | Einfache Erklärung |
|---|---|
| **LLM** | Large Language Model — ein neuronales Netz, das das nächste Wort vorhersagt. ChatGPT, Llama, DeepSeek sind alle LLMs. |
| **Transformer** | Die Standard-Architektur seit 2017 (Paper „Attention is All You Need"). Funktioniert über *Attention* — jedes Wort schaut auf jedes andere. |
| **Decoder-only** | Nur die rechte Hälfte des originalen Transformers. GPT, Llama, DeepSeek sind decoder-only. Sie generieren Text Wort für Wort. |
| **Parameter** | Die „Stellschrauben" des Modells. Mehr = größer & teurer. GPT-3 hatte 175 Milliarden, V3 hat 671 Milliarden. |
| **MoE** | Mixture of Experts — statt dass ALLE Parameter für jedes Wort rechnen, werden nur einige „Experten" aktiviert. Spart Rechenleistung. |
| **KV-Cache** | Beim Generieren langer Texte speichert das Modell Zwischenwerte (Keys/Values) — wird schnell zum Speicher-Bottleneck. |
| **Pre-training** | Erstes Training auf riesigen Textmengen (das Internet). Dauert Wochen/Monate. |
| **Fine-tuning** | Nachjustierung auf spezielle Aufgaben (Chat, Code, Reasoning). Dauert Tage. |
| **RL / RLHF** | Reinforcement Learning — das Modell wird durch Belohnungen trainiert, gute Antworten zu geben. |

---

# TEIL 1 — Leon (Foundation, ~5 Min)

## Folie 1: Cover
*Nur kurz: „Guten Tag, wir präsentieren die Architektur von DeepSeek LLM."* (10 Sek)

## Folie 2: Agenda
*„Wir teilen den Vortrag in drei Teile: Ich beginne mit Foundation und Modellfamilie. Daniel übernimmt dann die Key Innovations, und wir schließen mit der Zusammenfassung."* (15 Sek)

## Folie 3: Vortragende
*Kurze Vorstellung — wer macht was.* (10 Sek)

## Folie 4: Chapter Intro „Foundation"
*Übergang.* (5 Sek)

## Folie 5: Was ist DeepSeek?

**Was du sagen musst (60 Sek):**

> DeepSeek ist ein chinesisches KI-Labor, gegründet Mitte 2023 als Spin-off des Hedgefonds **High-Flyer**. Die Besonderheit: Im Gegensatz zu OpenAI oder Google sind **alle Modelle Open-Weight** — das heißt: jeder kann sie herunterladen und nutzen.
>
> Was DeepSeek bekannt gemacht hat: Sie haben gezeigt, dass man **mit nur ca. 5,6 Millionen Dollar** ein Modell trainieren kann, das mit GPT-4o und Claude 3.5 mithalten kann. Zum Vergleich: GPT-4 hat geschätzt über 100 Millionen gekostet.
>
> Der Forschungsansatz: **Nicht durch mehr Parameter besser werden**, sondern durch **clevere Architektur-Innovationen**. Genau die schauen wir uns gleich an.

**Mögliche Prof-Frage:** *„Warum ist Open-Weight ein Vorteil?"*
**Antwort:** Reproduzierbarkeit der Forschung, kein Vendor-Lock-in, kostenfreie Nutzung, lokales Hosting (Datenschutz).

## Folie 6: Modellfamilie — V1 bis R1

**Was du sagen musst (90 Sek):**

> Die Tabelle zeigt die Evolution. **Wichtig zu verstehen:** Jedes Modell bringt eine konkrete Innovation mit.
>
> - **V1 (Januar 2024)**: Der Einstieg — ganz klassischer dense Transformer im Stil von LLaMA. 7 und 67 Milliarden Parameter. Kein MoE noch.
> - **V2 (Mai 2024)**: Erster großer Sprung — 236 Milliarden Parameter, aber **nur 21 Milliarden sind pro Token aktiv** dank Mixture of Experts. Hier kommt die Multi-Head Latent Attention dazu.
> - **V3 (Dezember 2024)**: Das aktuelle Flaggschiff — 671 Mrd Gesamt, 37 Mrd aktiv. Drei neue Tricks: Multi-Token Prediction, FP8-Training, und ein neues Load-Balancing.
> - **R1 (Januar 2025)**: Kein neues Modell, sondern V3 wurde durch Reinforcement Learning zum **Reasoner** gemacht — also kann komplexe Schritt-für-Schritt-Probleme lösen, wie OpenAIs o1.
> - **R1-Distill**: Das Reasoning aus R1 wurde in kleinere Modelle (1,5 bis 70 Mrd Parameter) destilliert — die laufen sogar auf einem normalen Laptop.

**Hinweis:** Die markierten Zeilen (V2, V3, R1) sind die wichtigsten — auf die kommt Daniel im 2. Teil zurück.

**Mögliche Prof-Frage:** *„Was bedeutet ‚aktiv pro Token'?"*
**Antwort:** Bei MoE-Modellen wird für jedes Wort nur eine Teilmenge der Parameter berechnet (z. B. 9 von 257 Experten pro Layer). Das spart massiv Rechenzeit beim Inferenzieren.

## Folie 7: Basisarchitektur

**Was du sagen musst (60 Sek):**

> Bevor wir zu den Innovationen kommen, kurz die Basis. DeepSeek orientiert sich am LLaMA-Design von Meta. Das sind die Standardkomponenten moderner Decoder-only Transformer:
>
> - **Pre-Norm + RMSNorm**: Normalisierung VOR der Attention (statt danach) — stabilisiert das Training.
> - **SwiGLU**: Eine Activation-Function im Feed-Forward-Block, hat sich gegen ReLU/GELU durchgesetzt.
> - **RoPE**: Rotary Position Embedding — codiert die Position eines Wortes durch Rotation im Vektorraum statt absoluter Position.
> - **BPE-Tokenizer**: Zerlegt Text in Sub-Wort-Einheiten (z. B. „intelligent" → „intel" + „lig" + „ent").
> - **GQA** beim 67B-Modell: Grouped Query Attention — eine effiziente Variante der Attention.
>
> **Wichtig:** Bis hierhin macht DeepSeek nichts Neues. Der innovative Teil beginnt ab V2 — und genau dort übernimmt Daniel.

**Übergang zu Daniel:** *„Daniel zeigt uns jetzt, was DeepSeek architektonisch wirklich Neues mitbringt."*

---

# TEIL 2 — Daniel (Innovations, ~5 Min)

## Folie 8: Chapter Intro „Key Innovations"
*Übergang.* (5 Sek)

## Folie 9: Multi-Head Latent Attention (MLA)

**Was Daniel sagen muss (75 Sek):**

> Das Hauptproblem moderner LLMs ist nicht das Training, sondern das **Inferenzieren** — also wenn ein Nutzer eine Frage stellt. Bei langen Kontexten (z. B. 128.000 Tokens) wächst der **KV-Cache** so stark, dass selbst Server-GPUs an ihre Grenzen kommen.
>
> Warum? Bei normaler **Multi-Head Attention** speichert das Modell für JEDES Token in der Sequenz und für JEDEN Attention-Head zwei Vektoren: Key und Value. Bei 32 Heads × 128k Tokens sind das Gigabytes pro Anfrage.
>
> Bisherige Lösungen:
> - **MQA** (Shazeer 2019): Alle Heads teilen sich EINEN K/V-Satz — klein, aber Qualitätsverlust.
> - **GQA** (Llama 2): Kompromiss — Gruppen von Heads teilen K/V.
>
> **DeepSeeks Lösung — MLA**: Statt K und V direkt zu speichern, werden sie in einen **kleinen latenten Vektor c** komprimiert. Bei der Inferenz wird c durch Up-Projektion zurück in K und V aufgefaltet. Im Cache liegt also nur das komprimierte c, nicht das volle K/V.
>
> **Ergebnis**: KV-Cache **93,3 % kleiner** bei gleicher Qualität. Inferenz-Durchsatz **5,76× schneller** als V1-67B.

**Vereinfachte Analogie:** *Stell dir vor, du müsstest 100 Bücher mit dir tragen. MHA = jedes Buch einzeln. MLA = du komprimierst sie in einen ZIP-Archive und entpackst nur das, was du gerade liest.*

**Mögliche Prof-Frage:** *„Wo geht durch die Kompression Information verloren?"*
**Antwort:** Die Down-/Up-Projektion ist gelernt — das Modell lernt während des Trainings, welche Informationen wichtig sind. Empirisch zeigt sich: kaum Qualitätsverlust.

## Folie 10: DeepSeekMoE

**Was Daniel sagen muss (75 Sek):**

> Mixture of Experts ist nicht neu — Mixtral und GPT-4 nutzen es auch. Die Idee: Statt EINEM großen Feed-Forward-Block hat man N kleinere „Experten", und ein Router entscheidet pro Token, welche aktiviert werden.
>
> **Standard-MoE** (z. B. Mixtral): 8 Experten, davon 2 aktiv pro Token. Funktioniert, hat aber zwei Probleme:
> 1. Die 8 Experten lernen oft Ähnliches — Redundanz.
> 2. Lastverteilung schwierig — manche Experten werden überlastet, andere ungenutzt.
>
> **DeepSeekMoE bringt zwei Innovationen:**
>
> 1. **Fine-grained Segmentation**: Statt 8 große Experten → **256 kleine Experten**, davon **8 aktiv**. Die feinere Aufteilung erlaubt mehr Spezialisierung.
>
> 2. **Shared Experts**: 1 Experte ist IMMER aktiv für jedes Token. Er lernt das **Grundwissen** (Grammatik, allgemeines Sprachverständnis). Die anderen 256 spezialisieren sich auf spezifische Themen — kein Wissen mehr doppelt gespeichert.
>
> **V3 konkret**: 1 shared + 8 von 256 routed = 9 aktive Experten pro Token. Damit sind nur **37 von 671 Milliarden** Parametern aktiv — 5,5 %.
>
> **Bonus**: **Auxiliary-loss-free Load Balancing**. Normalerweise erzwingt man Lastverteilung über einen Hilfsverlust, der aber die Modellqualität verschlechtert. V3 nutzt stattdessen einen dynamischen Bias pro Experte — der Router lernt automatisch ohne Qualitätskompromiss.

## Folie 11: Multi-Token Prediction (MTP)

**Was Daniel sagen muss (60 Sek):**

> Klassisches Training: Ein LLM sagt an jeder Position das **nächste** Token voraus. Cross-Entropy-Loss, fertig.
>
> **MTP-Idee**: Sage NICHT nur das nächste Token vorher, sondern auch das **übernächste** — und gewichte beide im Loss.
>
> **Warum hilft das?**
>
> 1. **Beim Training**: Jedes Token liefert mehr Lernsignal. Das Modell lernt **Planung über mehrere Schritte**.
> 2. **Bei der Inferenz**: Das MTP-Modul schlägt Token t+2 schon vorab vor — das Hauptmodell muss nur noch verifizieren. Das nennt sich **Speculative Decoding**. Resultat: bis zu **1,8× schnellere Textgenerierung** bei ~85 % Acceptance-Rate.
>
> **Wichtig**: Im Pre-Training ist die MTP-Loss-Gewichtung nur 0,3 — also sekundär. Das Hauptziel bleibt next-token prediction.

**Vereinfachte Analogie:** *Wie wenn ein Schachspieler nicht nur den nächsten Zug, sondern auch den übernächsten plant — bessere Strategie, schnellere Entscheidungen.*

## Folie 12: Trainingseffizienz

**Was Daniel sagen muss (60 Sek):**

> Drei technische Tricks, die die Trainingskosten dramatisch senken:
>
> **1. FP8 Mixed-Precision Training**: KI-Modelle wurden bisher in FP16 oder BF16 trainiert (16-Bit-Zahlen). **FP8 halbiert die Speichermenge und verdoppelt den Durchsatz** — aber numerische Stabilität wird kritisch. DeepSeek löst das durch *fine-grained quantization* (kleine Blöcke statt ganze Tensoren) und FP32-Akkumulation. V3 ist das **erste große Modell**, das so trainiert wurde.
>
> **2. DualPipe**: Bei großen Modellen wird die Berechnung auf viele GPUs verteilt (Pipeline Parallelism). Normalerweise entstehen dabei **Bubbles** — Zeiten, in denen GPUs leerlaufen, weil sie auf Daten warten. DualPipe überlappt **Berechnung und Kommunikation** so geschickt, dass praktisch keine Idle-Zeit bleibt.
>
> **3. Kostenresultat**: V3 wurde mit **2.788k H800-GPU-Stunden** trainiert — das entspricht ca. **5,6 Mio. USD**. GPT-4 wird auf über 100 Mio. USD geschätzt.

## Folie 13: DeepSeek-R1 — Reasoning

**Was Daniel sagen muss (75 Sek):**

> R1 ist das spannendste Modell von 2025. Es geht um **Reasoning** — also Schritt-für-Schritt-Denken bei Mathe und Code, vergleichbar mit OpenAIs o1.
>
> **R1-Zero** (links): Reines Reinforcement Learning auf V3-Base, **OHNE jedes Supervised Fine-Tuning**. Das Besondere:
> - **GRPO** statt PPO als RL-Algorithmus — spart das Value-Modell ein, ist effizienter.
> - **Reward ist regelbasiert**: bei Mathe → ist die Lösung korrekt? Bei Code → kompiliert/läuft der Test? Kein Human-Feedback nötig.
> - **„Aha-Moment"**: Das Modell lernt **selbstständig**, längere Chains-of-Thought zu nutzen und Fehler zu korrigieren — emergent, nicht antrainiert.
> - Schwäche: Sprache wird gemischt (DE/EN/ZH), schwer lesbar.
>
> **R1** (rechts): Behebt die Lesbarkeit. 4-stufige Pipeline:
> 1. Cold-Start-SFT mit menschlich kuratierten Reasoning-Daten
> 2. RL wie bei R1-Zero
> 3. Rejection-Sampling: gute Antworten werden gesammelt → erneutes SFT auf 600k Beispielen
> 4. Finales RL über alle Szenarien
>
> Resultat: **o1-vergleichbare** Performance auf AIME, MATH, Codeforces.
>
> **R1-Distill**: Das Reasoning aus R1 wurde in kleine Modelle übertragen (z. B. Llama-70B oder Qwen-1,5B). R1-Distill-Llama-70B **übertrifft o1-mini** auf den meisten Benchmarks.

**Mögliche Prof-Frage:** *„Was ist GRPO?"*
**Antwort:** Group Relative Policy Optimization. Wie PPO (Standard-RL für LLMs), aber statt eines separaten Value-Modells werden Rewards einer Gruppe von Antworten zueinander normalisiert. Spart Speicher und ist stabiler.

**Mögliche Prof-Frage:** *„Was bedeutet ‚Distillation'?"*
**Antwort:** Ein kleines Modell wird darauf trainiert, die Outputs eines großen Modells zu imitieren. Das große Modell ist der Lehrer, das kleine der Schüler.

---

# TEIL 3 — Zusammen

## Folie 14: Chapter Intro „Zusammenfassung"

## Folie 15: Drei Kernaussagen

**Wer auch immer den Schluss übernimmt (30 Sek):**

> Drei Kernaussagen zum Mitnehmen:
>
> 1. **Architektur statt Skalierung**: MLA und MoE zeigen, dass clevere Architektur mehr bringt als nur mehr Parameter.
> 2. **Trainingsökonomie als Forschungsziel**: FP8, DualPipe, aux-loss-free Load Balancing — alles zielt auf günstigeres Training. Das demokratisiert KI-Forschung.
> 3. **Reasoning ohne menschliches Feedback**: R1-Zero ist ein Meilenstein — komplexes Denken kann allein durch regelbasierte Rewards emergent entstehen.

## Folie 16: Quellen
*„Alle Tech Reports sind auf arXiv frei verfügbar. Modelle auf HuggingFace und GitHub. Wir freuen uns auf Fragen."*

---

# Tipps zum Vortrag

## Technisches
- **Stoppuhr nutzen**: Übe bis du in 5 Min durchkommst (Leon: Folien 1–7, Daniel: 8–13).
- **Folie 6 (Tabelle)**: Nicht alles vorlesen — auf 3 wichtige Zeilen zeigen (V2, V3, R1).
- **Folie 9 (MLA)**: Die Formel nur nennen, nicht erklären. Wichtig ist der Effekt (–93 %).

## Inhaltlich
- **Wenn dich der Prof fragt** und du es nicht weißt: *„Das müssten wir nochmal im Originalpaper nachschlagen."* — Besser als Raten.
- **Halte die Story**: Architektur > Skalierung. Effizienz > Größe. Open Weights > Closed.

## Fallen
- **Verwechsele nicht**: V3 = Foundation Model (kein Reasoning), R1 = Reasoning auf V3-Base aufgesetzt.
- **MoE-Zahlen**: 671B gesamt, 37B aktiv, nicht „37B Modell".
- **Open-Weight ≠ Open-Source**: Die Gewichte sind frei, der Trainings-Code teilweise — die genauen Trainingsdaten **nicht**.

## Wahrscheinlichste Prof-Fragen
1. *„Wie unterscheidet sich DeepSeek von Llama?"* → MLA + DeepSeekMoE + MTP. Llama ist dense und nutzt GQA.
2. *„Warum war DeepSeek so günstig?"* → MoE (nur 5,5 % aktiv), FP8 (halbierter Speicher), DualPipe (keine GPU-Idle).
3. *„Was ist der wichtigste Beitrag?"* → Diskutabel. Wirtschaftlich: FP8 + MoE-Effizienz. Wissenschaftlich: R1-Zeros „Aha-Moment".
4. *„Wie verhält sich R1 zu OpenAI o1?"* → Vergleichbare Performance auf Reasoning-Benchmarks, R1 ist offen, o1 closed.

---

**Viel Erfolg! 🚀**
