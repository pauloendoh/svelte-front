<script lang="ts">
  import '../app.postcss'
  // Floating UI for Popups
  import LoadingScreen from '$lib/components/_shared/utils/LoadingScreen/LoadingScreen.svelte'
  import SaveTodoModal from '$lib/components/modals/SaveTodoModal/SaveTodoModal.svelte'
  import { useCheckAuthCookieOrLogout } from '$lib/hooks/useCheckAuthCookieOrLogout'
  import {
    arrow,
    autoUpdate,
    computePosition,
    flip,
    offset,
    shift,
  } from '@floating-ui/dom'
  import type { ModalComponent } from '@skeletonlabs/skeleton'
  import {
    AppShell,
    initializeStores as initSkeletonStores,
    Modal,
    storePopup,
    Toast,
  } from '@skeletonlabs/skeleton'
  import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
  import { onMount } from 'svelte'

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })

  initSkeletonStores()

  const queryClient = new QueryClient()

  const { checkAuthCookieOrLogout, loadingCheckAuthCookie } =
    useCheckAuthCookieOrLogout()

  onMount(() => {
    checkAuthCookieOrLogout()
  })

  const modalRegistry: Record<string, ModalComponent> = {
    // Set a unique modal ID, then pass the component reference
    [SaveTodoModal.name]: { ref: SaveTodoModal },
    // ...
  }
</script>

<QueryClientProvider client={queryClient}>
  <LoadingScreen loading={$loadingCheckAuthCookie} />
  <AppShell>
    <slot />
  </AppShell>

  <Toast />
  <Modal components={modalRegistry} />
</QueryClientProvider>
