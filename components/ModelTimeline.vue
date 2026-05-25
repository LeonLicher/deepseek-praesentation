<script setup>
defineProps({
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="timeline-wrap">
    <div class="timeline-line" />
    <div class="timeline-grid">
      <div v-for="item in items" :key="item.title" class="timeline-item">
        <span :class="['timeline-dot', item.active && 'active']" />
        <article :class="['timeline-card', item.active && 'active']">
          <p class="timeline-date">{{ item.date }}</p>
          <h3>{{ item.title }}</h3>
          <p class="timeline-detail">{{ item.detail }}</p>
        </article>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-wrap {
  position: relative;
  padding-top: 0.5rem;
}

.timeline-line {
  position: absolute;
  top: 0.92rem;
  left: 4.5rem;
  right: 4.5rem;
  height: 3px;
  border-radius: 999px;
  background: #dbe3f0;
}

.timeline-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 1.25rem;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.timeline-dot {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 999px;
  background: #26c6d0;
  box-shadow: 0 0 0 4px #fff;
  z-index: 1;
}

.timeline-dot.active {
  background: #4f67ff;
}

.timeline-card {
  width: 100%;
  min-height: 16.8rem;
  margin-top: 1.65rem;
  padding: 1.35rem 0.95rem;
  border-radius: 0.45rem;
  background: #eef2fa;
  box-shadow: 0 10px 22px rgb(15 23 42 / 0.1);
  color: #17223d;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.timeline-card.active {
  background: #4d66f6;
  color: #fff;
}

.timeline-date {
  margin: 0 0 1.35rem;
  font-size: 0.78rem;
  font-weight: 700;
  color: #4f67ff;
}

.timeline-card.active .timeline-date {
  color: #dbeafe;
}

h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.25;
}

.timeline-detail {
  margin: auto 0 0;
  padding-top: 1rem;
  font-size: 0.78rem;
  line-height: 1.35;
  color: #697794;
}

.timeline-card.active .timeline-detail {
  color: #eef4ff;
}
</style>
