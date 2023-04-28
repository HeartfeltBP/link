import { initializeApp, cert, type ServiceAccount, getApps } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'
import { getFunctions } from 'firebase-admin/functions'
import { getAuth } from 'firebase-admin/auth'
import accountJsonObj from './heartfelt-0-firebase-adminsdk.json'

const serviceAccountObj: ServiceAccount = {
	privateKey: accountJsonObj.private_key,
	projectId: accountJsonObj.project_id,
	clientEmail: accountJsonObj.client_email
}

// TODO: wrap in functions with error handling for multiple firebase initializations on dev
const initInit: boolean = getApps().length === 0
export const app_admin = initInit
	? initializeApp({ credential: cert(serviceAccountObj) })
	: getApps()[0]
export const firestore_admin: Firestore = getFirestore(app_admin)
if (initInit) {
	firestore_admin.settings({ ignoreUndefinedProperties: true })
}
export const functions_admin = getFunctions(app_admin)
export const auth_admin = getAuth(app_admin)
