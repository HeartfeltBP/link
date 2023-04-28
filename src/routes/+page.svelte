<script lang="ts">
	import { goto } from '$app/navigation'
	import Home from '$lib/components/Home.svelte'

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
