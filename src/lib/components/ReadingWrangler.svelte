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
            t:  entry.time ?? 'err'
        })
        } catch(e) {
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

<Content>
	<div style="background-color:black; padding:1em">
		<Grid>
			<strong style="font-size:0.8em">Latest Reading: </strong>
			<small>Heart Rate (bpm)</small> <strong>{$entries[0].bioData.pulse_rate} </strong>
			<small>Blood Oxygen (%)</small> <strong>{$entries[0].bioData.spo2} </strong>
			<small>Blood Pressure (sys/dia)</small> <strong>{$entries[0].sys} / {$entries[0].dia}</strong>
		</Grid>
	</div>
	<DataTable radio selectedRowIds={$selectedRowIds ?? undefined} sortable {headers} {rows} />
</Content>