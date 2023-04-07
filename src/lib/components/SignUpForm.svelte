<script lang="ts">
	import {
		PasswordInput,
		TextInput,
		Content,
		Column,
		Grid,
		Button,
		Row,
		Form,
		DatePicker,
		DatePickerInput,
		Checkbox,
		MultiSelect,
		NumberInput,
		ContentSwitcher,
		Switch,

		Dropdown

	} from 'carbon-components-svelte'
	import { CodeSigningService, DocumentPdf } from 'carbon-icons-svelte'
	import 'carbon-components-svelte/css/g100.css'

	import { createAuthEmailPass, hasCurrentUser } from '../utilities/auth'
	import logoImage from '$lib/assets/HeartfeltLogo.png'

	import type { HfUser } from '$lib/utilities/types'

	let email: string, pass: string, pass_confirm: string
	let height: string, weight: string, race: string, birthdate: string

	function confirmPass(pass: string, passConfirm: string) {
		return pass === passConfirm ? true : false
	}
</script>

<Content>
	<Grid>
		<img
			height="120em"
			style=" margin: auto; margin-bottom: 2em"
			alt="logo;"
			src={logoImage}
		/>
		<h1>Sign Up</h1>
		<br />
		<Form on:submit={() => createAuthEmailPass(email, pass, pass_confirm)}>
			<Row>
				<Column>
					<TextInput
						bind:value={email}
						name="email"
						labelText="E-mail"
						placeholder="Enter e-mail"
					/>
					<br />
					<Row>
						<Column>
							<PasswordInput
								bind:value={pass}
								name="pass"
								labelText="Create Password"
								placeholder="Enter password"
							/>
						</Column>
						<Column>
							<PasswordInput
								bind:value={pass_confirm}
								name="pass"
								labelText="Confirm Password"
								placeholder="Confirm password"
								required
							/>
						</Column>
					</Row>

					<Row>
						<Column>
							<Row>
								<Column>
									<NumberInput name="height" label="Height" placeholder="e.g. 2.0" required />
								</Column>
								<Column>
									<br /> <br />
									<Dropdown selectedId={'0'} items={[
										{ id: '0', text: 'm (meters)'},
										{ id: '1', text: 'ft (feet)'}
									]} />
								</Column>
								<Column>
									<NumberInput name="weight" label="Weight" placeholder="e.g. 100" required />
								</Column>
								<Column>
									<br /> <br />
									<Dropdown selectedId={'0'} items={[
										{ id: '0', text: 'kg (kilograms)'},
										{ id: '1', text: 'lb (pounds)'}
									]} />
								</Column>
							</Row>
						</Column>
					</Row>
					<Row>
						<Column>
							<MultiSelect
								titleText="Race"
								label="Select Race"
								items={[
									{ id: '0', text: 'American Indian/Alaska Native' },
									{ id: '1', text: 'Asian' },
									{ id: '2', text: 'Black or African American' },
									{ id: '3', text: 'Native Hawaiian or other Pacific Islander' },
									{ id: '4', text: 'White' },
									{ id: '5', text: 'Decline to Respond' }
								]}
								required
							/>
						</Column>
						<Column>
							<DatePicker datePickerType="single" on:change required>
								<DatePickerInput
									helperText="ex: 01/21/2000"
									labelText="Select birthdate"
									placeholder="mm/dd/yyyy"
								/>
							</DatePicker>
						</Column>
					</Row>
					<br />
					<Row>
						<Column>
							<Row>
								<Column>
									<Checkbox
										required
										id="accept-checkbox"
										labelText="Accept our Terms and Conditions"
									/>
								</Column>
								<Column>
									<Button
										size="small"
										kind="ghost"
										icon={DocumentPdf}
										iconDescription="open terms and conditions in a new tab"
									/>
								</Column>
							</Row>
						</Column>
						<Column>
							<!-- spacing -->
						</Column>
					</Row>
				</Column>
			</Row>
			<br />
			<Button icon={CodeSigningService} type="submit" name="submit">Create Account</Button>
		</Form>
	</Grid>
</Content>
