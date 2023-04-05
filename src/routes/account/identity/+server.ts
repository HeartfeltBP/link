import type { PageLoad } from './types'
import { app } from '$lib/utilities/firebase'
import { getAuth } from 'firebase/auth'
import type { RequestHandler } from '@sveltejs/kit'

export const GET = ( async ({ request, cookies }) => {
    const userToken = cookies.get('idToken')

    if(typeof(userToken) == 'undefined') {
        return new Response('Unavailable', {status: 401})
    }
    
    return new Response(userToken, {status: 200})
}) satisfies RequestHandler