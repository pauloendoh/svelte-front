<script lang="ts">
  import LoadingScreen from '$lib/components/_shared/utils/LoadingScreen/LoadingScreen.svelte'
  import { useCheckAuthCookieOrLogout } from '$lib/hooks/useCheckAuthCookieOrLogout'
  import LogInForm from './LogInForm/LogInForm.svelte'
  import SignUpForm from './SignUpForm/SignUpForm.svelte'

  let formType: 'signUp' | 'logIn' = 'signUp'
  const { loadingCheckAuthCookie } = useCheckAuthCookieOrLogout()
</script>

{#if $loadingCheckAuthCookie}
  <LoadingScreen loading />
{:else if formType === 'signUp'}
  <SignUpForm
    onChangeToSignIn={() => {
      formType = 'logIn'
    }}
  />
{:else}
  <LogInForm
    onChangeToSignUp={() => {
      formType = 'signUp'
    }}
  />
{/if}
