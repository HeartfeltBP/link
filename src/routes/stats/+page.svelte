<script lang="ts">
	/** @type {import('./$types').PageData} */
	import FrameView from '$lib/components/FrameView.svelte'
	import { auth } from '$lib/utilities/firebase.js'
	import { userStore } from 'sveltefire'
	import { Button, Column, Grid, Row, Tab, Tabs } from 'carbon-components-svelte'
	import type { PageData } from './$types'
	import type { HfFrame, HfReading, HfWindow } from '$lib/utilities/types'
	import { writable, type Readable, type Writable } from 'svelte/store'
	import FrameWrangler from '$lib/components/FrameWrangler.svelte'
	import ReadingWrangler from '$lib/components/ReadingWrangler.svelte'
	import WindowView from '$lib/components/WindowView.svelte'
	import WindowWrangler from '$lib/components/WindowWrangler.svelte'
	import ReadingView from '$lib/components/ReadingView.svelte'
	import ReadingSummary from '$lib/components/ReadingSummary.svelte'
	import { goto } from '$app/navigation'

	export let data: PageData
	const user = userStore(auth)

	let frames: Readable<HfFrame[]>
	let windows: Readable<HfWindow[]>
	let readings: Readable<HfReading[]>
	let hasStats: Writable<boolean> = writable(false)

	// intellisense doesn't show the stores, but they're there
	if ($user) {
		frames = data.fStore
		windows = data.wStore
		readings = data.rStore
	}

	if ($frames.length == 0 || $windows.length == 0 || $readings.length == 0) {
		$hasStats = false
		console.info('no stats found!')
	} else {
		$hasStats = true
	}

	let tabSelect = 0
	let curFid: Writable<[string]> = writable([$frames[0]?.fid])
	let curWid: Writable<[string]> = writable([$windows[0]?.wid])

	let curFrame: Writable<HfFrame | undefined> = writable(
		$frames.find((frame: HfFrame) => frame.fid == $curFid[0])
	)
	let curWindow: Writable<HfWindow | undefined> = writable(
		$windows.find((window: HfWindow) => window.wid == $curWid[0])
	)

	const updateFids = () => {
		$curFrame = $frames.find((frame: HfFrame) => frame.fid == $curFid[0])
	}

	const updateWids = () => {
		$curWindow = $windows.find((window: HfWindow) => window.wid == $curWid[0])
	}

	const reloadX = () => {
		goto('/stats', { replaceState: true, invalidateAll: true })
		// location.reload()
	}
</script>

{#if $user && $hasStats}
	<Grid>
		<Row style="display:inline">
			<h1>Stats</h1>
			<Button style="float:inline-end" on:click={reloadX}>Refresh</Button>
		</Row>
		<h3>Readings Overview</h3>
		<p>Hello {$user.uid}!</p>
		<Row>
			<div style="padding: 1em; width: 80%; display:inline-block">
				<ReadingSummary entries={readings} />
			</div>
			<Column aspectRatio="2x1" style="margin-top: -4em">
				<ReadingView {readings} />
			</Column>
			<Column aspectRatio="2x1">
				<ReadingWrangler entries={readings} />
			</Column>
		</Row>
		<br />
		<h3>Waveform Viewer</h3>
		<br />
		<Tabs bind:selected={tabSelect}>
			<Tab label="Frames" />
			<Tab label="Windows" />
			<svelte:fragment slot="content" />
		</Tabs>
		{#if tabSelect == 0}
			<Row>
				<Column aspectRatio="2x1" style="margin: auto">
					<FrameView bind:frame={$curFrame} />
				</Column>
				<Column aspectRatio="2x1">
					<FrameWrangler selectFunc={updateFids} entries={frames} bind:selectedRowIds={$curFid} />
				</Column>
			</Row>
		{:else if tabSelect == 1}
			<Row>
				<Column aspectRatio="2x1" style="align:top">
					<div style="float">
						<WindowView bind:window={$curWindow} />
					</div>
				</Column>
				<Column aspectRatio="2x1">
					<div style="max-width: 45em; overflow:scroll">
						<WindowWrangler
							selectFunc={updateWids}
							entries={windows}
							bind:selectedRowIds={$curWid}
						/>
					</div>
				</Column>
			</Row>
		{/if}
	</Grid>
{:else if $user}
	<h4>You don't have any data!</h4>
	<p>Set up your BPM in 'Devices' and start collecting data to see stats!</p>
	<br />
	<Button style="float:inline-end" on:click={reloadX}>Refresh</Button>
	<Button href="/device">Go to Device Page</Button>
{:else}
	<p>Please login!</p>
{/if}
