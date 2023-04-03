import { app, auth, firestore } from './firebase'
import { doc, setDoc } from 'firebase/firestore'
import {
	getAuth,
	createUserWithEmailAndPassword,
	type Auth,
	signInWithEmailAndPassword
} from 'firebase/auth'

import { userStore } from 'sveltefire'

export const hasCurrentUser = (auth: Auth = getAuth(app)): boolean => {
	const user = auth.currentUser
	return user ? true : false
}

export const logOut = (auth: Auth = getAuth(app)) => {
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
	auth: Auth = getAuth(app)
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

export const checkEmailPass = async (email: string, pass: string, auth: Auth = getAuth(app)): Promise<Auth | null> => {
	console.log(email, pass)

	signInWithEmailAndPassword(auth, email, pass)
		.then((userCredential) => {
			// signed in
			const user = userCredential.user

			console.log(user.uid)
			if(user.uid != undefined) {
				auth.updateCurrentUser(user)
				userStore(auth)
				return auth
			}
		})
		.catch((e) => {
			const errorCode = e.errorCode
			const errorMessage = e.errorMessage
			console.log(errorCode, e)
			return -1
		})
}
