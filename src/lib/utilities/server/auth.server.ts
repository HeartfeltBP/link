import { auth_admin } from './firebase.server'
import { getAuth } from 'firebase-admin/auth'
import type { DecodedIdToken } from 'firebase-admin/auth'

export const auth = auth_admin

export const decodeToken = async (token: string): Promise<DecodedIdToken | void> => {
    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token)
    return typeof(decodedToken) != 'undefined' ? decodedToken : undefined
}

export const getUid = async (token: string): Promise<string | void> => {
    const userInfo = await decodeToken(token)
    return userInfo?.uid
}
