import { app, firestore } from './firebase'
import { doc, getDoc, setDoc, type DocumentData } from 'firebase/firestore'
import {
	createUserWithEmailAndPassword,
	type Auth,
	signInWithEmailAndPassword,
	type User,
	getAuth
} from 'firebase/auth'
import { PUBLIC_projectId } from '$env/static/public'
import { DOC_ENDPOINT, GOOGLE_API } from './constants'
import type { Frame, FrameHeader } from './types'


export const sendFrameHttp = async (frame: Frame, frameHeader?: FrameHeader) =>
{
	const userAuth: Auth = getAuth(app)
	if(!userAuth.currentUser) {
		return
	}

	const method: string = (frame.fid && frame.fid != 'INIT') ? 'PATCH' : 'POST'
	const uploadDoc: DocumentData = { ...frame }
	
	const token = await userAuth.currentUser.getIdToken()

	let path = GOOGLE_API + `projects/${PUBLIC_projectId}/` + DOC_ENDPOINT 
	const response = await fetch(path, {
		method: method,
		body: JSON.stringify(uploadDoc),
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`
		}
	})

	return await response.text()
}
