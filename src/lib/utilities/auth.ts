import { app, auth, firestore } from './firebase'
import {
	createUserWithEmailAndPassword,
	type Auth,
	signInWithEmailAndPassword,
	type User,
	getAuth,
	browserLocalPersistence
} from 'firebase/auth'

import { goto } from '$app/navigation'
import { writable } from 'svelte/store'
import { browser } from '$app/environment'
import cookie from 'cookie'
import type { HfUser } from './types'
import { collection, doc, setDoc } from 'firebase/firestore'

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

export const createAuthEmailPass = async (
	email: string,
	pass: string,
	pass_confirm?: string
): Promise<string | null> => {
	if (pass_confirm !== undefined) {
		if (pass !== pass_confirm) {
			console.error('PASSWORDS DO NOT MATCH!')
			localStorage.setItem('BpmIdentityStatus', 'INVALID')
			return null
		}
	}

	const userCred = await createUserWithEmailAndPassword(getAuth(app), email, pass).catch((e) => {
		const errorCode = e.errorCode
		// const errorMessage = e.errorMessage
		console.log(errorCode, e)
		return null
	})

	return userCred?.user.uid ?? null
}

export const createUser = async (user: HfUser | null, pass_confirm: string) => {
	if (!user) {
		console.error('no user!')
		return
	}
	const uid = await createAuthEmailPass(user.email, user.pass, pass_confirm)

	const userRef = collection(firestore, 'users')

	if (!uid || typeof uid == 'undefined') {
		return -1
	}

	await setDoc(doc(userRef, uid), {
		name: user.name ?? '',
		email: user.email ?? '',
		weight: user.weight ?? '',
		height: user.height ?? '',
		race: user.race ?? '',
		birthdate: user.birthdate ?? ''
	})

	if (window) {
		goto('/stats')
	}
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

				auth.onAuthStateChanged(() => {
					goto('/stats')
				}) // create hook to clear cookies and stuff

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
	return token
}

export const setIdStatus = (status: string) => {
	const idStatus = localStorage.setItem('BpmIdentityStatus', status)
	return typeof idStatus != 'undefined'
}

export const getIdStatus = (status: string) => {
	const idStatus = localStorage.getItem('BpmIdentityStatus')
	return typeof idStatus != 'undefined'
}

auth.setPersistence(browserLocalPersistence)
