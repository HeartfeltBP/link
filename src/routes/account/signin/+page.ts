export const ssr = false

import { app, auth } from '$lib/utilities/firebase'
import type { PageLoad, PageLoadEvent } from './$types'
import { subscribe } from 'svelte/internal'

export const load = ( async ({parent}: PageLoadEvent) => {
	const { uid, token } = await parent()
	// console.log('*******', cookies)
	console.log('<<><><><><><><><><><><><><><><><><><><><><><><>>')
	const auths = auth
	const idToken = token
	console.log('badungo!!.......', uid)

	console.log('<1>')
	const testResponse = await fetch('http://192.168.12.26:80/', {
		method: 'GET'
	})

	if(!idToken) {
		return
	}
	const postResponse = await fetch('http://192.168.12.26:80/', {
		method: 'POST',
		headers: {
			'Authorization': idToken,
		}
	})
	// 	if(testResponse.status != 200) {
	// 		console.error('load')
	// 		return
	// 	} 
	// 	await fetch('http://192.168.12.26/', {
	// 		method: 'POST',
	// 		headers: {
	// 			Authorization: token
	// 		}
	// 	})
	// }
	console.log(auth.currentUser?.uid)
	console.log(postResponse)
	return { ...auth }
}) satisfies PageLoad
