<script lang="ts">
  import { useUpdateTodoMutation } from '$lib/svelte-query/domains/todos/useUpdateTodoMutation'
  import type { GetUserTodos200Item } from '../../../../../orval/myAPI.schemas'
  import TodoMoreIcon from './TodoMoreIcon/TodoMoreIcon.svelte'

  export let item: GetUserTodos200Item

  const updateTodoMutation = useUpdateTodoMutation()
</script>

<div class="TodoListItem group">
  <div class="flex items-center justify-between">
    <div class="flex items-center space-x-2">
      <input
        class="checkbox"
        type="checkbox"
        on:change={() =>
          $updateTodoMutation.mutate({
            todoId: item.id,
            data: {
              doneAt: item.doneAt ? null : new Date().toISOString(),
            },
          })}
        checked={Boolean(item.doneAt)}
      />

      <p class={item.doneAt ? 'text-gray-400 line-through' : ''}>
        {item.description}
      </p>
    </div>
    <TodoMoreIcon {item} />
  </div>
</div>
