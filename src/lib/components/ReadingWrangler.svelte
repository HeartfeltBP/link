<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import type { HfFrame, HfReading, HfWindow } from '$lib/utilities/types'
	import { DATA_DB } from '$lib/utilities/constants.js'
	import {
		Checkbox,
		Column,
		Content,
		ContentSwitcher,
		DataTable,
		Grid,
		Header,
		Row,
		StructuredList,
		StructuredListBody,
		StructuredListCell,
		StructuredListHead,
		StructuredListRow,
		Switch,
		Tile
	} from 'carbon-components-svelte'
	import { readable, type Readable } from 'svelte/store'

	export let entries: Readable<HfReading[]>

	// single index since we're using a radial selector
	export let selectedRowIds: Readable<[string]> | null

	type WranglerRow = {
		id: string
		hr: number
		o2: number
		bp: string
		t?: string
	}

	let rows: WranglerRow[] = []
	let rowStore: Readable<WranglerRow[]> = readable(rows)

	$entries.forEach((entry) => {
		try {
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

	let headers = [
		{ key: 'hr', value: 'HR (bpm)' },
		{ key: 'o2', value: 'SPO2 (%)' },
		{ key: 'bp', value: 'ABP (sys/dia)' },
		{ key: 't', value: 'Time (d/m/y)' }
	]
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
				{$entries[0].bioData.pulse_rate}
			</StructuredListCell>
			<StructuredListCell>
				{$entries[0].bioData.spo2}
			</StructuredListCell>
			<StructuredListCell>
				{$entries[0].sys} / {$entries[0].dia}
			</StructuredListCell>
		</StructuredListRow>
	</StructuredListBody>
</StructuredList>
<DataTable
	style="margin-top:-4em"
	radio
	selectedRowIds={$selectedRowIds ?? undefined}
	sortable
	{headers}
	{rows}
/>
