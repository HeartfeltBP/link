<script lang="ts">
	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'
	import 'carbon-components-svelte/css/g100.css'
	import LogInForm from '$lib/components/LogInForm.svelte'

	const user = userStore(auth)
</script>

{#if !$user}
	<LogInForm />
{:else}
	<p>Security features...</p>
	<p>{$user.uid}</p>
{/if}
