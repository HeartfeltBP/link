import { auth_admin } from '$lib/utilities/server/firebase.server'
// import { redirect } from '@sveltejs/kit'
import type { LayoutServerLoad, LayoutServerLoadEvent } from './$types'

export const load = (async ({ cookies }: LayoutServerLoadEvent) => {
	try {
		const token = cookies.get('token')
		const user = token ? await auth_admin.verifyIdToken(token) : null
		return {
			uid: user?.uid,
			token: token
		}
	} catch {
		// The token is set but invalid or expired
		cookies.set('token', '', { maxAge: -1 })
		// throw redirect(307, '/')
	}
}) satisfies LayoutServerLoad
