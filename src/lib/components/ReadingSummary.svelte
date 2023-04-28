<script lang="ts">
	import type { HfReading } from '$lib/utilities/types'
	import {
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow
	} from 'carbon-components-svelte'
	import type { Readable } from 'svelte/store'

	export let entries: Readable<HfReading[]>

	type WranglerRow = {
		id: string
		hr: number
		o2: number
		bp: string
		t?: string
	}

	let rows: WranglerRow[] = []

	let timeVals: number[] = []
	$entries.forEach((entry) => {
		try {
			timeVals.push(
				Number(
					entry.time
						.replace('-', '')
						.replace('-', '')
						.replace(' ', '')
						.replace(':', '')
						.replace(':', '')
						.replace(':', '')
						.replace('.', '')
				)
			)
			rows.push({
				id: entry.fid ?? 'err',
				hr: entry.bioData.pulse_rate ?? 'err',
				o2: entry.bioData.spo2 ?? 'err',
				bp: `${entry.sys}/${entry.dia}`,
				t: entry.time ?? 'err'
			})
		} catch (e) {
			console.error('Table entry population failed')
		}
	})
	let idx = timeVals.indexOf(Math.max(...timeVals))
</script>

<StructuredList condensed flush>
	<StructuredListHead>
		<StructuredListRow head>
			<StructuredListCell head>Latest Measurement</StructuredListCell>
			<StructuredListCell head>Heart Rate (bpm)</StructuredListCell>
			<StructuredListCell head>Blood Oxygen (%)</StructuredListCell>
			<StructuredListCell head>Blood Pressure (sys/dia)</StructuredListCell>
		</StructuredListRow>
	</StructuredListHead>
	<StructuredListBody>
		<StructuredListRow>
			<StructuredListCell noWrap>Values</StructuredListCell>
			<StructuredListCell>
				{$entries[idx].bioData.pulse_rate}
			</StructuredListCell>
			<StructuredListCell>
				{$entries[idx].bioData.spo2}
			</StructuredListCell>
			<StructuredListCell>
				{$entries[idx].sys} / {$entries[idx].dia}
			</StructuredListCell>
		</StructuredListRow>
	</StructuredListBody>
</StructuredList>
<!-- <div style="display: inline-block; background-color:#393939">
		<div style="margin:auto; background-color:#161616; display: inline-block; padding:1em;">
			<br/>
			<strong style="padding:1em;">Latest Reading</strong>
			<br/>
		</div>
		<div style="text-align:center; display: inline-block; padding:1em;">
			<strong style="padding:1em;">HR</strong>
			<br />
			{$entries[0].bioData.pulse_rate}
		</div>
		<div style="text-align:center; display: inline-block; background-color:#262626; padding:1em;">
			<strong>SPO2</strong>
			<br />
			{$entries[0].bioData.spo2}
		</div>
		<div style="text-align:center; display: inline-block; padding:1em;">
			<strong>ABP</strong>
			<br />
			{$entries[0].sys} / {$entries[0].dia}
		</div>
		<div style="text-align:center; display: inline-block; padding:1em;">
			<strong>Time</strong>
			<br />
			{$entries[0].time}
		</div>

</div> -->
