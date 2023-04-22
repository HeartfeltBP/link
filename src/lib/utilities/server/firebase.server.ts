import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app'
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

export const app_admin = initializeApp({ credential: cert(serviceAccountObj) })
export const firestore_admin: Firestore = getFirestore(app_admin)
firestore_admin.settings({ ignoreUndefinedProperties: true })
export const functions_admin = getFunctions(app_admin)
export const auth_admin = getAuth(app_admin)
