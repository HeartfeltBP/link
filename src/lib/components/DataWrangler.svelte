<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import type { HfFrame, HfWindow, FrameViewData } from '$lib/utilities/types'
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
		Switch
	} from 'carbon-components-svelte'
	import { readable, type Readable } from 'svelte/store'

	export let entries: HfFrame[]

    // single index since we're using a radial selector
	export let selectedRowIds: Readable<[string]>

	type WranglerRow = {
		id: string
		hr: number
		o2: number
        t?: string
	}

	let rows: WranglerRow[] = []
    let rowStore: Readable<WranglerRow[]> = readable(rows)

	rows.push({
		id: '0',
		hr: 23,
		o2: 99,
	})

	rows.push({
		id: '0940935u03495us',
		hr: 2000,
		o2: 2,
	})

    entries.forEach((entry) => {
        try {
            rows.push({
            id: entry.fid ?? 'err',
            hr: entry.frame_bio.pulse_rate,
            o2: entry.frame_bio.spo2,
            t: entry.time
        })
        } catch(e) {
            console.error('Table entry population failed')
        }
    })

	let headers = [
		{ key: 'hr', value: 'HR (bpm)' },
		{ key: 'bp', value: 'ABP (sys/dia mmHg)' },
		{ key: 'o2', value: 'SPO2 (%)' },
		{ key: 't', value: 'Time (d/m/y)' }
	]
</script>

<Content>
	<Grid>
		<Row>
			<Column xlg>
				<DataTable radio bind:selectedRowIds={$selectedRowIds} sortable {headers} {rows} />
			</Column>
			<Column md>
				<div>
					<h1>Values</h1>
				</div>
			</Column>
		</Row>
	</Grid>
</Content>