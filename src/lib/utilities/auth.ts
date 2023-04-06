import { app, firestore, auth } from './firebase'
import {
	createUserWithEmailAndPassword,
	type Auth,
	signInWithEmailAndPassword,
	type User,
	getAuth
} from 'firebase/auth'

import { goto } from '$app/navigation'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import cookie from 'cookie'

export const uStore = writable<User | null>(null)

export const hasCurrentUser = (): boolean => {
	console.log(getAuth(app))
	const user: User | null = getAuth(app).currentUser
	return user ? true : false
}

// export const getUid = (): string | null => {
// 	if(hasCurrentUser()) {
// 		return getAuth(app).currentUser?.uid || null
// 	}
// 	return null
// }

export const logOut = () => {
	getAuth(app).signOut().then(() => {
		// successful signout!
		document.cookie = ""
		console.log('logged out... womp womp')
		console.log(document.cookie)
		return false
	})
}

export const createAuthEmailPass = async (
	email: string,
	pass: string,
	pass_confirm?: string,
) => {
	if (pass_confirm !== undefined) {
		if (pass !== pass_confirm) {
			console.error('PASSWORDS DO NOT MATCH!')
			localStorage.setItem('BpmIdentityStatus', 'INVALID')
			return -1
		}
	}

	createUserWithEmailAndPassword(getAuth(app), email, pass)
		.then(async (userCredential) => {
			// signed in
			const user = userCredential.user
			// await setDoc(doc(firestore, 'users', user.uid), {
			// 	DOB: 'bungo',
			// 	Height: 'bungo',
			// 	Name: 'bungo',
			// 	Weight: 'bungo'
			// })
		})

		.catch((e) => {
			const errorCode = e.errorCode
			const errorMessage = e.errorMessage
			console.log(errorCode, e)
			return -1
		})

	return 0
}

export const createUser = async () => {

}

// export const syncUser = async () =>
// {
// 	const userAuth: Auth = getAuth(app)
// 	if(!userAuth.currentUser) {
// 		return
// 	}
	
// 	const token = await userAuth.currentUser.getIdToken()

// 	const response = await fetch('/account/session', {
// 		method: 'POST',
// 		body: token
// 	})

// 	return await response.text()
// }

export const checkEmailPass = async (
	email: string,
	pass: string,
): Promise<Auth | null> => {

	if(!browser) {
		console.log('no browser available')
		return null
	}

	if(email.length <= 3) {
		console.info('enter a proper email please')
		return null
	}

	if(pass.length <= 4) {
		console.info('unexpectedly bad password')
		return null
	}

	console.info('signing in', email, '...')

	signInWithEmailAndPassword(auth, email, pass)
		.then ( async (userCredential) => {
			// signed in
			const curUser = userCredential.user

			if (curUser.uid != undefined) {
				console.info('🪪')

				auth.onAuthStateChanged(() => goto('/account/signin')) // create hook to clear cookies and stuff
				auth.onIdTokenChanged( async () => {
					const isTokenSet: boolean = cookie.parse(document.cookie)['token'] !== undefined
					const token: string = await curUser.getIdToken()

					document.cookie = cookie.serialize('token', token ?? '', {
						path: '/',
						maxAge: token ? undefined : 0
					})

					uStore.set(curUser)

					if(!isTokenSet && token) {
						document.location.reload()
					}
				})

				// setInterval(async () => {
				// 	if(auth.currentUser) {
				// 		await auth.currentUser.getIdToken(true)
				// 	}
				// }, (10 * 60 * 1000))
				
				return getAuth(app)
			}
		})
		.catch((e) => {
			const errorCode = e.errorCode
			const errorMessage = e.errorMessage
			console.log(errorCode, e)
			return null
		})
	return null
}
