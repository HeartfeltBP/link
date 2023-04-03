<script>
	import { Column, Content, ImageLoader } from 'carbon-components-svelte'
	import logoImage from '$lib/assets/HeartfeltLogo.png' 
</script>

<Content>
	<Column>
		<div style="width: 8em">
			<ImageLoader src={ logoImage } />
		</div>
		<h1>Welcome to Link</h1>
	</Column>

	<Column />
</Content>
