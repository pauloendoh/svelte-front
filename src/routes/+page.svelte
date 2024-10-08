<script lang="ts">
  import AuthPage from '$lib/components/AuthPage/AuthPage.svelte'
  import HomePage from '$lib/components/HomePage/HomePage.svelte'
  import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
  import type { ActionData, PageData } from './$types'
  import { useFormResponseStore } from './useFormResponseStore'
  import { usePageDataStore } from './usePageDataStore'

  export let data: PageData

  const pageData = usePageDataStore()
  pageData.set(data)

  export let form: ActionData
  const actionData = useFormResponseStore()
  actionData.set(form)

  let authUser = useAuthUserStore()
</script>

{#if $authUser}
  <HomePage />
{:else}
  <AuthPage />
{/if}
