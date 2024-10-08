<script lang="ts">
  import { useLogout } from '$lib/hooks/useLogout'
  import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
  import { AppBar, AppShell, getModalStore } from '@skeletonlabs/skeleton'
  import SaveTodoModal from '../modals/SaveTodoModal.svelte'

  let user = useAuthUserStore()

  const signOut = useLogout()

  const modalStore = getModalStore()
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
          <button class="variant-filled btn btn-sm" on:click={signOut}>
            Sign out
          </button>
        </div>
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <div class="container mx-auto mt-10 flex justify-center">
    <button
      class="variant-filled btn"
      on:click={() => {
        modalStore.trigger({
          type: 'component',
          component: SaveTodoModal.name,
        })
      }}
    >
      Click me
    </button>
  </div>
</AppShell>
