<script lang="ts">
  import { useSignUpMutation } from '$lib/svelte-query/domains/auth/useSignUpMutation'
  import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
  import { getToastStore } from '@skeletonlabs/skeleton'
  import { onMount } from 'svelte'
  import { signUpBody } from '../../../../../orval/auth/auth.zod'

  export let ref: HTMLElement | undefined = undefined
  export let onChangeToSignIn: () => void

  onMount(() => {
    ref?.focus()
  })

  const toastStore = getToastStore()

  const signUpMutation = useSignUpMutation()
</script>

<div class="SignUpForm">
  <form
    method="post"
    action="?/signIn"
    class="card flex w-[360px] flex-col gap-4 p-4"
    on:submit|preventDefault={(e) => {
      const raw = Object.fromEntries(new FormData(e.currentTarget))
      const { error, data } = signUpBody.safeParse(raw)

      if (error) {
        const message = getZodErrorMessage(error)
        toastStore.trigger({
          message,
          background: 'bg-red-500',
        })
        return
      }
      $signUpMutation.mutate(data)
    }}
  >
    <h1 class="h4 text-center">Endoh Svelte</h1>

    <label class="label">
      <span class="required-field">Username</span>
      <input
        class="input"
        type="text"
        placeholder="Choose a username"
        name="username"
        required
        bind:this={ref}
        autocomplete="off"
      />
    </label>
    <label class="label">
      <span class="required-field">E-mail</span>
      <input
        class="input"
        type="email"
        placeholder="Enter your e-mail"
        name="email"
        required
        autocomplete="off"
      />
    </label>
    <!-- password1 -->
    <label class="label">
      <span class="required-field">Password</span>
      <input
        class="input"
        type="password"
        placeholder="Enter your password"
        name="password1"
        required
        autocomplete="off"
      />
    </label>

    <!-- password2 -->
    <label class="label">
      <span class="required-field">Confirm Password</span>
      <input
        class="input"
        type="password"
        placeholder="Confirm your password"
        name="password2"
        required
        autocomplete="off"
      />
    </label>

    <button class="variant-filled-secondary btn w-full" type="submit"
      >Sign Up</button
    >
    <p class="text-center">
      Already have an account?
      <a
        href="/"
        class="text-blue-500 hover:underline"
        on:click|preventDefault={onChangeToSignIn}>Log In</a
      >
    </p>
  </form>
</div>
