<script lang="ts">
	import { getAuth } from 'firebase/auth'
	import { app, auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import { page } from '$app/stores'

	import 'carbon-components-svelte/css/g100.css'
	import LogInForm from '$lib/components/LogInForm.svelte'
	import { goto } from '$app/navigation'
	import { Button } from 'carbon-components-svelte'
	import { readable } from 'svelte/store'
	import { getNewIdToken } from '$lib/utilities/auth'


	const user = userStore(auth)
    const storageOfSession = readable(sessionStorage)
    const storageOfLocal = readable(localStorage)
</script>

{#if !$user}
    <p>Go away</p>
{:else}
    <h1>Pair your Device</h1>
	<p> { $user.uid }</p>
    <Button on:click={() => fetch('/', {method: 'POST'})}>Send Pairing Signal</Button>
    <Button on:click={() => fetch('/', {method: 'GET'})}>Send Get Test</Button>
    <Button on:click={() => getNewIdToken()}>Refresh Id Token</Button>
    <p>$storageOfLocal</p>
    <p>$storageOfSession</p>
{/if}