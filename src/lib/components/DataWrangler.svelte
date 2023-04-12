<script lang="ts">
	import 'carbon-components-svelte/css/g100.css'
	import SampleView from '$lib/components/SampleView.svelte'
	import FrameView from '$lib/components/FrameView.svelte'
	import type { Frame, hfWindow } from '$lib/utilities/types'
	import { auth, firestore } from '$lib/utilities/firebase.js'
	import { collectionStore, userStore } from 'sveltefire'
	import { DATA_DB_TEST } from '$lib/utilities/constants.js'
	import { Checkbox, Column, Content, ContentSwitcher, DataTable, Grid, Header, Row, Switch } from 'carbon-components-svelte'
	import Api from 'carbon-icons-svelte/lib/Api.svelte'

	export let entries: hfWindow | Frame
	let selectedRowIds: string[] = []
	
	let headers = [
		{ key: "hr", value: "HR (bpm)" },
    	{ key: "bp", value: "ABP (sys/dia mmHg)" },
    	{ key: "o2", value: "SPO2 (%)" }
	]

	const user = userStore(auth)
	const posts = collectionStore<hfWindow>(firestore, `${DATA_DB_TEST}${$user?.uid}/windows`)
</script>

<Content>
	<Grid>	
		<Row>
			<Column md>
				<div>
					<h1>Values</h1>
				</div>
			</Column>
			<Column xlg>
				<DataTable  batchSelection batchExpansion bind:selectedRowIds sortable {headers} {...entries}/>
			</Column>
		</Row>
	</Grid>
</Content>