import { initializeApp, type FirebaseOptions, type FirebaseApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getFunctions, type Functions } from 'firebase/functions'
import { getAuth, type Auth, setPersistence, browserSessionPersistence } from 'firebase/auth'
// import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '$env/static/private'
import {
	PUBLIC_apiKey,
	PUBLIC_authDomain,
	PUBLIC_projectId,
	PUBLIC_storageBucket,
	PUBLIC_messagingSenderId,
	PUBLIC_appId
} from '$env/static/public'

const config: FirebaseOptions = {
	apiKey: PUBLIC_apiKey,
	authDomain: PUBLIC_authDomain,
	projectId: PUBLIC_projectId,
	storageBucket: PUBLIC_storageBucket,
	messagingSenderId: PUBLIC_messagingSenderId,
	appId: PUBLIC_appId
}

export const app: FirebaseApp = initializeApp(config)
export const functions: Functions = getFunctions(app)
// connectFunctionsEmulator(functions, '127.0.0.1', 5001)

export const firestore: Firestore = getFirestore(app)
export const auth: Auth = getAuth(app)
setPersistence(auth, browserSessionPersistence)