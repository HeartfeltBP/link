<script lang="ts">
	import { goto } from '$app/navigation'

	import { userStore } from 'sveltefire'
	import { auth } from '$lib/utilities/firebase.js'
	import { Button } from 'carbon-components-svelte'

	const user = userStore(auth)
	if (!user) {
		goto('/account/login')
	}
</script>

{#if $user}
	<h1>Device</h1>
	<br />
	<p>Hello {$user.uid}!</p>
	<Button href="/pairing">Pair a Device</Button>
{/if}
