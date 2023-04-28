<script lang="ts">
	import SignUpForm from '$lib/components/SignUpForm.svelte'

	import { auth } from '$lib/utilities/firebase'
	import { userStore } from 'sveltefire'

	const user = userStore(auth)
</script>

{#if $user}
	<!-- account form -->
{:else}
	<SignUpForm />
{/if}
