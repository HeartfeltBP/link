import { app, auth, firestore } from './firebase'
import { doc, setDoc } from 'firebase/firestore'
import {
	createUserWithEmailAndPassword,
	type Auth,
	signInWithEmailAndPassword,
	type User
} from 'firebase/auth'

import { userStore } from 'sveltefire'

export const hasCurrentUser = (): boolean => {
	const user: User | null = auth.currentUser
	return user ? true : false
}

export const getUid = (): string | null => {
	if(hasCurrentUser()) {
		return auth.currentUser?.uid || null
	}
	return null
}

export const logOut = () => {
	auth.signOut().then(() => {
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

	createUserWithEmailAndPassword(auth, email, pass)
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

export const createUser = async() => {

}

export const checkEmailPass = async (
	email: string,
	pass: string,
): Promise<Auth | null> => {
	console.log(email, pass)

	signInWithEmailAndPassword(auth, email, pass)
		.then((userCredential) => {
			// signed in
			const user = userCredential.user

			console.log(user.uid)
			if (user.uid != undefined) {
				auth.updateCurrentUser(user)
				userStore(auth)
				return auth
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
