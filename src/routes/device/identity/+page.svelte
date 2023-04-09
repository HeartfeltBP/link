<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'

	import 'carbon-components-svelte/css/g100.css'
	import { Button } from 'carbon-components-svelte'
	import { readable } from 'svelte/store'
	import { getSetNewIdToken } from '$lib/utilities/auth'

	const user = userStore(auth)
	const storageOfSession = readable(Object.keys(sessionStorage))
	const storageOfLocal = readable(Object.keys(localStorage))
	const cookies = readable(document.cookie)
</script>

{#if !$user}
	<p>Go away</p>
{:else}
	<h1>Pair your Device</h1>
	<br />
	<br />
	<p>Hello: {$user.uid}</p>
	<br />
	<Button on:click={() => fetch('/device/identity', { method: 'POST' })}>Send Pairing Signal</Button
	>
	<Button on:click={() => fetch('/device/identity', { method: 'GET' })}>Send Get Test</Button>
	<Button on:click={() => getSetNewIdToken()}>Refresh Id Token</Button>
	<br />
	<br />
	<br />
	<p>LOCAL STORAGE: {$storageOfLocal}</p>
	<p>SESSION STORAGE: {$storageOfSession}</p>
	<p>COOKIES: {$cookies}</p>
{/if}
