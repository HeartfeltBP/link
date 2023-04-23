export const ssr = false

import { goto } from '$app/navigation'
import { uStore } from '$lib/utilities/auth'
import type { PageLoad } from './$types'

export const load = (async () => {
	if (!uStore) {
		goto('/')
	}
	return
}) satisfies PageLoad
