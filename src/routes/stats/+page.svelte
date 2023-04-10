<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import SampleView from '$lib/components/SampleView.svelte'
	import FrameView from '$lib/components/FrameView.svelte'
	import type { hfWindow } from '$lib/utilities/types'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { collectionStore, userStore } from 'sveltefire'
	import { DATA_DB_TEST } from '$lib/utilities/constants.js'
	import { Checkbox, Column, ContentSwitcher, DataTable, Grid, Header, Row, Switch } from 'carbon-components-svelte'
	import Api from 'carbon-icons-svelte/lib/Api.svelte'

	let selectedRowIds: string[] = []


	let headers = [
		{ key: "hr", value: "HR (bpm)" },
    	{ key: "bp", value: "ABP (sys/dia mmHg)" },
    	{ key: "o2", value: "SPO2 (%)" }
	]

	let rows = [
		{
			id: "fid",
			hr: "test",
			bp: "test",
			o2: "balls"
		},
		{
			id: "204034098503945",
			hr: "test",
			bp: "120/90",
			o2: "balls"
		},
		{
			id: "lisdhoidfi",
			hr: "test", 
			bp: "420/69",
			o2: "balls"
		}
	]

	const user = userStore(auth)
	const posts = collectionStore<hfWindow>(firestore, `${DATA_DB_TEST}${$user?.uid}/windows`)

	$posts.forEach(element => {
		const value = {
			id: element.fid,
			hr: element.f0.toString(), // NOT HEARTRATE -- FIX
			bp: element.abp.toString(),
			o2: "balls"
		}
		rows.push(value)
	});

</script>
{#if $user}
<Grid>	
	<Row>
		<Column sm>
			<div>
				<h1>Values</h1>
			</div>
		</Column>
		<Column xlg>
			<DataTable  batchSelection batchExpansion bind:selectedRowIds sortable {headers} {rows}/>
		</Column>
	</Row>
</Grid>
{/if}


<!-- {#if $user}
	<h1>Stats</h1>
	<p>Hello {$user.uid}!</p>
	<br />

	<ContentSwitcher bind:selectedIndex>
		<Switch text="Frames" />
		<Switch text="Windows" />
	</ContentSwitcher>
	<br />

	{#if selectedIndex == 0}
		<FrameView />
	{:else if selectedIndex == 1}
		<SampleView />
	{/if}
{/if} -->
