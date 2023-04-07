<script lang="ts">
	import { Content, Column, Row } from 'carbon-components-svelte'

	import SignUpForm from '$lib/components/SignUpForm.svelte'

	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'

	import 'carbon-components-svelte/css/g100.css'
	import LogInForm from '$lib/components/LogInForm.svelte'

	const user = userStore(auth)
</script>

{#if $user}
	<!-- account form -->
{:else}
	<LogInForm />
	<SignUpForm />
{/if}
