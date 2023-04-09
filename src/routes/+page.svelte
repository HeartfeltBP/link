<script lang="ts">
	import Home from '$lib/components/Home.svelte'

	import 'carbon-components-svelte/css/g100.css'
	import { Column, Grid, Row } from 'carbon-components-svelte'
</script>

<!-- if not logged in, show login page and api reference (move login page to diff route)-->
<!-- if logged in redirect to home page -->

<Grid>
	<Row>
		<Column>
			<Home />
		</Column>
	</Row>
</Grid>
