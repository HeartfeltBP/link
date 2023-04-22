<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { userStore, collectionStore } from 'sveltefire'

	import { Grid, Row, Column, Button } from 'carbon-components-svelte'
	import { Line } from 'svelte-chartjs'
	import { formatData } from '$lib/utilities/data.js'
	import type { HfFrame } from '$lib/utilities/types.js'
	import { DATA_DB } from '$lib/utilities/constants'
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js'
	import type { Readable } from 'svelte/store'
	import DataWrangler from './DataWrangler.svelte'

	//TODO:
	// just need to be able to successfully connect to firebase and also index an array by FIDS
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

	const user = userStore(auth)
	export let posts: Readable<HfFrame[]>
	let selectedFid: Readable<[string]>
</script>

<!-- preload a few graphs? load rest specifically by db call -->

<Button on:click={() => location.reload()}>Refresh</Button>
{#if $posts}
	<DataWrangler bind:entries={$posts} bind:selectedRowIds={selectedFid} />
	{#if $selectedIndex}
		<Line
			data={formatData(
				false,
				`red_${p.fid}`,
				$posts.red_frame_for_presentation ?? [],
				`ir_${p.fid}`,
				p.ir_frame_for_presentation ?? []
			)}
			width={1600}
			height={400}
			options={{ responsive: false }}
		/>
	{:else}
		<p>Explain how to use the interface.</p>
	{/if}
{/if}
