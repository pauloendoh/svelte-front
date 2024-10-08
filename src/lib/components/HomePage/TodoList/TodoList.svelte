<script lang="ts">
  import LoadingSpinner from '$lib/components/_shared/utils/LoadingSpinner/LoadingSpinner.svelte'
  import { useTodosQuery } from '$lib/svelte-query/domains/todos/useTodosQuery'
  import TodoListItem from './TodoListItem/TodoListItem.svelte'

  export let type: 'to-do' | 'completed'

  const allTodosQuery = useTodosQuery()

  $: todos =
    $allTodosQuery.data
      ?.filter((todo) => {
        if (type === 'to-do') {
          return !todo.doneAt
        }

        return todo.doneAt
      })
      .sort((a, b) => {
        if (type === 'to-do') {
          return a.createdAt > b.createdAt ? 1 : -1
        }
        const doneAtA = a.doneAt ?? ''
        const doneAtB = b.doneAt ?? ''
        return new Date(doneAtA) > new Date(doneAtB) ? -1 : 1
      }) ?? []
</script>

<div class="TodosList">
  <h1 class="h3">
    {type === 'to-do' ? 'To-do' : 'Completed'}
  </h1>

  <div class="mt-2 flex flex-col">
    {#if $allTodosQuery.isLoading}
      <LoadingSpinner loading />
    {:else if todos.length === 0}
      <div class="text-gray-400">Nothing to show here</div>
    {:else}
      <div class="flex flex-col gap-4">
        {#each todos as todo (todo.id)}
          <TodoListItem item={todo} />
        {/each}
      </div>
    {/if}
  </div>
</div>
