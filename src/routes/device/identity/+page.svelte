<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import cookie from 'cookie'

	import 'carbon-components-svelte/css/g100.css'
	import { Button } from 'carbon-components-svelte'
	import { readable, writable, type Writable } from 'svelte/store'
	import { getSetNewIdToken } from '$lib/utilities/auth'
	import { test } from 'vitest'

	const user = userStore(auth)
	const storageOfSession = readable(Object.keys(sessionStorage))
	const storageOfLocal = readable(Object.keys(localStorage))
	const cookies = readable(document.cookie)

	// let statusWritable = writable<number>(69)

	export const getTest = async () => {
		let testResponse: Response

		try {
			testResponse = await fetch('http://192.168.12.26:80/', {
				method: 'GET'
			})
		} catch(e) {
			console.error(e)
			return
		}

		return testResponse.status
	}

	export const bpmPair = async (statusWritable: Writable<number>) => {
		const idToken: string = cookie.parse(document.cookie)['token']
		console.log('.oOoOoOoOooOoOo({<0>})OoOoOoOoOoOooOo.')
		console.log(idToken)


		if (!idToken || typeof idToken == 'undefined') {
			console.error('Token not available')
			return
		}
	

		console.info('Bpm test GET sending...')
		let testResponse: Response, postResponse: Response

		try {
			testResponse = await fetch('http://192.168.12.26:80/', {
				method: 'GET'
			})
			// statusWritable.set(testResponse.status)
		} catch(e) {
			console.error(e)
			return
		}

		console.info('Bpm says: ', testResponse.status, testResponse.statusText)

		if (testResponse.status == 200) {
			try {
				postResponse = await fetch('http://192.168.12.26:80/', {
					method: 'POST',
					headers: {
						Authorization: idToken,
					}
				})
				if (postResponse.status == 200) {
					console.log(auth.currentUser?.uid)
					console.log(postResponse)
				}
			} catch(e) {
				console.error('Post failed')
				console.error(e)
			}
		}

	}
</script>

{#if !$user}
	<p>Go away (or please login if you have an account)</p>
{:else}
	<h1>Pair your Device</h1>
			<br />
			<br />
	<Button on:click={() => getTest()}>Search for Devices</Button>
	<!-- {#if $statusWritable != 200}
		<h1>No Devices Detected</h1>
	{:else} -->
		<p>Hello: {$user.uid}</p>
		<Button on:click={() => bpmPair()}>Send Pairing Signal</Button>
		<Button on:click={() => getSetNewIdToken()}>Refresh Id Token</Button>
		<br />
		<br />
		<br />
		<p>LOCAL STORAGE: {$storageOfLocal}</p>
		<p>SESSION STORAGE: {$storageOfSession}</p>
		<p>COOKIES: {$cookies}</p>
	{/if}
{/if}
