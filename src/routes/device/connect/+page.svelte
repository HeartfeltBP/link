<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import cookie from 'cookie'

	import 'carbon-components-svelte/css/g100.css'
	import { Button } from 'carbon-components-svelte'
	import { readable } from 'svelte/store'
	import { getSetNewIdToken } from '$lib/utilities/auth'
	import { bleInit } from '$lib/utilities/ble'

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
	<br />
	<h4>BLE</h4>
	<Button on:click={() => bleInit()}>Connect BLE</Button>
	<br />
	<br />
	<br />
	<p>LOCAL STORAGE: {$storageOfLocal}</p>
	<p>SESSION STORAGE: {$storageOfSession}</p>
	<p>COOKIES: {$cookies}</p>
{/if}
