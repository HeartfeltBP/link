<script lang="ts">
	import { getAuth } from 'firebase/auth'
	import { app, auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import { page } from '$app/stores'

	import 'carbon-components-svelte/css/g100.css'
	import SignInForm from '$lib/components/SignInForm.svelte'

	const user = userStore(auth)
</script>

{#if !$user}
	<SignInForm />
{:else}
    <p>Security features...</p>
	<p> { $user.uid }</p>
{/if}