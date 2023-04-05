export const ssr = false

import { getAuth } from 'firebase/auth'
import { app } from '$lib/utilities/firebase'
import type { PageLoad } from './$types'

export const load = ( async (cookies) => {
	console.log('*******', cookies)
	const token = await getAuth(app).currentUser?.getIdToken()
	if (token != null) {
		console.log(token)
		const testResponse = await fetch('http://192.168.12.26/', {
			method: 'GET'
		})
		if(testResponse.status != 200) {
			console.error('load')
			return
		} 
		await fetch('http://192.168.12.26/', {
			method: 'POST',
			headers: {
				Authorization: token
			}
		})
	}
}) satisfies PageLoad
