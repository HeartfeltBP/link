import { app, firestore } from './firebase'
import { Firestore, setDoc, getDoc, doc, addDoc, collection, DocumentReference } from 'firebase/firestore'
import { DATA_DB_TEST } from '$lib/utilities/constants.js'
import type { Frame, FrameHeader } from './types'
import { getAuth } from 'firebase/auth'

   
export const uploadFrame = async (uid?: string, frame: Frame, frameHeader?: FrameHeader): Promise<string> => {
    if(!uid || typeof(uid) == 'undefined' || uid == null) {
        console.error('User not logged in. UID not available...')
        return 'FAIL'
    }

    if(getAuth(app).currentUser?.uid != uid) {
        console.error('WTF... stop...')
        return 'STOP'
    }
    

    const framePath = `${DATA_DB_TEST}/${uid}/frames/`
    const headerPath = `${DATA_DB_TEST}/${uid}/headers/`
    
    if(frame.fid && frame.fid !== 'INIT') { 
        console.log(framePath, headerPath, frame.fid)
        await setDoc(doc(firestore, framePath + `${frame.fid}`), frame)
        await setDoc(doc(firestore, headerPath + `${frame.fid}`), frameHeader)

        return 'INIT'
    } else {
        let frameRef: DocumentReference = await addDoc(collection(firestore, framePath), frame)
        console.log(framePath, headerPath, frameRef);
        const fid: string = frameRef.id
        await setDoc(doc(firestore, `${frameRef.path}`, 'fid'), { fid })
        
        const headerRef: DocumentReference = await addDoc(collection(firestore, headerPath), frameHeader)
        await setDoc(doc(firestore, `${frameRef.path}`, 'fid'), { fid })
        return frameRef.id
    }
}