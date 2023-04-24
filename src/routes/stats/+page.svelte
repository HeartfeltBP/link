<script lang="ts">
	/** @type {import('./$types').PageData} */
	import 'carbon-components-svelte/css/g100.css'
	import SampleView from '$lib/components/WindowView.svelte'
	import FrameView from '$lib/components/FrameView.svelte'
	import { auth } from '$lib/utilities/firebase.js'
	import { userStore } from 'sveltefire'
	import { Column, ContentSwitcher, Grid, Row, Switch, Tab, TabContent, Tabs, Tile } from 'carbon-components-svelte'
	import type { PageData } from './$types'
	import type { HfFrame, HfReading, HfWindow } from '$lib/utilities/types'
	import { readable, type Readable } from 'svelte/store'
	import FrameWrangler from '$lib/components/FrameWrangler.svelte'
	import ReadingWrangler from '$lib/components/ReadingWrangler.svelte'
	import WindowView from '$lib/components/WindowView.svelte'
	import WindowWrangler from '$lib/components/WindowWrangler.svelte'
	import ReadingView from '$lib/components/ReadingView.svelte'
	import ReadingSummary from '$lib/components/ReadingSummary.svelte'

	export let data: PageData
	const user = userStore(auth)
	let frames: Readable<HfFrame[]>
	let windows: Readable<HfWindow[]>
	let readings: Readable<HfReading[]>

	// intellisense doesn't show the stores, but they're there
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
	<h1>Stats</h1>
	<h3>Readings Overview</h3>
	<p>Hello {$user.uid}!</p>
	<Row>
		<div style="padding: 1em; width: 80%">
				<ReadingSummary entries={readings}/>
		</div>
		<Column aspectRatio="2x1" style="margin-top: -4em">
			<ReadingView readings={readings} />
		</Column>
		<Column aspectRatio="2x1">
			<ReadingWrangler entries={readings} bind:selectedRowIds={curFid} />
		</Column>
	</Row>
	<br />
	<h3>Waveform Viewer</h3>
	<br />
	<Tabs bind:selected={tabSelect}>
		<Tab label="Frames" />
		<Tab label="Windows" />
		<svelte:fragment slot="content">
		</svelte:fragment>
	</Tabs>
	{#if tabSelect == 0}
	<Row>
		<Column aspectRatio="2x1" style="margin: auto">
			<FrameView frame={curFrame} />
		</Column>
		<Column aspectRatio="2x1">
			<FrameWrangler entries={frames} bind:selectedRowIds={curFid} />
			<p>{$curFid}</p>
		</Column>
	</Row>
	{:else if tabSelect == 1}
	<Row>
		<Column aspectRatio="2x1" style="margin: auto">
			<WindowView window={curWindow} />
		</Column>
		<Column aspectRatio="2x1">
			<div style="max-width: 45em; overflow:scroll">
				<WindowWrangler entries={windows} bind:selectedRowIds={curFid} />
			</div>
			<!-- <p>{$curWindow}</p> -->
		</Column>
	</Row>
	{/if}
</Grid>
{/if}
