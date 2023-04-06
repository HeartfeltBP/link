import type { PageLoad } from './$types'
import { app } from '$lib/utilities/firebase'
import { getAuth } from 'firebase/auth'
import { redirect } from '@sveltejs/kit'

// TODO: identity page should be seperate setup from login to sync device
// work in to onboarding

// export const load = ( async () => {
//     const userAuth = getAuth(app)
//     if(userAuth.currentUser == null) {
//         return new Response('Unavailable', {status: 401})
//     }
//     const userToken = await userAuth.currentUser.getIdToken()
//     return new Response(userToken, {status: 200})
// }) satisfies Req