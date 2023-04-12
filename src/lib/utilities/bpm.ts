import cookie from 'cookie'
import { auth } from './firebase'

export const bpmPair = async () => {
	const idToken: string = cookie.parse(document.cookie)['token']
	// const idToken: string | null = localStorage.getItem('token')

	console.log('.oOoOoOoOooOoOo({<0>})OoOoOoOoOoOooOo.')
	console.log(idToken)

	try {
		if (!idToken || typeof idToken == 'undefined') {
			return new Response('Token not available', { status: 401 })
		}
	} catch (e) {
		console.error('Token not available')
		console.error(e)
		return
	}

	console.info('Bpm test GET sending...')
	let testResponse: Response, postResponse: Response

	try {
		testResponse = await fetch('http://192.168.12.26:80/', {
			method: 'GET'
		})
	} catch (e) {
		console.error('Could not recieve device handshake')
		console.error(e)
		return
	}

	console.info('Bpm says: ', testResponse.status, testResponse.statusText)
	try {
		if (testResponse.status == 200) {
			postResponse = await fetch('http://192.168.12.26:80/', {
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
	} catch (e) {
		console.error('Could not send pairing token to BPM')
		console.error(e)
	}
}
