<script lang="ts">
	import {
		PasswordInput,
		TextInput,
		Content,
		Button,
		FluidForm,
		ImageLoader,
		Column,
		Grid,
		Row,
		Breakpoint
	} from 'carbon-components-svelte'

	import { Login } from 'carbon-icons-svelte'
	import 'carbon-components-svelte/css/g100.css'
	import logoImage from '$lib/assets/HeartfeltLogo.png'

	let email: string, pass: string 
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<div style="width:100%">
					<h1 style="margin-bottom:1em">Sign In</h1>
					<FluidForm on:submit method="POST">
						<div style="width: 8em; margin-bottom: 2em">
							<ImageLoader fadeIn={true} src={ logoImage } />
						</div>
						<TextInput
							required
							type="input"
							bind:value={email}
							name="email"
							labelText="E-mail"
							placeholder="Enter e-mail"
						/>
						<PasswordInput
							required
							type="password"
							invalidText="Please enter password"
							bind:value={pass}
							name="pass"
							labelText="Password"
							placeholder="Enter password"
						/>
						<br />
						<Button icon={Login} type="submit" name="submit">Sign In</Button>
						<Button kind="ghost" href="/account">Create Account</Button>
					</FluidForm>
				</div>
			</Column>
		</Row>
	</Grid>
</Content>
