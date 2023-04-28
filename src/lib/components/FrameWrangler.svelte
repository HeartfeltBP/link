<script lang="ts">
	import type { HfFrame, HfWindow } from '$lib/utilities/types'
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
	import { readable, writable, type Readable, type Writable } from 'svelte/store'
	import { createEventDispatcher } from 'svelte'

	export let entries: Readable<HfFrame[]>

	// single index since we're using a radial selector
	// export let selectedRowIds: Readable<[string]> | null
	export let selectedRowIds: [string]

	export let selectFunc: Function

	const onSelect = (e: any) => {
		e.preventDefault()
		selectFunc()
	}

	type WranglerRow = {
		id: string
		hr: number
		o2: number
		t?: string
	}

	let rows: WranglerRow[] = []
	let rowStore: Readable<WranglerRow[]> = readable(rows)

	if ($entries) {
		$entries.forEach((entry) => {
			try {
				rows.push({
					id: entry.fid ?? 'err',
					hr: entry.pulse_rate ?? 'err',
					o2: entry.spo2 ?? 'err',
					t: entry.time ?? 'err'
				})
			} catch (e) {
				console.error('Table entry population failed')
			}
		})
	}

	let headers = [
		{ key: 'hr', value: 'HR (bpm)' },
		{ key: 'o2', value: 'SPO2 (%)' },
		{ key: 't', value: 'Time (d/m/y)' },
		{ key: 'id', value: 'FID' }
	]
</script>

<DataTable
	on:click:row--select={onSelect}
	title="Frames"
	radio
	bind:selectedRowIds
	sortable
	{headers}
	{rows}
/>
