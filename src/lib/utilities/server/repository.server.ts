import type { HfFrame, HfFrameHeader } from '../types'
import type { DocumentReference } from 'firebase-admin/firestore'
import { DATA_DB } from '$lib/utilities/constants'
import { firestore_admin } from './firebase.server'
import { getUid } from './auth.server'

export const uploadFrame = async (
	token: string,
	frame: HfFrame,
	frameHeader?: HfFrameHeader
): Promise<string | null> => {
	const uid = await getUid(token)

	if (!uid || typeof uid == 'undefined' || uid == null) {
		console.error('User not logged in. UID not available...')
		return null
	}

	const framePath = `${DATA_DB}${uid}/frames/`
	const headerPath = `${DATA_DB}${uid}/headers/`

	if (frame.fid && frame.fid === 'INIT') {
		frame.fid = undefined
		console.log(framePath, headerPath, frame.fid)
		const frameRef: DocumentReference = await firestore_admin.collection(framePath).add(frame)
		console.log(framePath, headerPath, frameRef.id)

		if (typeof frameHeader != 'undefined') {
			await firestore_admin.doc(headerPath + `${frameRef.id}`).set(frameHeader)
		}
		return frameRef.id
	} else if (frame.fid && frame.fid != 'INIT' && frame.fid.length > 4) {
		if (
			!firestore_admin
				.collection(framePath)
				.doc(frame.fid)
				.get()
				.then((query) => query.exists)
		) {
			return null
		}

		await firestore_admin.doc(framePath + `${frame.fid}`).update({ ...frame })
		if (typeof frameHeader != 'undefined' && typeof frame.fid != 'undefined') {
			await firestore_admin.doc(headerPath + `${frame.fid}`).update({ ...frameHeader })
		}
	}
	return null
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
