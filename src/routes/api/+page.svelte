<script>
	import {
		Content,
		Grid,
		Row,
		CodeSnippet,
		Column,
		ImageLoader,
		Tag
	} from 'carbon-components-svelte'

	import 'carbon-components-svelte/css/g100.css'

	let exTestResponse = `
	{
		"status": 200,
		"body": "test call successful"
	}`

	let exPostResponse = `
	{
		"status": 200,
		"body": [
			265111,
			265108,
			265134,
			265107,
			265142,
			265135,
			265156,
			265163,
			265185,
			265178,
			265183,
			265196,
			265207,
			265212,
			265221,
			265243,
			... 
		]
	}`

	// const perf = getPerformance(app);
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<h1>API Reference</h1>
				<br />
				<!-- not working <ImageLoader src="https://github.com/HeartfeltBP/heartfelt/blob/17e48ab3cac59abc491ef2d8c0c3ae84abae2dcf/HeartfeltLogo.png"/> -->
				<h3>Health Check</h3>
				<Tag type="green">GET</Tag>
				<br />
				<p>Example Request:</p>
				<br />
				<CodeSnippet code={'GET url:/api/test/'} /> <br />
				<p>Example Response:</p>
				<br />
				<CodeSnippet type="multi" code={exTestResponse} />
				<br />
				<br />
				<h3>Transmit BPM Data</h3>
				<Tag type="red">POST</Tag>
				<br />
				<p>Example Request:</p>
				<br />
				<CodeSnippet code={'POST url:/api/rx/'} /> <br />
				<p>Example Response:</p>
				<br />
				<CodeSnippet type="multi" code={exPostResponse} /> <br />
			</Column>

			<Column />
		</Row>
	</Grid>
</Content>
