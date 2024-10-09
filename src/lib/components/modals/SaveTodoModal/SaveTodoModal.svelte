<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  import { useCreateTodoMutation } from '$lib/svelte-query/domains/todos/useCreateTodoMutation'
  import { useUpdateTodoMutation } from '$lib/svelte-query/domains/todos/useUpdateTodoMutation'
  import { useSaveTodoModalStore } from './useSaveTodoModalStore'

  export let parent: SvelteComponent

  const { value, isOpen, closeModal } = useSaveTodoModalStore()

  const submitCreate = useCreateTodoMutation()
  const submitUpdate = useUpdateTodoMutation()

  function handleSubmit() {
    if ($value.id) {
      $submitUpdate.mutate(
        {
          todoId: $value.id,
          data: {
            description: $value.description,
          },
        },
        {
          onSuccess: () => {
            closeModal()
          },
        },
      )
      return
    }
    $submitCreate.mutate(
      {
        description: $value.description,
      },
      {
        onSuccess: () => {
          closeModal()
        },
      },
    )
  }
</script>

{#if $isOpen}
  <div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
    <header class="text-2xl font-bold">
      {$value.id ? 'Edit to-do item' : 'Create to-do item'}
    </header>
    <textarea
      bind:value={$value.description}
      placeholder="Enter a to-do item"
      class="input resize-none"
      on:keydown={(e) => {
        if (e.key === 'Enter') {
          handleSubmit()
        }
      }}
    />
    <footer class="modal-footer">
      <button class="btn {parent.buttonPositive}" on:click={handleSubmit}
        >Save</button
      >
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}
        >{parent.buttonTextCancel}</button
      >
    </footer>
  </div>
{/if}
