import { auth } from '$lib/utilities/firebase'
import type { RequestHandler } from '@sveltejs/kit'

/**
 * Get device information from BPM if it is in pairing mode
 */
export const GET = (async () => {
	const testResponse = await fetch('http://192.168.12.26:80/', {
		method: 'GET'
	})

	return testResponse
}) satisfies RequestHandler

export const POST = (async ({ cookies }) => {
	console.log('<<><><><><><><><><><><><><><><><><><><><><><><>>')
	const idToken = cookies.get('token')

	if (!idToken || typeof idToken == 'undefined') {
		return new Response('Token not available', { status: 401 })
	}

	console.info('Bpm test GET sending...')
	const testResponse = await fetch('http://192.168.12.26:80/', {
		method: 'GET'
	})

	console.info('Bpm says: ', testResponse.status, testResponse.statusText)

	if (testResponse.status == 200) {
		const postResponse = await fetch('http://192.168.12.26:80/', {
			method: 'POST',
			headers: {
				Authorization: idToken
			}
		})
		if (postResponse.status == 200) {
			console.log(auth.currentUser?.uid)
			console.log(postResponse)
			return new Response(idToken, { status: 200 })
		}
		return new Response(idToken, { status: 400 })
	}

	return new Response(idToken, { status: 400 })
}) satisfies RequestHandler
