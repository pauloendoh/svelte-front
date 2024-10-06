<script lang="ts">
  import { getZodErrorMessage } from '$lib/utils/zod/getZodErrorMessage'
  const error = new Error()

  const errorMessage = getZodErrorMessage(error)
  if (errorMessage) {
    console.log(errorMessage)
  }
</script>

<div class="AuthForm">
  <form method="post" class="card flex w-[360px] flex-col gap-4 p-4">
    <h1 class="h4 text-center">Endoh Svelte</h1>

    <label class="label">
      <span class="required-field">Username</span>
      <input
        class="input"
        type="text"
        placeholder="Choose a username"
        name="username"
        required
      />
    </label>

    <button class="variant-filled-secondary btn w-full" type="submit"
      >Sign Up</button
    >
  </form>
</div>
