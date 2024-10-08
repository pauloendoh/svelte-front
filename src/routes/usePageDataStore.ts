import { writable } from 'svelte/store'
import type { PageData } from './$types'

const store = writable<PageData | undefined>()

export function usePageDataStore() {
  return {
    subscribe: store.subscribe,
    set: (data: PageData) => store.set(data),
  }
}
