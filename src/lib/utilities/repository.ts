import { firestore } from './firebase'
import { getUid } from './auth'
import { Firestore, setDoc, getDoc, doc, addDoc, collection, DocumentReference } from 'firebase/firestore'
import { DATA_DB_TEST } from '$lib/utilities/constants.js'
import type { Frame, FrameHeader } from './types'

export class FrameHandler {
    private _ir: number[] = []
    private _red: number[] = []

    constructor(ir?:number[], red?:number[]) {
        if(typeof(ir) != 'undefined') {
            this._ir = ir
        }
        if(typeof(red) != 'undefined') {
            this._red = red
        }
    }

    set ir(ir: number[]) {
        this._ir = ir
    }

    set red(red: number[]) {
        this._red = red
    }

    get ready(): boolean {
        return this._ir?.length > 0 && this._red?.length > 0
    }
}

export const frameHandler = new FrameHandler()

export const attemptUpload = async (fH: FrameHandler) {
    if(fH.ready) {
        uploadFrame()
    }
}
   
export const uploadFrame = async (frameRed: frame[], frameIr: Frame[], frameHeader?: FrameHeader) => {
    let frameRef: DocumentReference = await addDoc(collection(firestore, `${DATA_DB_TEST}/{uid}/frames`), frame)
    const fid: string = frameRef.id
    await setDoc(doc(firestore, `${frameRef.path}`, 'fid'), { fid })

    const headerRef = await addDoc(collection(firestore, `${DATA_DB_TEST}/{uid}/headers`), frameHeader)
    await setDoc(doc(firestore, `${frameRef.path}`, 'fid'), { fid })
}