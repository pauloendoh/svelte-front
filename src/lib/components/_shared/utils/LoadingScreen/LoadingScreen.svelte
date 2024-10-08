<script lang="ts">
  import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.svelte'

  let ref: HTMLElement | null = null

  export let loading: boolean = false
</script>

{#if loading}
  <!-- Loading Screen -->
  <div
    id="loading-screen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75"
  >
    <LoadingSpinner {loading} />
  </div>
{/if}
