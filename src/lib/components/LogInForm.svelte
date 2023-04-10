<script lang="ts">
	import {
		PasswordInput,
		TextInput,
		Content,
		Button,
		Form,
		ImageLoader,
		Grid,
		Row,
		InlineNotification
	} from 'carbon-components-svelte'

	import { Login } from 'carbon-icons-svelte'
	import 'carbon-components-svelte/css/g100.css'
	import logoImage from '$lib/assets/HeartfeltLogo.png'
	import { checkEmailPass } from '$lib/utilities/auth'
	import { writable } from 'svelte/store'
	import { error } from '@sveltejs/kit'

	let email: string, pass: string
	let errors: any[] = []
	let errorStore = writable(errors)

	window.onerror = (error) => {
		$errorStore.push(error)
	}
</script>

<Content>
	<Grid>
		<Row>
			{#each $errorStore as item}
			<InlineNotification
				title="An error has occured"
				subtitle={item.toString()}
			/>
			{/each}
			<div style="width:100%">
				<h1 style="margin-bottom:1em">Log In</h1>
				<Form on:submit={() => checkEmailPass(email, pass)}>
					<div style="width: 8em; margin-bottom: 2em">
						<ImageLoader fadeIn={true} src={logoImage} />
					</div>
					<TextInput
						required
						type="input"
						size="xl"
						bind:value={email}
						labelText="E-mail"
						placeholder="Enter e-mail"
					/>
					<br />
					<PasswordInput
						required
						size="xl"
						type="password"
						invalidText="Please enter password"
						bind:value={pass}
						labelText="Password"
						placeholder="Enter password"
					/>
					<br />
					<Button icon={Login} type="submit" name="submit">Log In</Button>
					<Button kind="ghost" href="/account/signup">Create Account</Button>
				</Form>
			</div>
		</Row>
	</Grid>
</Content>
