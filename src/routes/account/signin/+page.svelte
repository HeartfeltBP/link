<script lang="ts">
	import { getAuth } from 'firebase/auth'
	import { app } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'

	import 'carbon-components-svelte/css/g100.css'
	import SignInForm from '$lib/components/SignInForm.svelte'

	const user = userStore(getAuth(app))
	console.log(getAuth().currentUser?.uid)
</script>

{#if !$user}
	<SignInForm />
{:else}
    <p>Security features...</p>
{/if}