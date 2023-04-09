<script>
	import { Content, Grid } from 'carbon-components-svelte'

	import 'carbon-components-svelte/css/g100.css'
</script>

<Content>
	<Grid>
		<h1>API Reference</h1>
		<br />
		<h2>URL/tx</h2>
		<h4>Description</h4>
		<p>Endpoint for Blood Pressure Monitor to send PPG frames to.</p>
		<br />
		<h4>Response:</h4>
		<p>200: full window received, reset BPM to INIT</p>
		<p>201: part of window recieved, responds with frameId (fid) to send with next transmission</p>
	</Grid>
</Content>
