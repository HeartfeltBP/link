<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import cookie from 'cookie'

	import {
		Button,
		Form,
		Grid,
		ProgressIndicator,
		ProgressStep,
		TextInput
	} from 'carbon-components-svelte'
	import { writable, type Writable } from 'svelte/store'
	import { getSetNewIdToken } from '$lib/utilities/auth'

	const user = userStore(auth)
	// const storageOfSession = readable(Object.keys(sessionStorage))
	// const storageOfLocal = readable(Object.keys(localStorage))
	// const cookies = readable(document.cookie)

	export const getTest = async (bpmIp: string = 'http://192.168.12.26:80/') => {
		console.info('GET: IP: ', bpmIp)
		let testResponse: Response

		try {
			testResponse = await fetch(bpmIp, {
				method: 'GET'
			})
		} catch (e) {
			console.info('Cannot find device')
			// console.error(e)
			return
		}
		console.log('Device found!')

		return testResponse.status
	}

	export const bpmPair = async (bpmIp: string = 'http://192.168.12.26:80/') => {
		const idToken: string = cookie.parse(document.cookie)['token']

		console.info('POST: IP: ', bpmIp)
		localStorage.setItem('bpmIp', bpmIp)
		console.log('.oOoOoOoOooOoOo({<0>})OoOoOoOoOoOooOo.')

		console.log(idToken)

		if (!idToken || typeof idToken == 'undefined') {
			console.error('Token not available')
			return
		}

		console.info('Bpm test GET sending...')
		let testResponse: Response, postResponse: Response

		try {
			testResponse = await fetch(bpmIp, {
				method: 'GET'
			})
			localStorage.setItem('bpmStatus', String(testResponse))
		} catch (e) {
			console.error(e)
			return
		}

		console.info('Bpm says: ', testResponse.status, testResponse.statusText)

		if (testResponse.status == 200) {
			try {
				postResponse = await fetch(bpmIp, {
					method: 'POST',
					headers: {
						Authorization: idToken
					}
				})
				if (postResponse.status == 200) {
					console.log(auth.currentUser?.uid)
					console.log(postResponse)
				}
			} catch (e) {
				console.error('Post failed')
				console.error(e)
			}
		} else {
			console.error('could detect device, aborting pairing')
		}
	}

	export let bpmIp: Writable<string> = writable('')

	let currentIndex: Writable<number> = writable(0)
	let stepsComplete: [boolean, boolean, boolean] = [false, false, false]
</script>

<Grid>
	{#if !$user}
		<p>Go away (or please login if you have an account)</p>
	{:else}
		<h1>Pair your Device</h1>
		<p>Hello: {$user.uid}</p>
		<ProgressIndicator bind:currentIndex={$currentIndex}>
			<ProgressStep
				bind:complete={stepsComplete[0]}
				label="Step 1"
				description="Search for Devices"
			/>
			<ProgressStep
				bind:complete={stepsComplete[1]}
				label="Step 2"
				description="Connect to Device"
			/>
			<ProgressStep bind:complete={stepsComplete[2]} label="Step 3" description="Confirm" />
		</ProgressIndicator>
		<br />
		<br />
		{#if $currentIndex == 0}
			<Form style="padding:1em">
				<div style="display:inline">
					<TextInput style="display:inline" value={$bpmIp} labelText="Enter Device IP" />
					<Button
						style="margin-top:2em; float:right;"
						on:click={() => {
							stepsComplete[$currentIndex] = true
							$currentIndex++
						}}>Continue</Button
					>
				</div>
			</Form>
		{:else if $currentIndex == 1}
			{#if $bpmIp.length > 0}
				<Button on:click={() => getTest($bpmIp)}>Search for Devices</Button>
				<Button
					on:click={() => {
						stepsComplete[$currentIndex] = true
						$currentIndex++
					}}>Continue</Button
				>
			{:else}
				<Button on:click={() => getTest()}>Search for Devices</Button>
				<Button
					on:click={() => {
						stepsComplete[$currentIndex] = true
						$currentIndex++
					}}>Continue</Button
				>
			{/if}
		{:else if $currentIndex == 2}
			<Button on:click={() => bpmPair()}>Send Pairing Signal</Button>
			<Button on:click={() => getSetNewIdToken()}>Refresh Id Token</Button>
			<Button
				on:click={() => {
					stepsComplete[$currentIndex] = true
					$currentIndex++
				}}>Finish</Button
			>
		{/if}
		<!-- {#if $statusWritable != 200}
		<h1>No Devices Detected</h1>
		{:else} -->

		<br />
		<br />
		<br />
		<!-- {#if $user}
			<div style="width:40%">
				<p>LOCAL STORAGE: {$storageOfLocal}</p>
				<p>SESSION STORAGE: {$storageOfSession}</p>
				<div style="width:20%">
					<p>COOKIES: {$cookies}</p>
				</div>
			</div>
		{/if} -->
	{/if}
</Grid>
