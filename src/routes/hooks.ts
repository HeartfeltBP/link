import type { Handle } from "@sveltejs/kit"
import { app } from '$lib/utilities/firebase'
import { getAuth } from "firebase/auth"

export const handle = (async ({ event, resolve }) => {

    if(event.url.pathname.startsWith('/account')) {
        console.log("Hook'er")
        console.log(getAuth(app))
        const token = await getAuth(app).currentUser?.getIdToken()
        const uid = getAuth(app).currentUser?.uid

        if(typeof(token) != 'undefined' && typeof(uid) != 'undefined') {
            console.log("Setting Cookies...")
            event.cookies.set('UID (hackers ignore)', uid, {path:'/'})
            event.cookies.set('idToken', token, {path:'/'})
            
            
            return new Response('set Id Token', { status: 200 })
        }
        return new Response('Failed to retrieve token', { status: 400 })
    }

    return new Response('Bungo', {status: 200})
}) satisfies Handle