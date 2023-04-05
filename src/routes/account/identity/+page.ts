import type { PageLoad } from './types'
import { app } from '$lib/utilities/firebase'
import { getAuth } from 'firebase/auth'

export const load = ( async () => {
    const userAuth = getAuth(app)
    if(userAuth.currentUser == null) {
        return new Response('Unavailable', {status: 401})
    }
    const userToken = await userAuth.currentUser.getIdToken()
    return new Response(userToken, {status: 200})
}) satisfies Req