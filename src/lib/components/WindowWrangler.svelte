<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import type { HfWindow } from '$lib/utilities/types'
	import {
		DataTable,
		Pagination,
	} from 'carbon-components-svelte'
	import { readable, type Readable, type Writable } from 'svelte/store'

	export let entries: Readable<HfWindow[]>

    // single index since we're using a radial selector
	export let selectedRowIds: [string]

	export let selectFunc: Function

	const onSelect = (e: any) => {
		e.preventDefault()
		selectFunc()
	}

	type WranglerRow = {
		id: string
		f0: number
		bp: string,
		notches: boolean,
		flat: boolean,
		beat_sim: number,
		snr: number,
	}

	let rows: WranglerRow[] = []
    let rowStore: Readable<WranglerRow[]> = readable(rows)

    $entries.forEach((entry) => {
        try {
            rows.push({
            id: entry.wid ?? 'err',
            f0: entry.f0 ?? 0,
			bp: `${entry.sbp}/${entry.dbp}`,
			notches: entry.notches,
			flat: entry.flat_lines,
			beat_sim: entry.beat_sim,
			snr: entry.snr
        })
        } catch(e) {
            console.error('Table entry population failed')
        }
    })

	let headers = [
		{ key: 'f0', value: 'F0' },
		{ key: 'bp', value: 'ABP (sys/dia)' },
		{ key: 'notches', value: 'Notch?' },
		{ key: 'flat', value: 'Flat Line?' },
		{ key: 'beat_sim', value: 'Beat Sim.' },
		{ key: 'snr', value: 'SNR' },
	]

	let pageSize = 5;
	let page = 1;
</script>

<DataTable on:click:row--select={onSelect} title='Windows' radio bind:selectedRowIds={selectedRowIds} sortable {headers} {pageSize} {page} {rows} />
<Pagination
  bind:pageSize
  bind:page
  totalItems={rows.length}
  pageSizeInputDisabled
/>