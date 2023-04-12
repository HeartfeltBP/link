<script lang="ts">
	import { goto } from '$app/navigation'
	import 'carbon-components-svelte/css/g100.css'

	import { userStore } from 'sveltefire'
	import { auth } from '$lib/utilities/firebase.js'
	import { Button } from 'carbon-components-svelte'

	const user = userStore(auth)
	if (!user) {
		goto('device/identity')
	}
</script>

{#if $user}
	<h1>Device</h1>
	<p>Hello {$user.uid}!</p>
	<Button href="/device/identity">Pair a Device</Button>
{/if}
