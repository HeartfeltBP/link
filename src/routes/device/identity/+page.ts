export const ssr = false

import { auth } from '$lib/utilities/firebase'
import type { PageLoad, PageLoadEvent } from './$types'


export const load = ( async ({ parent }: PageLoadEvent) => {
	const { token } = await parent()
	
	console.log('<<><><><><><><><><><><><><><><><><><><><><><><>>')
	const idToken = token

	const idStatus = localStorage.getItem('BpmIdentityStatus')
	
	if(idStatus === 'OK') {
		return
	}

	console.info('Bpm test GET sending...')
	const testResponse = await fetch('http://192.168.12.26:80/', {
		method: 'GET'
	})

	console.info('Bpm says: ', testResponse.status, testResponse.statusText)

	if(testResponse.status == 200) {
		if(!idToken) {
			return
		}
		const postResponse = await fetch('http://192.168.12.26:80/', {
			method: 'POST',
			headers: {
				'Authorization': idToken,
			}
		})
		if(postResponse.status == 200) {
			localStorage.setItem('BpmIdentityStatus', 'OK')
		}
		console.log(auth.currentUser?.uid)
		console.log(postResponse)
		return { ...auth }	
	}
	return
}) satisfies PageLoad
