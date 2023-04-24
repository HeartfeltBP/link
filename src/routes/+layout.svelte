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
		HeaderActionLink,
		HeaderPanelLinks,
		HeaderNavItem,
		HeaderNavMenu,
		HeaderNav,
		Theme
	} from 'carbon-components-svelte'

	import Home from 'carbon-icons-svelte/lib/Home.svelte'
	import ChartComboStacked from 'carbon-icons-svelte/lib/ChartComboStacked.svelte'
	import WatsonHealthHoleFilling from 'carbon-icons-svelte/lib/WatsonHealthHoleFilling.svelte'
	import Settings from 'carbon-icons-svelte/lib/Settings.svelte'
	import Api from 'carbon-icons-svelte/lib/Api.svelte'
	import { LocationHeart, LogoGithub, UserAvatarFilledAlt } from 'carbon-icons-svelte'

	import 'carbon-components-svelte/css/all.css'
	import { auth } from '$lib/utilities/firebase.js'
	import { logOut } from '$lib/utilities/auth.js'
	import { userStore } from 'sveltefire'
	import { readable } from 'svelte/store'
	import type { CarbonTheme } from 'carbon-components-svelte/types/Theme/Theme.svelte'

	let isSideNavOpen: boolean = false
	let persistentHamburgerMenu: boolean = true
	let platformName: string = "Link"

	const user = userStore(auth)

	// if (typeof window != 'undefined') {
	// 	const perf = getPerformance(app)
	// }
	let theme: CarbonTheme = 'g100'
	if(typeof window != 'undefined') {
		if($user) {
		isSideNavOpen = false
		persistentHamburgerMenu = true
		platformName = "Link"
		} else {
			isSideNavOpen = false
			// persistentHamburgerMenu = false
			platformName = "Home"
		}
		if(!localStorage.getItem('theme')) {
			localStorage.setItem('theme', theme)
		}
		theme = <CarbonTheme>localStorage.getItem('theme') ?? 'g100'
	}
	let val
</script>

<Theme bind:theme />

<svelte:head>
	<title>Login</title>
	<meta name="description" content="About this app" />
</svelte:head>

<Header company="Heartfelt" bind:platformName={platformName} bind:persistentHamburgerMenu={persistentHamburgerMenu} bind:isSideNavOpen={isSideNavOpen}>
	<svelte:fragment slot="skip-to-content">
		<SkipToContent />
	</svelte:fragment>
	{#if !$user} 
	<HeaderNav>
		<HeaderNavItem text="Home" href="/"/>
		<HeaderNavMenu text="About" href="/"> 
			<HeaderNavItem text="Project Overview" href="/"/>
			<HeaderNavItem text="Team" href="/"/>
			<HeaderNavItem text="Development" href="/"/>
		</HeaderNavMenu>
		<HeaderNavMenu text="Technology" href="/"> 
			<HeaderNavItem text="BPM" href="/"/>
			<HeaderNavItem text="ML Model" href="/"/>
			<HeaderNavItem text="Infrastructure" href="/"/>
		</HeaderNavMenu>
	</HeaderNav>
	{/if}
	<HeaderUtilities>
		<HeaderActionLink icon={LogoGithub} href="https://github.com/HeartfeltBP" />
		{#if $user}
			<HeaderActionLink icon={Settings} href="/settings" />
		{/if}
		<HeaderAction icon={UserAvatarFilledAlt}>
			<HeaderPanelLinks>
				<HeaderPanelDivider>Settings</HeaderPanelDivider>
				{#if $user}
				<HeaderPanelLink href="/">All Settings</HeaderPanelLink>
				{/if}

				{#if theme == "g100"}
					<HeaderPanelLink on:click={() => {theme="g10"; localStorage.setItem('theme', theme); location.reload()}}>Light Mode</HeaderPanelLink>
				{:else}
					<HeaderPanelLink on:click={() => {theme="g100"; localStorage.setItem('theme', theme); location.reload()}}>Dark Mode</HeaderPanelLink>
				{/if}


				<HeaderPanelDivider>Account Actions</HeaderPanelDivider>
				{#if $user}
					<HeaderPanelLink on:click={() => logOut()}>Log Out</HeaderPanelLink>
					<HeaderPanelDivider>Navigation</HeaderPanelDivider>
					<HeaderPanelLink href="/">Heartfelt Home</HeaderPanelLink>
					<HeaderPanelLink href="/">Link Home</HeaderPanelLink>
				{:else}
					<HeaderPanelLink href="/account/login">Log In</HeaderPanelLink>
				{/if}
			</HeaderPanelLinks>
		</HeaderAction>
	</HeaderUtilities>
</Header>

{#if $user}
<SideNav bind:isOpen={isSideNavOpen}>
	<SideNavItems>
		<SideNavLink icon={Home} href="/" text="Home" />
			<SideNavLink icon={ChartComboStacked} href="/stats" text="Stats" />
			<SideNavLink icon={WatsonHealthHoleFilling} href="/device" text="Device" />
			<SideNavLink icon={Settings} href="/settings" text="Settings" />
		<SideNavLink icon={Api} href="/api" text="Api" />
	</SideNavItems>
</SideNav>
{/if}

<Content>
	<slot />
</Content>
