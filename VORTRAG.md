# Vortrags- und Recherche-Briefing

Arbeitsdokument für die spätere Neuerstellung der Präsentation. Diese Datei ist **nicht** die finale Rede, sondern sammelt Anforderungen, Rechercheentscheidungen, Timing und mögliche Prüfungsfragen.

## Aufgabenstellung

- Veranstaltung: Machine and Deep Learning II
- Kapitelkontext: Transformer Architectures II
- Thema: DeepSeek Modellfamilie / Modellsammlung
- Team: 2 Studierende
- Zeit: 10 Minuten insgesamt, also ca. 5 Minuten pro Person
- Umfang: 10 Hauptfolien, optional Anhang
- Pflicht: sauber zitieren
- Pflicht: zuerst Modellübersicht
- Pflicht: danach das aktuellste und benchmark-stärkste passende DeepSeek-Modell fokussieren
- Pflicht: originale Model Card im Anhang
- Schwerpunkt: Architektur, nicht Unternehmensgeschichte oder Produktmarketing

## Noch zu entscheiden

| Entscheidung | Status | Notizen |
|---|---|---|
| Finaler Modellfokus | Offen | Vor Erstellung online aus Primärquellen prüfen. |
| Teamnamen und Matrikelnummern | Offen | In `slides.md` Frontmatter eintragen. |
| Exakte Quellenbasis | Offen | DeepSeek Reports, Hugging Face, GitHub, arXiv. |
| Sprecheraufteilung | Vorschlag | Person 1: Folien 1-5, Person 2: Folien 6-10. |
| Model-Card-Format im Anhang | Offen | Screenshot, offizieller Auszug oder source-faithful Nachbildung. |

## Recherche-Checkliste

Vor der finalen Folienerstellung prüfen:

- Welche DeepSeek-Modelle sind aktuell verfügbar?
- Welches Modell ist das neueste relevante Release?
- Welches Modell ist in den relevanten Benchmarks am stärksten?
- Sind "neuestes" und "benchmark-stärkstes" Modell identisch?
- Welche Architekturmerkmale sind zentral?
- Welche Zahlen sind sicher belegt: Parameter, aktive Parameter, Kontextlänge, Trainingsdaten, GPU-Stunden, Kosten, Benchmarkwerte?
- Welche Lizenz und Nutzungsgrenzen nennt die offizielle Model Card?
- Welche Claims gehören in den Hauptteil, welche in den Anhang?

## Primärquellen-Protokoll

| Claim | Quelle | URL/arXiv | Datum/Zugriff | Ziel-Folie |
|---|---|---|---|---|
| Modell ist aktuelles Release | TODO | TODO | TODO | 2-3 |
| Modell ist benchmark-stark | TODO | TODO | TODO | 3, 9 |
| Architekturdetail Attention | TODO | TODO | TODO | 5 |
| Architekturdetail MoE/Sparse Compute | TODO | TODO | TODO | 6 |
| Training/Inferenz-Effizienz | TODO | TODO | TODO | 7 |
| Post-Training/Reasoning | TODO | TODO | TODO | 8 |
| Model Card | TODO | TODO | TODO | Anhang A |

## 10-Folien-Timing

| Folie | Inhalt | Sprecher | Zielzeit |
|---|---|---|---|
| 1 | Cover | Beide | 0:20 |
| 2 | Modellfamilie | Person 1 | 1:00 |
| 3 | Ausgewähltes Modell + Model-Card-Summary | Person 1 | 1:00 |
| 4 | Transformer-Basis | Person 1 | 1:00 |
| 5 | Attention/Kontext | Person 1 | 1:30 |
| 6 | MoE/Sparse Compute | Person 2 | 1:30 |
| 7 | Training/Inferenz | Person 2 | 1:15 |
| 8 | Reasoning/Post-Training | Person 2 | 1:15 |
| 9 | Benchmarks/Grenzen | Person 2 | 0:50 |
| 10 | Takeaways | Beide | 0:20 |

Summe: ca. 10 Minuten. Beim Üben pro Person auf ca. 5 Minuten kürzen.

## Redeprinzip

Jede Folie sollte in einem Satz beantwortbar sein:

> Welche Architekturentscheidung macht DeepSeek hier, welches Problem löst sie, und welcher belegte Effekt entsteht?

## Erwartbare Fragen

| Frage | Antwort vorbereiten |
|---|---|
| Warum genau dieses DeepSeek-Modell? | Mit Release-Status, Benchmarks und Quellen begründen. |
| Was ist wirklich Architektur und was ist Training? | Basismodell, Attention, MoE, Systemdesign, Post-Training sauber trennen. |
| Was bedeutet "aktive Parameter"? | Nur eine geroutete Teilmenge der MoE-Parameter wird pro Token berechnet. |
| Wie fair sind die Benchmarks? | Benchmarkversion, Vergleichsmodelle und Quelle nennen; Grenzen offen ansprechen. |
| Ist Open-Weight dasselbe wie Open-Source? | Nein. Gewichte/Lizenz, Code und Trainingsdaten getrennt betrachten. |
| Wo ist die originale Model Card? | Im Anhang mit Quelle und Zugriffsdatum. |

## Qualitätskriterien für die finale Version

- Genau 10 Hauptfolien.
- Keine alten, ungeprüften Zahlen.
- Jeder numerische Claim hat eine Quelle.
- Keine überfüllten Tabellen im Hauptteil.
- Architektur steht klar vor Historie, Kosten und Hype.
- Appendix enthält Model Card und vollständige Bibliografie.
