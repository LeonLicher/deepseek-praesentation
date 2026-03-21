import {
  reactive,
  computed,
  type Reactive,
  type ComputedRef,
  type ComponentInternalInstance
} from 'vue'

interface FootnoteItem {
  number: number
  text: string
}

interface FootnoteState {
  items: Map<string, FootnoteItem>
  counter: number
}

const slideFootnotes = new WeakMap<ComponentInternalInstance, Reactive<FootnoteState>>()

export const provideFootnotes = (slideContext: ComponentInternalInstance) => {
  if (!slideFootnotes.has(slideContext)) {
    slideFootnotes.set(
      slideContext,
      reactive<FootnoteState>({
        items: new Map(),
        counter: 0
      })
    )
  }

  const state = slideFootnotes.get(slideContext)!

  const register = (text: string): number => {
    const id = text
    if (!state.items.has(id)) {
      state.counter++
      state.items.set(id, { number: state.counter, text })
    }
    return state.items.get(id)!.number
  }

  const footnotes: ComputedRef<FootnoteItem[]> = computed(() => {
    return Array.from(state.items.values()).sort((a, b) => a.number - b.number)
  })

  return { register, footnotes }
}
