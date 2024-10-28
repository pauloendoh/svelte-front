<script lang="ts">
  import { useLogout } from '$lib/hooks/useLogout'
  import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
  import { AppBar, AppShell } from '@skeletonlabs/skeleton'
  import { useSaveTodoModalStore } from '../modals/SaveTodoModal/useSaveTodoModalStore'
  import TodoList from './TodoList/TodoList.svelte'

  let user = useAuthUserStore()

  const logOut = useLogout()

  const { openModal } = useSaveTodoModalStore()
</script>

<AppShell class="HomePage" slotPageHeader="sticky top-0 z-10">
  <svelte:fragment slot="header">
    <AppBar>
      <svelte:fragment slot="lead">
        <img src="/favicon.ico" alt="logo" class="h-8 w-8" />
      </svelte:fragment>
      Endoh Svelte

      <svelte:fragment slot="trail">
        <div class="flex items-center gap-4">
          <div>
            {$user?.username}
          </div>
          <button class="variant-filled btn btn-sm" on:click={logOut}>
            Log out
          </button>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <div class="container mx-auto mt-10 flex justify-center">
    <div class="w-full min-w-[360px] max-w-[480px]">
      <button
        class="variant-filled btn"
        on:click={() => {
          openModal({
            description: '',
          })
        }}
      >
        + Add
      </button>
      <div class="mt-8 flex flex-col gap-10">
        <TodoList type="to-do" />
        <TodoList type="completed" />
      </div>
    </div>
  </div>
</AppShell>
