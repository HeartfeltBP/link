<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import 'carbon-components-svelte/css/g100.css'
	import LogInForm from '$lib/components/LogInForm.svelte'
	import { Column, Content, Grid, Row } from 'carbon-components-svelte'
	// import {breakpoint, platform} from '$lib/components/MediaQuery.svelte'

	const user = userStore(auth)
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				{#if !$user}
					<LogInForm />
				{:else}
					<p>Security features...</p>
					<p>{$user.uid}</p>
				{/if}
			</Column>
			<!-- {#if $breakpoint == 'xs'}
				<h1>XS</h1>
			{/if} -->
		</Row>
	</Grid>
</Content>
