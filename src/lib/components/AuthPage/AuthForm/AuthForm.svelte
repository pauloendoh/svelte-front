<script lang="ts">
  import SignInForm from './SignInForm/SignInForm.svelte'
  import SignUpForm from './SignUpForm/SignUpForm.svelte'

  let formType: 'signUp' | 'signIn' = 'signUp'
</script>

{#if formType === 'signUp'}
  <SignUpForm
    onChangeToSignIn={() => {
      formType = 'signIn'
    }}
  />
{:else}
  <SignInForm
    onChangeToSignUp={() => {
      formType = 'signUp'
    }}
  />
{/if}
