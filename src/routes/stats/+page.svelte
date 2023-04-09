<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import SampleView from '$lib/components/SampleView.svelte'
	import FrameView from '$lib/components/FrameView.svelte'
	import { auth } from '$lib/utilities/firebase.js'
	import { userStore } from 'sveltefire'

	import { ContentSwitcher, Switch } from 'carbon-components-svelte'

	const user = userStore(auth)

	let selectedIndex = 0
</script>

{#if $user}
	<h1>Stats</h1>
	<p>Hello {$user.uid}!</p>
	<br />

	<ContentSwitcher bind:selectedIndex>
		<Switch text="Frames" />
		<Switch text="Windows" />
	</ContentSwitcher>
	<br />

	{#if selectedIndex == 0}
		<FrameView />
	{:else if selectedIndex == 1}
		<SampleView />
	{/if}
{/if}
