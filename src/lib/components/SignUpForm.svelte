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
		Dropdown,
		ImageLoader
	} from 'carbon-components-svelte'
	import { CodeSigningService, DocumentPdf } from 'carbon-icons-svelte'

	import { createAuthEmailPass, createUser } from '../utilities/auth'
	import logoImage from '$lib/assets/HeartfeltLogo.png'
	import type { HfUser } from '$lib/utilities/types'
	import { writable, type Writable } from 'svelte/store'

	// import type { HfUser } from '$lib/utilities/types'

	let email: string,
		pass: string,
		pass_confirm: string,
		height: number,
		name: string,
		weight: number,
		race: string,
		birthdate: string
	let user: Writable<HfUser | null> = writable(null)

	const createUserT = () => {
		$user = {
			name: name,
			email: email,
			pass: pass,
			weight: weight,
			height: height,
			race: race,
			birthdate: birthdate
		}
	}
</script>

<Content>
	<Grid>
		<div style="width: 8em; margin-bottom: 2em">
			<ImageLoader fadeIn={true} src={logoImage} />
		</div>
		<h1>Sign Up</h1>
		<br />
		<Form
			on:submit={() => {
				createUserT()
				createUser($user, pass_confirm)
			}}
		>
			<Row>
				<Column>
					<TextInput
						bind:value={email}
						name="email"
						labelText="E-mail"
						placeholder="Enter e-mail"
					/>
					<TextInput
						bind:value={name}
						name="name"
						labelText="Name"
						placeholder="Enter your first name"
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
					<br />
					<Row>
						<Column>
							<Row>
								<Column>
									<NumberInput
										bind:value={height}
										name="height"
										label="Height"
										placeholder="e.g. 2.0"
										required
									/>
								</Column>
								<Column>
									<br /> <br />
									<Dropdown
										selectedId={'0'}
										items={[
											{ id: '0', text: 'm (meters)' },
											{ id: '1', text: 'ft (feet)' }
										]}
									/>
								</Column>
								<Column>
									<NumberInput
										bind:value={weight}
										name="weight"
										label="Weight"
										placeholder="e.g. 100"
										required
									/>
								</Column>
								<Column>
									<br /> <br />
									<Dropdown
										selectedId={'0'}
										items={[
											{ id: '0', text: 'kg (kilograms)' },
											{ id: '1', text: 'lb (pounds)' }
										]}
									/>
								</Column>
							</Row>
						</Column>
					</Row>
					<br />
					<Row>
						<Column>
							<MultiSelect
								titleText="Race"
								bind:value={race}
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
							<DatePicker datePickerType="single" required>
								<DatePickerInput
									bind:value={birthdate}
									helperText="ex: 01/21/2000"
									labelText="Select birthdate"
									placeholder="mm/dd/yyyy"
								/>
							</DatePicker>
						</Column>
					</Row>
					<br />
				</Column>
			</Row>
			<Row>
				<Column />
				<Column>
					<Checkbox
						required
						id="accept-checkbox"
						labelText="Accept our Terms and Conditions"
						style="float: right;"
					/>
					<Button
						style="float: right;"
						size="small"
						kind="ghost"
						icon={DocumentPdf}
						iconDescription="open terms and conditions in a new tab"
					/>
				</Column>
			</Row>
			<Row>
				<Column />
				<Column>
					<Button
						style="margin-top: 1em; float: right;"
						icon={CodeSigningService}
						type="submit"
						name="submit">Create Account</Button
					>
				</Column>
			</Row>
			<br />
		</Form>
	</Grid>
</Content>
