import type { Frame, FrameHeader } from '../types'
import { getAuth } from 'firebase-admin/auth'
import type { DocumentReference, WriteResult, DocumentData } from 'firebase-admin/firestore'
import { PUBLIC_projectId } from '$env/static/public'
import { DOC_ENDPOINT, GOOGLE_API, DATA_DB_TEST } from '$lib/utilities/constants'
import { firestore_admin } from './firebase.server'
import { getUid } from './auth.server'
   
export const uploadFrame = async (token: string, frame: Frame, frameHeader?: FrameHeader): Promise<string> => {
	const uid = await getUid(token)

    if(!uid || typeof(uid) == 'undefined' || uid == null) {
        console.error('User not logged in. UID not available...')
        return 'FAIL'
    }
    
    const framePath = `${DATA_DB_TEST}${uid}/frames/`
    const headerPath = `${DATA_DB_TEST}${uid}/headers/`
    
    if(frame.fid && frame.fid == 'INIT') {
        console.log(framePath, headerPath, frame.fid)
		const frameRef: DocumentReference = await firestore_admin.collection(framePath).add(frame)
		console.log(framePath, headerPath, frameRef.id);
        await firestore_admin.doc(framePath + `${frame.fid}`).set(frame)

        if(typeof(frameHeader) != 'undefined') {
            // await firestore_admin.doc(headerPath + `${frame.fid}`).set(frameHeader)
			 await firestore_admin.doc(headerPath + `${frameRef.id}`).set(frameHeader)
        }
        return frameRef.id.toString()
    } else if(frame.fid && frame.fid != 'INIT'){
        await firestore_admin.doc(framePath + `${frame.fid}`).set(frame)

        if(typeof(frameHeader) != 'undefined' && typeof(frame.fid) != 'undefined') {
            await firestore_admin.doc(headerPath + `${frame.fid}`).set(frameHeader)
        }
    }
	return 'INIT'
}

// export const uploadFrameHttp = async (uid: string, token: string, frame: Frame, frameHeader?: FrameHeader) =>
// {
// 	let method = 'POST'
// 	let framePath = GOOGLE_API + `projects/${PUBLIC_projectId}/` + DOC_ENDPOINT + DATA_DB_TEST + `${uid}/frames`
// 	let headerPath = GOOGLE_API + `projects/${PUBLIC_projectId}/` + DOC_ENDPOINT + DATA_DB_TEST + `${uid}/headers`

// 	if (frame.fid && frame.fid != 'INIT') {
// 		method = 'PATCH'
// 		headerPath += `/${frame.fid}`
// 		framePath += `/${frame.fid}`
// 	}
// 	const uploadDoc: DocumentData = { ...frame }
	
// 	const fResponse = await fetch(framePath, {
// 		method: method,
// 		body: JSON.stringify(uploadDoc),
// 		headers: {
// 			'content-type': 'application/json',
// 			Authorization: `Bearer ${token}`
// 		}
// 	})

// 	const hResponse = await fetch(headerPath, {
// 		method: method,
// 		body: JSON.stringify(uploadDoc),
// 		headers: {
// 			'content-type': 'application/json',
// 			Authorization: `Bearer ${token}`
// 		}
// 	})

// 	return await hResponse.json() & await fResponse.json()
// }