<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { userStore, collectionStore } from 'sveltefire'

	import { Grid, Row, Column, ContentSwitcher, Switch } from 'carbon-components-svelte'
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
	import type { Readable } from 'svelte/store'

	export let window: HfWindow | undefined
	let selectedIndex = 0
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
</script>

{#if window}
	<ContentSwitcher size="sm" bind:selectedIndex>
		<Switch text=PPG />
		<Switch text=ABP />
	</ContentSwitcher>
	
	{#if selectedIndex == 0}
		<Line
			data={formatData(true, 1, 'line', `ppg_${window?.wid ?? '-'}`, window?.ppg ?? [])}
			options={{ responsive: true }}
		/>
	{:else if selectedIndex == 1}
		<Line
			data={formatData(false, 1, 'line', `abp_${window?.wid ?? '-'}`, window?.abp ?? [])}
			options={{ responsive: true }}
		/>
	{/if}

{/if}
