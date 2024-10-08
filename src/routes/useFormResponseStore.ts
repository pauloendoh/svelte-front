import { writable } from 'svelte/store'
import type { ActionData } from './$types'

const store = writable<ActionData | undefined>()

export function useFormResponseStore() {
  return {
    subscribe: store.subscribe,
    set: (data: ActionData) => store.set(data),
  }
}
