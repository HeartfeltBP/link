<script lang="ts">
	import { goto } from '$app/navigation'
	import 'carbon-components-svelte/css/g100.css'

	import { userStore } from 'sveltefire'
	import { auth } from '$lib/utilities/firebase.js'

	const user = userStore(auth)
	if (!user) {
		goto('device/identity')
	}
</script>

{#if $user}
	<h1>Device</h1>
	<p>Hello {$user.uid}!</p>
{/if}
