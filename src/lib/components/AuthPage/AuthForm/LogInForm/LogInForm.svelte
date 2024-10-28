<script lang="ts">
  import { useLogInMutation } from '$lib/svelte-query/domains/auth/useLogInMutation'
  import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { onMount } from 'svelte'
  import { logInBody } from '../../../../../orval/auth/auth.zod'

  export let ref: HTMLElement | undefined = undefined
  export let onChangeToSignUp: () => void

  onMount(() => {
    ref?.focus()
  })

  const toastStore = getToastStore()

  const signInMutation = useLogInMutation()
</script>

<div class="SignInForm">
  <form
    method="post"
    action="?/signUp"
    class="card flex w-[360px] flex-col gap-4 p-4"
    on:submit|preventDefault={(e) => {
      const raw = Object.fromEntries(new FormData(e.currentTarget))
      const { error, data } = logInBody.safeParse(raw)

      if (error) {
        const message = getZodErrorMessage(error)
        toastStore.trigger({
          message,
          background: 'bg-red-500',
        })
        return
      }
      $signInMutation.mutate(data)
    }}
  >
    <h1 class="h4 text-center">Endoh Svelte</h1>

    <label class="label">
      <span class="required-field">Username or email</span>
      <input
        class="input"
        type="text"
        placeholder="Enter your username or email"
        name="usernameOrEmail"
        required
        bind:this={ref}
        autocomplete="off"
      />
    </label>

    <label class="label">
      <span class="required-field">Password</span>
      <input
        class="input"
        type="password"
        placeholder="Enter your password"
        name="password"
        required
        autocomplete="off"
      />
    </label>

    <button class="variant-filled-secondary btn w-full" type="submit"
      >Log In</button
    >
    <p class="text-center">
      Don't have an account?
      <a
        href="/"
        class="text-blue-500 hover:underline"
        on:click|preventDefault={onChangeToSignUp}>Sign Up</a
      >
    </p>
  </form>
</div>
