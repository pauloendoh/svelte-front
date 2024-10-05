<script lang="ts">
  import { useAllUsersQuery } from '$lib/svelte-query/domains/user/useAllUsersQuery'
  import AuthForm from './AuthForm/AuthForm.svelte'

  const allUsersQuery = useAllUsersQuery()
</script>

<div class="container mx-auto flex h-full items-center justify-center">
  <div class="flex flex-col items-center space-y-4 text-center">
    {#if $allUsersQuery.isLoading}
      <p>Loading...</p>
    {:else if $allUsersQuery.isError}
      <p>Error: {$allUsersQuery.error.message}</p>
    {:else if $allUsersQuery.isSuccess}
      {#each $allUsersQuery.data as user}
        <p>{user.email}</p>
      {/each}
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
