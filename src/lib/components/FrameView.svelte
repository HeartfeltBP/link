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

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

	const user = userStore(auth)
	const posts = collectionStore<HfFrame>(firestore, `${DATA_DB}${$user?.uid}/frames`)
</script>

<Button on:click={() => location.reload()}>Refresh</Button>
{#if $posts}
	<Grid>
		{#each $posts as p}
			<Row>
				<Column>Time Collected: {p.time}</Column>
			</Row>
			<Row>
				<Column>SpO2 = {p.spo2}%</Column>
			</Row>
			<Row>
				<Column>R = {Math.round((p.r ?? 0) * 10000) / 10000}</Column>
			</Row>
			<Row>
				<Column>Pulse Rate = {p.pulse_rate} bpm</Column>
			</Row>
			<Row>
				<Column>
					<Line
						data={formatData(
							false,
							`red_${p.fid}`,
							p.red_frame_for_presentation ?? [],
							`ir_${p.fid}`,
							p.ir_frame_for_presentation ?? []
						)}
						width={1600}
						height={400}
						options={{ responsive: false }}
					/>
				</Column>
			</Row>
		{/each}
	</Grid>
{/if}
