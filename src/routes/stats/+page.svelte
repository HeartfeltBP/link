<script lang="ts">
	/** @type {import('./$types').PageData} */
	import 'carbon-components-svelte/css/g100.css'
	import SampleView from '$lib/components/WindowView.svelte'
	import FrameView from '$lib/components/FrameView.svelte'
	import { auth } from '$lib/utilities/firebase.js'
	import { userStore } from 'sveltefire'
	import { Column, ContentSwitcher, Grid, Row, Switch, Tab, TabContent, Tabs } from 'carbon-components-svelte'
	import type { PageData } from './$types'
	import type { HfFrame, HfReading, HfWindow } from '$lib/utilities/types'
	import { readable, type Readable } from 'svelte/store'
	import FrameWrangler from '$lib/components/FrameWrangler.svelte'
	import ReadingWrangler from '$lib/components/ReadingWrangler.svelte'
	import WindowView from '$lib/components/WindowView.svelte'
	import WindowWrangler from '$lib/components/WindowWrangler.svelte'

	export let data: PageData
	const user = userStore(auth)
	let frames: Readable<HfFrame[]>
	let windows: Readable<HfWindow[]>
	let readings: Readable<HfReading[]>

	if ($user) {
		frames = data.fStore
		windows = data.wStore
		readings = data.rStore
	}

	let selectedIndex = 0
	let tabSelect = 0
	let curFrame: HfFrame = $frames[selectedIndex]
	let curWindow: HfWindow = $windows[0]

	let curFid: Readable<[string]> | null = $frames[selectedIndex].fid
		? readable([$frames[selectedIndex].fid ?? 'err'])
		: null

</script>

{#if $user}
<Grid>
	<p>Hello {$user.uid}!</p>
	<Row>
		<Column>
			<ReadingWrangler entries={readings} bind:selectedRowIds={curFid} />
		</Column>
	</Row>
	<br />
	<h2>Waveform Viewer</h2>
	<Tabs bind:selected={tabSelect}>
		<Tab label="Frames" />
		<Tab label="Windows" />
		<svelte:fragment slot="content">
		  <TabContent>Content 1</TabContent>
		  <TabContent>Content 2</TabContent>
		</svelte:fragment>
	</Tabs>
	{#if tabSelect == 0}
	<Row>
		<Column>
			<FrameView frame={curFrame} />
		</Column>
		<Column>
			<FrameWrangler entries={frames} bind:selectedRowIds={curFid} />
			<p>{$curFid}</p>
		</Column>
	</Row>
	{:else if tabSelect == 1}
	<Row>
		<Column>
			<WindowView window={curWindow} />
		</Column>
		<Column>
			<WindowWrangler entries={windows} bind:selectedRowIds={curFid} />
			<!-- <p>{$curWindow}</p> -->
		</Column>
	</Row>
	{/if}
</Grid>
{/if}
