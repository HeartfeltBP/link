<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import type { HfFrame, HfWindow } from '$lib/utilities/types'	
	import { DATA_DB } from '$lib/utilities/constants.js'
	import { Checkbox, Column, Content, ContentSwitcher, DataTable, Grid, Header, Row, Switch } from 'carbon-components-svelte'
	import Api from 'carbon-icons-svelte/lib/Api.svelte'
	import type { DataTableRow } from 'carbon-components-svelte/types/DataTable/DataTable.svelte'

	export let entries: HfFrame[]

	export let selectedIndex: string
	let selectedRowIds: string[] = [selectedIndex]

	type WranglerRow = {
		id: string,
		hr: number,
		o2: number,
		r: number
	}
	
	let rows: WranglerRow[] = []
	
	entries.forEach(entry => {
		if(!entry.fid || !entry.pulse_rate || !entry.spo2 || !entry.r) {
			return
		}
		rows.push({
			id: entry.fid,
			hr: entry.pulse_rate,
			o2: entry.spo2,
			r: entry.r
		})
	})
	rows.push({
		id: '0',
		hr: 23,
		o2: 99,
		r: 3
	})

	rows.push({
		id: '0940935u03495us',
		hr: 2000,
		o2: 2,
		r: -4
	})

	let headers = [
		{ key: "hr", value: "HR (bpm)" },
    	{ key: "bp", value: "ABP (sys/dia mmHg)" },
    	{ key: "o2", value: "SPO2 (%)" },
		{ key: "r", value: "R (%)" }
	]
</script>

<Content>
	<Grid>	
		<Row>
			<Column xlg>
				<DataTable  radio bind:selectedRowIds sortable {headers} {rows}/>
			</Column>
			<Column md>
				<div>
					<h1>Values</h1>
				</div>
			</Column>
		</Row>
	</Grid>
</Content>