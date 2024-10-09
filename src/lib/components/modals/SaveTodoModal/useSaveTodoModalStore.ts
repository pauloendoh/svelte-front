import { getModalStore } from '@skeletonlabs/skeleton'
import { writable } from 'svelte/store'
import SaveTodoModal from './SaveTodoModal.svelte'

type ModalValue = {
  description: string
  id?: number
}

const buildEmptyModalValue = (): ModalValue => ({
  description: '',
})

const value = writable<ModalValue>(buildEmptyModalValue())

const isOpen = writable(false)

export const useSaveTodoModalStore = () => {
  const modalStore = getModalStore()

  return {
    value,
    isOpen: isOpen,
    subscribe: isOpen.subscribe,
    openModal: (item?: ModalValue) => {
      value.set(item ?? buildEmptyModalValue())
      isOpen.set(true)
      modalStore.trigger({
        type: 'component',
        component: SaveTodoModal.name,
      })
    },
    closeModal: () => {
      isOpen.set(false)
      modalStore.close()
    },
  }
}
