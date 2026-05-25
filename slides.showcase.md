---
theme: default
highlighter: shiki
favicon: /images/favicon.png
title: DeepSeek Component Showcase
fonts:
  sans: 'Nunito Sans'
  serif: 'Nunito Sans'
  mono: 'Fira Code'
  weights: '400, 500, 600,700'
presentationInfo:
  title: 'DeepSeek Slidev Components'
  subtitle: 'Showcase aller Komponenten und Layouts'
  semester: 'Summer Semester 2026'
  authors:
    - name: 'Project Maintainer'
      matrikelnummer: '0000000'
      email: 'maintainer@example.com'
  chapters:
    - number: 1
      title: 'Core Components'
    - number: 2
      title: 'Data Components'
    - number: 3
      title: 'Layout Components'
---
layout: cover

---
layout: chapter-intro
chapter: 1

---
title: Text, HighlightedText, SubText
subtitle: Basic text building blocks
chapter: 1
---

<Text title="Text + HighlightedText">
  This is a <HighlightedText>highlighted phrase</HighlightedText> inside body text.
</Text>

<BulletedList title="BulletedList">
  <li>
    First bullet
    <SubText>Additional context with SubText component.</SubText>
  </li>
  <li>Second bullet</li>
  <li>
    Third bullet with nested list
    <ul>
      <li>Nested point A</li>
      <li>Nested point B</li>
    </ul>
  </li>
</BulletedList>

---
title: NumberedList, NumberBadge, Outline, OutlineItem
subtitle: Numbering and progression visuals
chapter: 1
---

<Columns columns="1fr 1fr" gap="1.5rem">
  <NumberedList title="NumberedList" size="md" :start="3">
    <li>Third step starts with custom index</li>
    <li>
      Fourth step
      <SubText>Optional support text in each item.</SubText>
    </li>
  </NumberedList>

  <div class="space-y-3">
    <SectionTitle text="NumberBadge + Outline" />
    <div class="flex gap-2">
      <NumberBadge :number="1" :active="true" />
      <NumberBadge :number="2" />
      <NumberBadge :number="3" :disabled="true" />
    </div>
    <Outline>
      <OutlineItem :number="1" :active="true">Active item</OutlineItem>
      <OutlineItem :number="2">Upcoming item</OutlineItem>
      <OutlineItem :number="3" :disabled="true">Disabled item</OutlineItem>
    </Outline>
  </div>
</Columns>

---
title: DefinitionBox, ExampleBox, Quotebox, Divider, Todo
subtitle: Content highlight components
chapter: 1
---

<DefinitionBox title="Definition" source="Sample Source (2026)">
  A concise formal definition can be presented in this component.
</DefinitionBox>

<Divider :length="100" color="border-fh-orange" thickness="border-t-2" class="my-4" />

<ExampleBox title="Example" source="Example Source (2026)">
  This is an example statement to show stylized explanatory content.
</ExampleBox>

<div class="mt-3">
  <Quotebox source="Quoted Author (2026)">
    Good design systems enable both consistency and velocity.
  </Quotebox>
</div>

<div class="mt-3">
  <Todo text="Replace placeholder text for final deck" />
</div>

---
layout: chapter-intro
chapter: 2

---
title: Table + CitationTable
subtitle: Structured and referenced data
chapter: 2
---

<Table
  :headers="['Aspect', 'Detail']"
  :rows="[
    ['Theme', 'Reusable Slidev component system'],
    ['Compatibility', 'Designed for architecture-focused module presentations'],
    ['Output', 'Fast generation with consistent visuals']
  ]"
  :columnWidths="['30%', '70%']"
  accent="gray"
  :highlights="[1, 2]"
  caption="Table caption with optional <em>formatting</em>."
/>

<div class="mt-4">
  <CitationTable
    title="CitationTable"
    :citations="[
      { id: '1', text: 'Slidev documentation. https://sli.dev/' },
      { id: '2', text: 'Vue documentation. https://vuejs.org/' }
    ]"
    idWidth="90px"
  />
</div>

---
title: Image + FigureList + Footnote
subtitle: Figures and references
chapter: 2
footnotes:
  - 'Static footnote from frontmatter'
---

<Columns columns="1fr 1fr" gap="1.25rem">
  <Image
    src="/images/logo.png"
    alt="Project logo"
    caption="Logo example"
    source="Project assets"
    captionAlign="left"
    maxWidth="100%"
    height="210px"
  />
  <Image
    src="/images/fh-logo.jpg"
    alt="FH logo"
    caption="University logo"
    source="FH Münster"
    captionAlign="left"
    maxWidth="100%"
    height="210px"
  />
</Columns>

<Text>
  Dynamic inline footnote marker appears here<Footnote text="Inline dynamic footnote example" />.
</Text>

<div class="mt-3">
  <FigureList title="FigureList" />
</div>

---
layout: chapter-intro
chapter: 3

---
title: appendix-desktop layout
subtitle: Single desktop screenshot style
layout: appendix-desktop
chapter: 3
---

<Image
  src="/images/abstract_gitter.png"
  alt="Desktop style visual"
  maxWidth="100%"
  height="420px"
/>

---
title: appendix-mobile layout
subtitle: 3-column mobile screenshot style
layout: appendix-mobile
chapter: 3
---

<Image src="/images/logo.png" alt="Mobile visual 1" maxWidth="90%" height="360px" />
<Image src="/images/logo.png" alt="Mobile visual 2" maxWidth="90%" height="360px" />
<Image src="/images/logo.png" alt="Mobile visual 3" maxWidth="90%" height="360px" />

---
title: appendix-screenshots layout
subtitle: 2-column screenshot comparison
layout: appendix-screenshots
chapter: 3
---

<Image src="/images/footer-background.png" alt="Screenshot left" maxWidth="100%" height="320px" />
<Image src="/images/abstract_gitter.png" alt="Screenshot right" maxWidth="100%" height="320px" />

---
layout: closing
---
