<script lang="ts">
  import { useLogout } from '$lib/hooks/useLogout'
  import { useAuthUserStore } from '$lib/stores/useAuthUserStore'
  import AuthForm from './AuthForm/AuthForm.svelte'

  let authUser = useAuthUserStore()
  let logout = useLogout()
</script>

<div class="container mx-auto flex h-full items-center justify-center">
  <div class="flex flex-col items-center space-y-4">
    {#if $authUser}
      <button
        class="variant-filled btn"
        on:click={() => {
          logout()
        }}
      >
        Sign Out
      </button>
    {/if}

    <!-- <button
      on:click={() => {
        const result = createUserBody.safeParse({
          email: 'waa',
          name: 'lmao',
          password: 'password',
        })
        if (result.error) {
          const errorMessage = fromError(result.error)
          alert(errorMessage)
          return
        }

        $createUserMutation.mutate(result.data)
      }}
      class="variant-filled btn">Create user</button
    > -->

    <AuthForm />
  </div>
</div>

<style lang="postcss">
</style>
