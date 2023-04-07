<script lang="ts">
	import {
		PasswordInput,
		TextInput,
		Content,
		Button,
		FluidForm,
		Form,
		ImageLoader,
		Column,
		Grid,
		Row,
		Breakpoint,

		Link

	} from 'carbon-components-svelte'

	import { Login } from 'carbon-icons-svelte'
	import 'carbon-components-svelte/css/g100.css'
	import logoImage from '$lib/assets/HeartfeltLogo.png'
	import { checkEmailPass } from '$lib/utilities/auth'


	let email: string, pass: string 
</script>

<Content>
	<Grid>
		<Row>
			<Column>
				<div style="width:100%">
					<h1 style="margin-bottom:1em">Log In</h1>
					<Form on:submit={()=>checkEmailPass(email, pass)}>
						<div style="width: 8em; margin-bottom: 2em">
							<ImageLoader fadeIn={true} src={ logoImage } />
						</div>
						<TextInput
							required
							type="input"
							size="xl"
							bind:value={email}
							labelText="E-mail"
							placeholder="Enter e-mail"
							
						/> 
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
						<Button icon={ Login } type="submit" name="submit">Log In</Button>
						<Button kind="ghost" href="/account/signup">Create Account</Button>
					</Form>
				</div>
			</Column>
		</Row>
	</Grid>
</Content>
