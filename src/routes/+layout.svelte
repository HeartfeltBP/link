<script lang="ts">
	import {
		Content,
		HeaderUtilities,
		SideNav,
		SideNavItems,
		SideNavLink,
		SkipToContent,
		HeaderAction,
		Header,
		HeaderPanelLink,
		HeaderPanelDivider,
		HeaderActionLink
	} from 'carbon-components-svelte'

	import Home from 'carbon-icons-svelte/lib/Home.svelte'
	import ChartComboStacked from 'carbon-icons-svelte/lib/ChartComboStacked.svelte'
	import WatsonHealthHoleFilling from 'carbon-icons-svelte/lib/WatsonHealthHoleFilling.svelte'
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte'
	import Api from 'carbon-icons-svelte/lib/Api.svelte'
	import { LogoGithub, UserAvatarFilledAlt } from 'carbon-icons-svelte'

	import 'carbon-components-svelte/css/g100.css'
	import { auth } from '$lib/utilities/firebase.js'
	import { logOut } from '$lib/utilities/auth.js'
	import { userStore } from 'sveltefire'

	let isSideNavOpen = false
	const user = userStore(auth)
	// if (typeof window != 'undefined') {
	// 	const perf = getPerformance(app)
	// }
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Header company="Heartfelt" platformName="Link" persistentHamburgerMenu={true} bind:isSideNavOpen>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	<HeaderUtilities>
		<HeaderActionLink icon={LogoGithub} href="https://github.com/HeartfeltBP" />
		{#if $user}
			<HeaderActionLink icon={Settings} href="/settings" />
		{/if}
		<HeaderAction icon={UserAvatarFilledAlt}>
			<HeaderPanelDivider>Account Actions</HeaderPanelDivider>
			{#if $user}
				<HeaderPanelLink on:click={() => logOut()}>Log Out</HeaderPanelLink>
			{:else}
				<HeaderPanelLink href="/account/login">Log In</HeaderPanelLink>
			{/if}
		</HeaderAction>
	</HeaderUtilities>
</Header>

<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink icon={Home} href="/" text="Home" />
		{#if $user}
			<SideNavLink icon={ChartComboStacked} href="/stats" text="Stats" />
			<SideNavLink icon={WatsonHealthHoleFilling} href="/device" text="Device" />
			<SideNavLink icon={Settings} href="/settings" text="Settings" />
		{/if}
		<SideNavLink icon={Api} href="/api" text="Api" />
	</SideNavItems>
</SideNav>

<Content>
	<slot />
</Content>
