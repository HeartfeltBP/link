export const ssr = false

import { goto } from '$app/navigation'
import { auth } from '$lib/utilities/firebase'
import type { PageLoad, PageLoadEvent } from './$types'

export const load = ( async ({ parent }: PageLoadEvent) => {
    if(!auth.currentUser) {
        goto('/')
    }
	return
}) satisfies PageLoad
