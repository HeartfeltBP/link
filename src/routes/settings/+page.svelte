<script lang="ts">
	import { userStore } from 'sveltefire'
	import { auth } from '$lib/utilities/firebase.js'

	const user = userStore(auth)
</script>

{#if $user}
	<h1>Settings</h1>
	<p>Hello {$user.uid}!</p>
{/if}
