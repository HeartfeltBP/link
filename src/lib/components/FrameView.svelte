<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { userStore, collectionStore } from 'sveltefire'

	import { Grid, Row, Column, Button } from 'carbon-components-svelte'
	import { Line } from 'svelte-chartjs'
	import { formatData } from '$lib/utilities/data.js'
	import type { Frame } from '$lib/utilities/types.js'
	import { DATA_DB_TEST } from '$lib/utilities/constants'
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
	const posts = collectionStore<Frame>(firestore, `${DATA_DB_TEST}${$user?.uid}/frames`)
</script>

<Button on:click={() => location.reload()}>Refresh</Button>
{#if $posts}
	<Grid>
		{#each $posts as p}
			<Row>
				<Column>
					<Line
						data={formatData(true, 'red_frame', p.red_frame ?? [], 'ir_frame', p.ir_frame ?? [])}
						width={800}
						height={400}
						options={{
							responsive: true,
							// scales: {y: {min: 82000, max: 86000}}
						}}
					/>
				</Column>
			</Row>
		{/each}
	</Grid>
{/if}