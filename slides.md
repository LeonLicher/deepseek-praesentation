---
theme: default
highlighter: shiki
favicon: /images/favicon.png
title: Module Presentation
fonts:
  sans: 'Nunito Sans'
  serif: 'Nunito Sans'
  mono: 'Fira Code'
  weights: '400, 500, 600,700'
presentationInfo:
  title: 'Your Module Title'
  subtitle: 'Your presentation subtitle'
  semester: 'Summer Semester 2026'
  authors:
    - name: 'Your Name'
      matrikelnummer: '1234567'
      email: 'name@example.com'
  chapters:
    - number: 1
      title: 'Introduction'
    - number: 2
      title: 'Main Part'
---
layout: cover

---
layout: chapter-intro
chapter: 1

---
title: Example Slide
subtitle: Reuse your shared layout and components
chapter: 1
---

<Text title="Reusable Slidev Theme">
  This repository contains reusable <HighlightedText>layouts</HighlightedText>,
  <HighlightedText>components</HighlightedText>, and <HighlightedText>styles</HighlightedText>
  for your study modules.
</Text>

<BulletedList>
  <li>Use this repo as template for new module presentations</li>
  <li>Adapt only the content in slides.md and public assets</li>
  <li>Keep shared components/layouts centralized here</li>
</BulletedList>

---
layout: closing
---
