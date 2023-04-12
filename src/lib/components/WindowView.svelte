<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { userStore, collectionStore } from 'sveltefire'

	import { Grid, Row, Column } from 'carbon-components-svelte'
	import { Line } from 'svelte-chartjs'
	import { formatData } from '$lib/utilities/data.js'
	import type { HfWindow } from '$lib/utilities/types.js'
	import { DATA_DB } from '$lib/utilities/constants.js'
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
	const posts = collectionStore<HfWindow>(firestore, `${DATA_DB}${$user?.uid}/windows`)
</script>

{#if $posts}
	<Grid>
		{#each $posts as p}
			<Row>
				<Column>
					<Line
						data={formatData(true, `ppg_${p.wid}`, p.ppg)}
						width={400}
						height={200}
						options={{ responsive: false }}
					/>
				</Column>
				<Column>
					<Line
						data={formatData(false, `abp_${p.wid}`, p.abp)}
						width={400}
						height={200}
						options={{ responsive: false }}
					/>
				</Column>
			</Row>
		{/each}
	</Grid>
{/if}
