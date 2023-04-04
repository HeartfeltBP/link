import { app_admin, firestore_admin } from './firebase.server'
import { DATA_DB_TEST } from '$lib/utilities/constants.js'
import type { Frame, FrameHeader } from '../types'
import { getAuth } from 'firebase-admin/auth'
import { DocumentReference, WriteResult } from 'firebase-admin/firestore'

export const fetchData = async () => {

}
   
export const uploadFrame = async (uid: string, frame: Frame, frameHeader?: FrameHeader): Promise<string> => {
    if(!uid || typeof(uid) == 'undefined' || uid == null) {
        console.error('User not logged in. UID not available...')
        return 'FAIL'
    }

    // if(getAuth(app_admin). != uid) {
    //     console.error('WTF... stop...')
    //     return 'STOP'
    // }
    
    const framePath = `${DATA_DB_TEST}/${uid}/frames/`
    const headerPath = `${DATA_DB_TEST}/${uid}/headers/`
    
    if(frame.fid && frame.fid !== 'INIT') { 
        console.log(framePath, headerPath, frame.fid)
        await firestore_admin.doc(framePath + `${frame.fid}`).set(frame)

        if(typeof(frameHeader) != 'undefined') {
            await firestore_admin.doc(headerPath + `${frame.fid}`).set(frameHeader)
        }

        return 'INIT'
    } else {
        let frameRef: DocumentReference = firestore_admin.doc(framePath)
        console.log(framePath, headerPath, frameRef.id);
        frame.fid = frameRef.id
        await firestore_admin.doc(frameRef.path).set({fid: frame.fid})

         
        if(typeof(frameHeader) != 'undefined' && typeof(frame.fid) != 'undefined') {
            firestore_admin.doc(headerPath + `${frame.fid}`).set({fid: frame.fid})
        }
        
        return frameRef.id
    }
}