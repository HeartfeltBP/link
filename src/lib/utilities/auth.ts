import { app, auth } from './firebase'
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
	return uStore ? true : false
}

// export const getUid = (): string | null => {
// 	if(hasCurrentUser()) {
// 		return getAuth(app).currentUser?.uid || null
// 	}
// 	return null
// }

export const logOut = () => {
	getAuth(app)
		.signOut()
		.then(() => {
			// successful signout!
			document.cookie = ''
			console.log('logged out... womp womp')
			console.log(document.cookie)
			return false
		})
}

export const createAuthEmailPass = async (email: string, pass: string, pass_confirm?: string) => {
	if (pass_confirm !== undefined) {
		if (pass !== pass_confirm) {
			console.error('PASSWORDS DO NOT MATCH!')
			localStorage.setItem('BpmIdentityStatus', 'INVALID')
			return -1
		}
	}

	createUserWithEmailAndPassword(getAuth(app), email, pass)
		.then(async () => {
			// signed in
			// const user = userCredential.user
			// await setDoc(doc(firestore, 'users', user.uid), {
			// 	DOB: 'bungo',
			// 	Height: 'bungo',
			// 	Name: 'bungo',
			// 	Weight: 'bungo'
			// })
		})

		.catch((e) => {
			const errorCode = e.errorCode
			// const errorMessage = e.errorMessage
			console.log(errorCode, e)
			return -1
		})

	return 0
}

export const createUser = async () => {
	// wrap create with email with this to also send things to db
}

export const checkEmailPass = async (email: string, pass: string): Promise<Auth | null> => {
	if (!browser) {
		console.log('no browser available')
		return null
	}

	if (email.length <= 3) {
		console.info('enter a proper email please')
		return null
	}

	if (pass.length <= 4) {
		console.info('unexpectedly bad password')
		return null
	}

	console.info('signing in', email, '...')

	signInWithEmailAndPassword(auth, email, pass)
		.then(async (userCredential) => {
			// signed in
			const curUser = userCredential.user

			if (curUser.uid != undefined) {
				console.info('🪪')

				auth.onAuthStateChanged(() => goto('/account/signin')) // create hook to clear cookies and stuff
				auth.onIdTokenChanged(async () => {
					const isTokenSet: boolean = cookie.parse(document.cookie)['token'] !== undefined
					const token: string = await curUser.getIdToken()

					// do with localstorage or session storage instead?
					document.cookie = cookie.serialize('token', token ?? '', {
						path: '/',
						maxAge: token ? undefined : 0
					})

					uStore.set(curUser)

					if (!isTokenSet && token) {
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
			// const errorMessage = e.errorMessage
			console.log(errorCode, e)
			return null
		})
	return null
}

export const getSetNewIdToken = async (): Promise<string | null> => {
	const token = (await auth.currentUser?.getIdToken()) ?? null
	document.cookie = cookie.serialize('token', token ?? '', {
		path: '/',
		maxAge: token ? undefined : 0
	})
	localStorage.setItem('token', token ?? '')
	return token
}

export const setIdStatus = (status: string) => {
	const idStatus = localStorage.setItem('BpmIdentityStatus', status)
	return typeof idStatus != 'undefined'
}

export const getIdStatus = () => {
	const idStatus = localStorage.getItem('BpmIdentityStatus')
	return typeof idStatus != 'undefined'
}
