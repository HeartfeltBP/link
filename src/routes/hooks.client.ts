import type { Handle } from "@sveltejs/kit"
import { app } from '$lib/utilities/firebase'
import { getAuth } from "firebase/auth"

export const ssr = false

export const handle = (async ({ event, resolve }) => {

    if(event.url.pathname.startsWith('/account/signin')) {
        console.log('*******', event.cookies)
        const token = await getAuth(app).currentUser?.getIdToken()
        if (token != null) {
            console.log(token)
            const testResponse = await fetch('http://192.168.12.26/', {
                method: 'GET'
            })
            if(testResponse.status != 200) {
                console.error('load')
                return new Response('Failed to retrieve token', { status: 400 })
            } 
            const response = await fetch('http://192.168.12.26/', {
                method: 'POST',
                headers: {
                    Authorization: token
                }
            })

            console.log(testResponse, response)
        }
        return new Response('Bungo', {status: 200})
    }

    return new Response('Bungo', {status: 200})
}) satisfies Handle

