<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import type { HfFrame } from '$lib/utilities/types'
	import { DataTable, Pagination } from 'carbon-components-svelte'
	import type { Readable } from 'svelte/store'
	export let entries: Readable<HfFrame[]>

	// single index since we're using a radial selector
	// export let selectedRowIds: Readable<[string]> | null
	export let selectedRowIds: [string]

	export let selectFunc: Function // ALLOWS FUNCTION-like values CHANGE

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

	if ($entries) {
		$entries.forEach((entry) => {
			try {
				rows.push({
					id: entry.fid ?? 'err',
					hr: entry.pulse_rate ?? 'err',
					o2: entry.spo2 ?? 'err',
					t: entry.time.split('.')[0] ?? 'err'
				})
			} catch (e) {
				console.error('Table entry population failed')
			}
		})
	}

	let headers = [
		{ key: 'hr', value: 'HR (bpm)' },
		{ key: 'o2', value: 'SPO2 (%)' },
		{ key: 'id', value: 'FID' },
		{ key: 't', value: 'Time (yyyy-MM-dd HH:mm:ss)' }
	]

	let pageSize = 5
	let page = 1
</script>

<DataTable
	on:click:row--select={onSelect}
	title="Frames"
	radio
	bind:selectedRowIds
	sortable
	{headers}
	{pageSize}
	{page}
	{rows}
/>
<Pagination bind:pageSize bind:page totalItems={rows.length} pageSizeInputDisabled />
