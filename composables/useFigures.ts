import { reactive, ref, computed, nextTick } from 'vue'

interface Figure {
  id: string
  src: string
  alt: string
  caption: string
  source: string
}

const figures = reactive(new Map<string, Figure>())
const figureNumbers = ref(new Map<string, number>())

function recalculateNumbers() {
  nextTick(() => {
    const els = document.querySelectorAll('[data-figure-id]')
    const newNumbers = new Map<string, number>()
    els.forEach((el, index) => {
      const id = el.getAttribute('data-figure-id')
      if (id) newNumbers.set(id, index + 1)
    })
    figureNumbers.value = newNumbers
  })
}

export const useFigures = () => {
  const registerFigure = (uniqueId: string, figure: Omit<Figure, 'id'>) => {
    if (!figures.has(uniqueId)) {
      figures.set(uniqueId, { id: uniqueId, ...figure })
    }
    recalculateNumbers()

    return computed(() => ({
      id: uniqueId,
      number: figureNumbers.value.get(uniqueId) ?? 0
    }))
  }

  const getFigures = () => {
    const els = document.querySelectorAll('[data-figure-id]')
    return Array.from(els)
      .map(el => figures.get(el.getAttribute('data-figure-id')!))
      .filter(Boolean) as Figure[]
  }

  const clearFigures = () => {
    figures.clear()
    figureNumbers.value = new Map()
  }

  const hasFigure = (uniqueId: string) => figures.has(uniqueId)

  return { registerFigure, getFigures, clearFigures, hasFigure }
}
