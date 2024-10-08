<script lang="ts">
  import LoadingScreen from '$lib/components/_shared/utils/LoadingScreen/LoadingScreen.svelte'
  import { useCheckAuthCookieOrLogout } from '$lib/hooks/useCheckAuthCookieOrLogout'
  import SignInForm from './SignInForm/SignInForm.svelte'
  import SignUpForm from './SignUpForm/SignUpForm.svelte'

  let formType: 'signUp' | 'signIn' = 'signUp'
  const { loadingCheckAuthCookie } = useCheckAuthCookieOrLogout()
</script>

{#if $loadingCheckAuthCookie}
  <LoadingScreen loading />
{:else if formType === 'signUp'}
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
