<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  import { useCreateTodoMutation } from '$lib/svelte-query/domains/todos/useCreateTodoMutation'
  import { getModalStore } from '@skeletonlabs/skeleton'

  export let parent: SvelteComponent

  const modalStore = getModalStore()

  const createTodoMutation = useCreateTodoMutation()

  let descriptionInput = ''

  function handleSubmit() {
    $createTodoMutation.mutate(
      {
        description: descriptionInput,
      },
      {
        onSuccess: () => {
          modalStore.close()
        },
      },
    )
  }
</script>

{#if $modalStore[0]}
  <div class="modal-example-form card w-modal space-y-4 p-4 shadow-xl">
    <header class="text-2xl font-bold">
      {$modalStore[0].title ?? 'Create to-do item'}
    </header>
    <textarea
      bind:value={descriptionInput}
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
