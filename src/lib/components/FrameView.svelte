<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { userStore, collectionStore } from 'sveltefire'

	import { Button, Content } from 'carbon-components-svelte'
	import { Line } from 'svelte-chartjs'
	import { formatData } from '$lib/utilities/data.js'
	import type { HfFrame } from '$lib/utilities/types.js'
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

	//TODO:
	// just need to be able to successfully connect to firebase and also index an array by FIDS
	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)
	// const user = userStore(auth)
	export let frame: HfFrame
</script>


<div>
	<Button on:click={() => location.reload()}>Refresh</Button>
	{#if frame}
		<Line
			data={formatData(
				false,
				`red_${frame.fid}`,
				frame.red_frame_for_presentation ?? [],
				`ir_${frame.fid}`,
				frame.ir_frame_for_presentation ?? []
			)}
			options={{ responsive: true, resizeDelay: 2}}
		/>
	{:else}
		<em>Please select a frame</em>
	{/if}
</div>


