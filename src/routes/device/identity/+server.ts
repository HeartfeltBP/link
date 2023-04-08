import { auth } from '$lib/utilities/firebase'
import type { RequestHandler } from '@sveltejs/kit'


/**
 * Get device information from BPM if it is in pairing mode
 */
export const GET = ( async ({request, cookies}) => {
	const testResponse = await fetch('http://192.168.12.26:80/', {
		method: 'GET'
	})
})

export const POST = ( async ({ request, cookies }) => {
	
	console.log('<<><><><><><><><><><><><><><><><><><><><><><><>>')
	const idToken = cookies.get('token')

	const idStatus = localStorage.getItem('BpmIdentityStatus')
	if(idStatus === 'OK') {
		return new Response('ID Status OK, aborting', { status: 302 })
	}

    if(!idToken || typeof(idToken) == 'undefined') {
        return new Response('Token not available', { status: 401 })
    }

	console.info('Bpm test GET sending...')
	const testResponse = await fetch('http://192.168.12.26:80/', {
		method: 'GET'
	})

	console.info('Bpm says: ', testResponse.status, testResponse.statusText)

	if(testResponse.status == 200) {
		const postResponse = await fetch('http://192.168.12.26:80/', {
			method: 'POST',
			headers: {
				'Authorization': idToken,
			}
		})
		if(postResponse.status == 200) {
			localStorage.setItem('BpmIdentityStatus', 'OK')
            console.log(auth.currentUser?.uid)
		    console.log(postResponse)	
            return new Response(idToken, {status: 400})
		}
        return new Response(idToken, {status: 400})
	}
    
    return new Response(idToken, {status: 400})
}) satisfies RequestHandler