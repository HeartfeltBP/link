import type { PageLoad } from './types'
import { app } from '$lib/utilities/firebase'
import { getAuth } from 'firebase/auth'
import { redirect } from '@sveltejs/kit'

// TODO: identity page should just be proxy for bpm handshake
// could check or send other things serverside related to signin,
// if BPM not found, have seperate path to  

// export const load = ( async () => {
//     const userAuth = getAuth(app)
//     if(userAuth.currentUser == null) {
//         return new Response('Unavailable', {status: 401})
//     }
//     const userToken = await userAuth.currentUser.getIdToken()
//     return new Response(userToken, {status: 200})
// }) satisfies Req