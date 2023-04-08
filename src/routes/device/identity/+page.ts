export const ssr = false

import { goto } from '$app/navigation'
import { uStore } from '$lib/utilities/auth'
import type { PageLoad, PageLoadEvent } from './$types'

export const load = ( async ({ parent }: PageLoadEvent) => {
    if(!uStore) {
        goto('/')
    }
	return
}) satisfies PageLoad
