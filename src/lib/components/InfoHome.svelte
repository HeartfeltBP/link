<script>
	import { Column, Content, ImageLoader, Row } from 'carbon-components-svelte'
	import logoImage from '$lib/assets/HeartfeltLogo.png'
</script>

<Content>
	<Row>
		<Column>
			<br />
			<h1>Home</h1>
			<h2>Welcome to Link</h2>
		</Column>
	</Row>
	<br />
	<Row>
		<Column>
			<h3>What is Link?</h3>
			<p>
				Introducing Link - the cutting-edge mobile application designed to work seamlessly with the
				Heartfelt Blood Pressure Monitor. With Link, you can view your blood pressure readings over
				time and gain valuable insights into your cardiovascular health. Our app is user-friendly
				and provides real-time updates, allowing you to stay on top of your health goals. Whether
				you're a fitness enthusiast or someone looking to monitor their cardiovascular health, Link
				is the perfect companion to the Heartfelt Blood Pressure Monitor. Try Link today and take
				control of your heart health.
			</p>
			<br />
			<br />
			<br />
			<h3>What is The Heartfelt Blood Pressure Monitor (hfBPM)?</h3>
			<p>
				The Heartfelt Blood Pressure Monitor is a wearable device that utilizes deep learning
				technology to predict ABP waveforms from PPG waveforms. Our device offers a simple, yet
				effective solution for accurate and real-time blood pressure readings, all on your wrist.
				With the Heartfelt Blood Pressure Monitor, you can proactively monitor your cardiovascular
				health and be alerted to sudden cardiac events. Plus, our sleek and user-friendly mobile
				application allows you to track your progress over time.
			</p>
		</Column>
		<Column>
			<div style="width: 100%; margin-bottom: 2em">
				<ImageLoader style="box-shadow: 1em" fadeIn={true} src={logoImage} />
			</div>
		</Column>
	</Row>
</Content>
