<script setup>
defineProps({
  metrics: {
    type: Array,
    required: true
  },
  proBullets: {
    type: Array,
    required: true
  },
  flashBullets: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="fact-sheet">
    <div class="metric-grid">
      <article v-for="metric in metrics" :key="metric.label" class="metric-card">
        <p class="metric-value">{{ metric.value }}</p>
        <p class="metric-label">{{ metric.label }}</p>
      </article>
    </div>

    <div class="model-grid">
      <article class="model-panel pro">
        <h3>DeepSeek-V4-Pro</h3>
        <p class="tagline">Flagship für Reasoning, Knowledge und Agentic Coding</p>
        <ul>
          <li v-for="bullet in proBullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </article>

      <article class="model-panel flash">
        <h3>DeepSeek-V4-Flash</h3>
        <p class="tagline">Effizienz-Variante: kleiner, schneller, günstiger</p>
        <ul>
          <li v-for="bullet in flashBullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </article>
    </div>
  </div>
</template>

<style scoped>
.fact-sheet {
  display: flex;
  flex-direction: column;
  gap: 1.55rem;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1.1rem;
}

.metric-card {
  min-height: 5.3rem;
  padding: 1rem 1rem 0.85rem;
  border-left: 5px solid #4d66f6;
  border-radius: 0.45rem;
  background: #f4f6fb;
  box-shadow: 0 8px 18px rgb(15 23 42 / 0.08);
}

.metric-card:nth-child(3) {
  border-left-color: #26c6d0;
}

.metric-value {
  margin: 0;
  color: #111a34;
  font-size: 2rem;
  font-weight: 800;
  line-height: 1;
}

.metric-label {
  margin: 0.85rem 0 0;
  color: #53617c;
  font-size: 0.72rem;
}

.model-grid {
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  gap: 1.5rem;
}

.model-panel {
  min-height: 13.1rem;
  padding: 1.5rem 1.65rem;
  border-radius: 0.45rem;
  box-shadow: 0 10px 24px rgb(15 23 42 / 0.1);
}

.model-panel h3 {
  margin: 0;
  font-size: 1.45rem;
  font-weight: 800;
}

.tagline {
  margin: 0.7rem 0 1.55rem;
  font-size: 0.78rem;
  font-style: italic;
}

ul {
  margin: 0;
  padding-left: 1.15rem;
}

li {
  margin-top: 0.58rem;
  font-size: 0.9rem;
  line-height: 1.3;
}

.pro {
  background: #07112e;
  color: #f8fbff;
}

.pro .tagline {
  color: #21d5e5;
}

.flash {
  background: #f4f6fb;
  color: #17223d;
}

.flash .tagline {
  color: #4d66f6;
}
</style>
