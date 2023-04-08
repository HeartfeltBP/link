import { auth_admin } from './firebase.server'
import type { DecodedIdToken } from 'firebase-admin/auth'

export const decodeToken = async (token: string): Promise<DecodedIdToken | void> => {
    const decodedToken: DecodedIdToken = await auth_admin.verifyIdToken(token)
    return typeof(decodedToken) != 'undefined' ? decodedToken : undefined
}

export const getUid = async (token: string): Promise<string | void> => {
    const userInfo = await decodeToken(token)
    return userInfo?.uid
}
