<script lang="ts">
	// @ts-nocheck

	import { Button, ContentSwitcher, Switch } from 'carbon-components-svelte'
	import { Scatter, Line } from 'svelte-chartjs'
	import { formatData, type ChartPair } from '$lib/utilities/data.js'
	import type { HfFrame, HfReading } from '$lib/utilities/types.js'
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		TimeScale,
		type TimeUnit,
		type TimeScaleOptions
	} from 'chart.js'
	import 'chartjs-adapter-date-fns' 
	import type { Readable } from 'svelte/store'

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale, TimeScale)
	// const user = userStore(auth)
	export let readings: Readable<HfReading[]>
	let selectedIndex = 0

	let hrVals: ChartPair[] = []
	let o2Vals: ChartPair[] = []
	let sysVals: ChartPair[] = []
	let diaVals: ChartPair[] = []
	let timeVals: string[] = []
	
	$readings.forEach((reading: HfReading) => {
		try{
			// const tPushVal = reading.time.split(' ')[1].split('.')[0]
			const tPushVal = reading.time
			timeVals.push(tPushVal)
			hrVals.push({x: reading.time, y: reading.bioData.pulse_rate})
			o2Vals.push({x: reading.time, y: reading.bioData.spo2})
			sysVals.push({x: reading.time, y: reading.sys})
			diaVals.push({x: reading.time, y: reading.dia})
			console.log(hrVals.length, o2Vals.length, sysVals.length, diaVals.length, tPushVal)
		} catch(e) {
			console.error('Error populating readingView')
			console.error(e)
		}
	})
	console.log(timeVals[0])
	const scatterOpts = { 
		responsive: true,
		resizeDelay: 2,
        scales: {
            x: {
				type: 'time',
                min: timeVals[0],
            }
        }
	}
</script>


<div>
	<ContentSwitcher size="sm" bind:selectedIndex>
		<Switch text=ABP />
		<Switch text=HR />
		<Switch text=SPO2 />
	</ContentSwitcher>

	{#if $readings.length > 0}
		{#if selectedIndex == 0}
		<Scatter
			data={
			formatData(
				false,
				4,
				'scatter',
				`Systolic`,
				sysVals ?? [],
				`Diastolic`,
				diaVals ?? [],
			)}
			options={scatterOpts}
		/>
		{/if}
		{#if selectedIndex == 1}
		<Scatter
			data={formatData(
				false,
				4,
				'scatter',
				`Heart Rate`,
				hrVals ?? [],
			)}
			options={scatterOpts}
		/>
		{/if}
		{#if selectedIndex == 2}
		<Scatter
			data={formatData(
				false,
				4,
				'scatter',
				`SpO2`,
				o2Vals ?? [],
			)}
			options={scatterOpts}
		/>
		{/if}
	{:else}
		<em>Please select a reading</em>
	{/if}
</div>


