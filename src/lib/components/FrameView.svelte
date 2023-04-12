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
	import DataWrangler from './DataWrangler.svelte'

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
	export let selectedFid: string = ''
	const user = userStore(auth)
	const posts = collectionStore<HfFrame>(firestore, `${DATA_DB}${$user?.uid}/frames`)
	//TODO: 
	// just need to be able to successfully connect to firebase and also index an array by FIDS
	$posts.push({
		status: 'aaha',
		target: 'baa',
		fid: '0330sidoidfi',
		pulse_rate: 1000,
		spo2: 2000,
		r: 69
	})
</script>

<Button on:click={() => location.reload()}>Refresh</Button>
<DataWrangler bind:entries={$posts}  bind:selectedIndex={selectedFid}/>
{#if $posts}
	<Grid>
			<Row>
				<Column>
					<!-- <Line
						data={formatData(false, `red_${curFrame.fid}`, curFrame.red_frame_for_presentation ?? [], `ir_${curFrame.fid}`, curFrame.ir_frame_for_presentation ?? [])}
						width={1600}
						height={400}
						options={{ responsive: false }}
					/> -->
				</Column>
			</Row>
	</Grid>
{/if}