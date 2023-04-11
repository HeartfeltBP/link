<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import cookie from 'cookie'

	import 'carbon-components-svelte/css/g100.css'
	import { Button } from 'carbon-components-svelte'
	import { readable, writable } from 'svelte/store'
	import { getSetNewIdToken } from '$lib/utilities/auth'
	import { CHAR_UUID, SERVICE_UUID, bleInit } from '$lib/utilities/ble'
	import type { Service } from 'noble'

	const user = userStore(auth)
	const storageOfSession = readable(Object.keys(sessionStorage))
	const storageOfLocal = readable(Object.keys(localStorage))
	const cookies = readable(document.cookie)

    let value = writable()

    export const bleClick = async (): Promise<void> => {
        const val = await bleInit()
        value.set(val)
    }




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
	<Button on:click={() => bleClick()}>Get BLE Info</Button>
    <p>{$value}</p>
	<br />
	<br />
	<br />
	<p>LOCAL STORAGE: {$storageOfLocal}</p>
	<p>SESSION STORAGE: {$storageOfSession}</p>
	<p>COOKIES: {$cookies}</p>
{/if}
