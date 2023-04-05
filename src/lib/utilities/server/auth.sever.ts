// import { app_admin } from './firebase.server'
// import { getAuth, type DecodedIdToken } from 'firebase-admin/auth'

// const auth = getAuth(app_admin)

// export const decodeToken = async (token: string): Promise<DecodedIdToken | void> => {
//     const decodedToken: DecodedIdToken = await auth.verifyIdToken(token)
//     return typeof(decodedToken) != 'undefined' ? decodedToken : undefined
// }

// export const getUid = async (token: string): Promise<string | void> => {
//     const userInfo = await decodeToken(token)
//     return userInfo?.uid
// }
