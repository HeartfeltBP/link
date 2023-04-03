<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'

	import 'carbon-components-svelte/css/g100.css'
	import SignInForm from '$lib/components/SignInForm.svelte'

	const user = userStore(auth)
</script>

{#if !$user}
	<SignInForm />
{:else}
    <p>Security features...</p>
{/if}