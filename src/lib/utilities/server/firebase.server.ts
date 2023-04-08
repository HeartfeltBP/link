import { initializeApp, cert, type AppOptions, type Credential, type ServiceAccount, getApp } from 'firebase-admin/app'
import { initializeFirestore, getFirestore, Firestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { getAuth } from 'firebase-admin/auth'
import accountJsonObj from './heartfelt-0-firebase-adminsdk-unf3t-f96f6a2e58.json'

const serviceAccount = accountJsonObj
const serviceAccountObj: ServiceAccount = { 
	privateKey: accountJsonObj.private_key, 
	projectId: accountJsonObj.project_id,
	clientEmail: accountJsonObj.client_email
}

export const app_admin = initializeApp({credential: cert(serviceAccountObj)})
export const firestore_admin: Firestore = getFirestore(app_admin)
firestore_admin.settings({ ignoreUndefinedProperties: true })
export const functions_admin = getFunctions(app_admin)
export const auth_admin = getAuth(app_admin)