<script lang="ts">
  import { useSaveTodoModalStore } from '$lib/components/modals/SaveTodoModal/useSaveTodoModalStore'
  import { useDeleteTodoMutation } from '$lib/svelte-query/domains/todos/useDeleteTodoMutation'
  import Icon from '@iconify/svelte'
  import { popup } from '@skeletonlabs/skeleton'
  import type { GetUserTodos200Item } from '../../../../../../orval/myAPI.schemas'
  export let item: GetUserTodos200Item

  const popupId = `popup-todo-${item.id}`

  const submitDelete = useDeleteTodoMutation()

  const { openModal } = useSaveTodoModalStore()
</script>

<div class={`TodoMoreIcon`}>
  <button
    type="button"
    class={'btn-icon btn-icon-sm invisible hover:variant-filled group-hover:visible'}
    use:popup={{
      event: 'focus-click',
      target: popupId,
      placement: 'bottom-end',
    }}
  >
    <Icon icon="mdi:dots-horizontal" />
  </button>
  <div data-popup={popupId}>
    <ul class="card list-nav min-w-[160px] py-2">
      <li>
        <button
          class="btn flex w-full justify-start
          !rounded-none
          "
          on:click={() => {
            openModal(item)
          }}
        >
          <span>
            <Icon icon="mdi:edit" />
          </span>
          <span>Edit</span>
        </button>
      </li>

      <li>
        <button
          class="btn flex w-full justify-start
          !rounded-none
          text-red-500
          "
          on:click={() => {
            $submitDelete.mutate(item.id)
          }}
        >
          <span>
            <Icon icon="mdi:delete" />
          </span>
          <span>Delete</span>
        </button>
      </li>
    </ul>
  </div>
</div>
