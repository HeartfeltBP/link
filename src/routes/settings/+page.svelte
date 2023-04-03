<script lang="ts">
	import Home from '../../lib/components/Home.svelte'
	import 'carbon-components-svelte/css/g100.css'

	import { userStore } from 'sveltefire'
	import { auth } from '../../lib/utilities/firebase.js'

	const user = userStore(auth)
</script>

{#if $user}
	<h1>Settings</h1>
	<p>Hello {$user.uid}!</p>
{/if}
