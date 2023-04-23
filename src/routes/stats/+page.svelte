<script lang="ts">
	/** @type {import('./$types').PageData} */
	import 'carbon-components-svelte/css/g100.css'
	import SampleView from '$lib/components/WindowView.svelte'
	import FrameView from '$lib/components/FrameView.svelte'
	import { auth } from '$lib/utilities/firebase.js'
	import { userStore } from 'sveltefire'
	import { Column, ContentSwitcher, Grid, Row, Switch } from 'carbon-components-svelte'
	import type { PageData } from './$types'
	import type { HfFrame, HfReading, HfWindow } from '$lib/utilities/types'
	import { readable, type Readable } from 'svelte/store'
	import FrameWrangler from '$lib/components/FrameWrangler.svelte'
	import ReadingWrangler from '$lib/components/ReadingWrangler.svelte'
	import WindowView from '$lib/components/WindowView.svelte'

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
	let curFrame: HfFrame = $frames[selectedIndex]

	let curFid: Readable<[string]> | null = $frames[selectedIndex].fid
		? readable([$frames[selectedIndex].fid ?? 'err'])
		: null

</script>

{#if $user}
<Grid>
	<Row>
		<p>Hello {$user.uid}!</p>
		<ReadingWrangler entries={readings} bind:selectedRowIds={curFid} />
	</Row>
	<Row>
		<Column>
			<FrameView frame={curFrame} />
		</Column>
		<Column>
			<FrameWrangler entries={frames} bind:selectedRowIds={curFid} />
			<p>{$curFid}</p>
		</Column>
	</Row>
	<Row>
		<p>Hello {$user.uid}!</p>
		<WindowView window={$windows[0]}/>
	</Row>
</Grid>
{/if}
