<script lang="ts">
	import {
		PasswordInput,
		TextInput,
		Content,
		Button,
		Form,
		ImageLoader,
		Column,
		Grid,
		Row,
		Tile
	} from 'carbon-components-svelte'

	import { Login } from 'carbon-icons-svelte'
	import logoImage from '$lib/assets/HeartfeltLogo.png'
	import { checkEmailPass } from '$lib/utilities/auth'

	let email: string, pass: string
</script>

<Column>
		<Form style="padding=10%" on:submit={() => checkEmailPass(email, pass)}>
			<div style="width: 100%; margin-bottom: 8%; display:inline-block">
				<h3 style="width:25%; float:inline-start; margin-top:0.5em">Login</h3>
				<ImageLoader style="width:15%; float:inline-end;" fadeIn={true} src={logoImage} />
			</div>
			<br />
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
			<div style="width:100%; display:inline-block">
				<Button style="float: inline-end; margin-top: 0;" icon={Login} type="submit" name="submit">Log In</Button>
				<Button style="float: inline-end; margin-top: 0;" kind="ghost" href="/account/signup">Create Account</Button>
			</div>
		</Form>
</Column>


