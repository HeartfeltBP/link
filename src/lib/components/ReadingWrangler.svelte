<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import type { HfReading } from '$lib/utilities/types'
	import {
		DataTable,
		Pagination
	} from 'carbon-components-svelte'
	import { readable, type Readable } from 'svelte/store'

	export let entries: Readable<HfReading[]>

	// single index since we're using a radial selector
	// export let selectedRowIds: Readable<[string]> | null

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
				t: entry.time.split('.')[0] ?? 'err'
			})
		} catch (e) {
			console.error('Table entry population failed')
		}
	})

	let headers = [
		{ key: 'hr', value: 'HR (bpm)' },
		{ key: 'o2', value: 'SPO2 (%)' },
		{ key: 'bp', value: 'ABP (sys/dia)' },
		{ key: 't', value: 'Time (yyyy-MM-dd HH:mm:ss)' }
	]

	let pageSize = 5
	let page = 1
</script>


// add toggability to each value
<DataTable
	title='Readings'
	style="margin-top:-4em"
	sortable
	{headers}
	{pageSize}
	{page}
	{rows}
/>
<Pagination
  bind:pageSize
  bind:page
  totalItems={rows.length}
  pageSizeInputDisabled
/>