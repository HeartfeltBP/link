import { initializeApp, cert, type AppOptions, type Credential } from 'firebase-admin/app'
import { initializeFirestore, getFirestore, Firestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { getAuth } from 'firebase-admin/auth'
import {
	PUBLIC_apiKey,
	PUBLIC_authDomain,
	PUBLIC_projectId,
	PUBLIC_storageBucket,
	PUBLIC_messagingSenderId,
	PUBLIC_appId
} from '$env/static/public'

var serviceAccount = require("./heartfelt-0-firebase-adminsdk-unf3t-f96f6a2e58.json");

export const app_admin = initializeApp({credential: cert(serviceAccount), databaseURL: PUBLIC_storageBucket})
export const firestore_admin: Firestore = getFirestore(app_admin)
export const functions_admin = getFunctions(app_admin)
export const auth_admin = getAuth(app_admin)