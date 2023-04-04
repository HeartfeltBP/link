import { app, firestore } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import {
	createUserWithEmailAndPassword,
	type Auth,
	signInWithEmailAndPassword,
	type User,
	getAuth
} from 'firebase/auth'

import { userStore } from 'sveltefire'
import { goto } from '$app/navigation'

export const hasCurrentUser = (): boolean => {
	console.log(getAuth(app))
	const user: User | null = getAuth(app).currentUser
	return user ? true : false
}

export const getUid = (): string | null => {
	if(hasCurrentUser()) {
		return getAuth(app).currentUser?.uid || null
	}
	return null
}

export const logOut = () => {
	getAuth(app).signOut().then(() => {
		// successful signout!
		console.log('logged out... womp womp')
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
			return -1
		}
	}

	createUserWithEmailAndPassword(getAuth(app), email, pass)
		.then(async (userCredential) => {
			// signed in
			const user = userCredential.user
			await setDoc(doc(firestore, 'users', user.uid), {
				DOB: 'bungo',
				Height: 'bungo',
				Name: 'bungo',
				Weight: 'bungo'
			})
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

export const syncUser = async () =>
{
	const userAuth: Auth = getAuth(app)
	if(!userAuth.currentUser) {
		return
	}
	
	const token = await userAuth.currentUser.getIdToken()

	const response = await fetch('/auth/session', {
		method: 'POST',
		body: token
	})

	return await response.text()
}

export const checkEmailPass = async (
	email: string,
	pass: string,
): Promise<Auth | null> => {
	console.log(email, pass)

	signInWithEmailAndPassword(getAuth(app), email, pass)
		.then ( async (userCredential) => {
			// signed in
			const user = userCredential.user

			console.log()

			if (user.uid != undefined) {
				console.info('🪪')
				getAuth(app).onAuthStateChanged(() => goto('/')) // create hook to clear cookies and stuff
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
