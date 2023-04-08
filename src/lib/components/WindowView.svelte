<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { userStore, collectionStore } from 'sveltefire'

	import { Grid, Row, Column } from 'carbon-components-svelte'
	import { Line } from 'svelte-chartjs'
	import { formatData } from '$lib/utilities/data.js'
	import type { hfWindow } from '$lib/utilities/types.js'
	import { DATA_DB_TEST } from '$lib/utilities/constants.js'
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
	const posts = collectionStore<hfWindow>(firestore, `${DATA_DB_TEST}${$user?.uid}/windows`)
</script>

{#if $posts}
	<Grid>
		{#each $posts as p}
			<Row>
				<Column>
					<Line
						data={formatData('ppg', p.ppg)}
						width={500}
						height={200}
						options={{ responsive: true }}
					/>
				</Column>
				<Column>
					<Line
						data={formatData('abp', p.abp)}
						width={500}
						height={200}
						options={{ responsive: true }}
					/>
				</Column>
			</Row>
		{/each}
	</Grid>
{/if}
