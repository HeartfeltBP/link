<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import cookie from 'cookie'

	import 'carbon-components-svelte/css/g100.css'
	import { Button } from 'carbon-components-svelte'
	import { readable } from 'svelte/store'
	import { getSetNewIdToken } from '$lib/utilities/auth'

	const user = userStore(auth)
	const storageOfSession = readable(Object.keys(sessionStorage))
	const storageOfLocal = readable(Object.keys(localStorage))
	const cookies = readable(document.cookie)

	export const bpmPair = async () => {
		const idToken: string = cookie.parse(document.cookie)['token']
		// const idToken: string | null = localStorage.getItem('token')
		console.log('.oOoOoOoOooOoOo({<0>})OoOoOoOoOoOooOo.')
		console.log(idToken)

		if (!idToken || typeof idToken == 'undefined') {
			return new Response('Token not available', { status: 401 })
		}

		console.info('Bpm test GET sending...')
		const testResponse = await fetch('http://192.168.12.26:80/', {
			method: 'GET'
		})

		console.info('Bpm says: ', testResponse.status, testResponse.statusText)

		if (testResponse.status == 200) {
			const postResponse = await fetch('http://192.168.12.26:80/', {
				method: 'POST',
				headers: {
					Authorization: idToken,
				}
			})
			if (postResponse.status == 200) {
				console.log(auth.currentUser?.uid)
				console.log(postResponse)
				return new Response(idToken, { status: 200 })
			}
			return new Response(idToken, { status: 400 })
		}
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
	<Button on:click={() => fetch('/device/identity', { method: 'POST' })}>Send Pairing Signal</Button
	>
	<Button on:click={() => fetch('/device/identity', { method: 'GET' })}>Send Get Test</Button>
	<Button on:click={() => getSetNewIdToken()}>Refresh Id Token</Button>
	<br />
	<h4>LOCAL</h4>
	<Button on:click={() => bpmPair()}>Send Pairing Signal</Button>
	<Button on:click={() => bpmPair()}>Send Get Test</Button>
	<Button on:click={() => getSetNewIdToken()}>Refresh Id Token</Button>
	<br />
	<br />
	<br />
	<p>LOCAL STORAGE: {$storageOfLocal}</p>
	<p>SESSION STORAGE: {$storageOfSession}</p>
	<p>COOKIES: {$cookies}</p>
{/if}
