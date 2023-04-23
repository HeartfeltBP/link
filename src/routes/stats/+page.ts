export const ssr = false

import { goto } from '$app/navigation'
import { auth, firestore } from '$lib/utilities/firebase'
import { getDocs, collection, doc, where, query, getDoc, orderBy, limit } from 'firebase/firestore'
import type { PageLoad } from './$types'
import { DATA_DB } from '$lib/utilities/constants'
import type { FrameBioData, HfFrame, HfReading, HfWindow } from '$lib/utilities/types'
import { converter } from '$lib/utilities/repository'
import { readable, type Readable } from 'svelte/store'
import { userStore } from 'sveltefire'
import type { User } from 'firebase/auth'

const abort = (async () => {
	goto('/')
	return
}) satisfies PageLoad

export const load = (async () => {
	const usStore = userStore(auth)
	let currentUser: User | null = null

	let userWindows: HfWindow[] = []
	let predictedFids: string[] = []
	let predictedFidsSorted: string[] = []
	let userFrames: HfFrame[] = []

	usStore.subscribe(async (curUser) => {
		currentUser = curUser
	})

	if (!currentUser || !currentUser.uid) {
		abort()
		return
	} // return for intellisense

	console.log('Getting things from database...')
	const userDbRef = doc(firestore, DATA_DB + `${currentUser.uid}`)
	const windowsRef = collection(userDbRef, 'windows')
	const frameRef = collection(userDbRef, 'frames')

	// add dev mode that returns all valid and invalid windows/frames
	// const devStatsSelection = localStorage.getItem('devStats') == 'DEV_STAT' ? true : false
	// const userWindows = devStatsStatus ? document

	// TODO: put into repo
	// also window limit dictates frame limit
	const windowQ = query(windowsRef, where('status', '==', 'predicted'), limit(300))
	windowQ.withConverter(converter<HfWindow[]>())
	const userWindowDocs = await getDocs(windowQ)

	userWindowDocs.forEach(async (doc) => {
		try {
			const curWindow: HfWindow = <HfWindow>doc.data() // will never be undefined
			const predFid: string = doc.get('fid')
			// console.log(curWindow)
			predictedFids.push(predFid)
			userWindows.push(curWindow)
		} catch (e) {
			console.error(e)
			console.error('Error populating user windows')
		}
	})

	if (userWindows.length <= 0 || predictedFids.length <= 0) {
		console.info('could not retrive any windows')
		return
	}

	const iterCount =
		predictedFids.length > 10 ? Math.ceil(predictedFids.length / 10) : predictedFids.length
	// console.log("Bunga", iterCount)
	// eww. Have to do 10 at a time because firestore?
	for (let i = 0; i < iterCount - 1; i += 10) {
		// console.log(predictedFids.slice(i, i+9))
		// const frameQ = query(frameRef, where('fid', 'in', predictedFids.slice(i, i+9)), orderBy('time'))
		const frameQ = query(frameRef, where('fid', 'in', predictedFids.slice(i, i + 9)))
		frameQ.withConverter(converter<HfFrame[]>())
		const userFrameDocs = await getDocs(frameQ)
		// console.log(userFrameDocs.docs)

		userFrameDocs.forEach((doc) => {
			try {
				const curFrame: HfFrame = <HfFrame>doc.data() // will never be undefined
				console.log(curFrame.time)
				if (curFrame.fid) {
					userFrames.push(curFrame)
					console.log(userFrames.length)
					console.log(curFrame.time, curFrame.fid)
					predictedFidsSorted.push(curFrame.fid)
				}
				console.info('no fid')
			} catch (e) {
				console.error(e)
				console.error('Error populating user frames')
			}
		})
	}
	console.log('returning values')

	if (userFrames.length <= 0 && userWindows.length <= 0) {
		return null
	}

	let userReadings: HfReading[] = []
	

	userFrames.forEach(uFrame => {
		let sysVals: number[] = []
		let diaVals: number[] = []

		userWindows.forEach(uWindow => {
			if(uWindow.status == 'predicted') {
				sysVals.push(uWindow.sbp)
				diaVals.push(uWindow.dbp)
			}
		})

		// does rounding up misrepresent the data?
		const sysAvg: number = Math.ceil(sysVals.reduce((a, b) => a + b) / sysVals.length)
		const diaAvg: number = Math.ceil(diaVals.reduce((a, b) => a + b) / sysVals.length)
		const bioDat: FrameBioData = {
			pulse_rate:	uFrame.pulse_rate,
			spo2: uFrame.spo2,
			r: uFrame.r
		}
		const curReading: HfReading = {
			fid: uFrame.fid ?? 'err',
			time: uFrame.time ?? 'err',
			bioData: bioDat,
			sys: sysAvg,
			dia: diaAvg
		}
		userReadings.push(curReading)
	});

	let framesStore: Readable<HfFrame[]> = readable<HfFrame[]>(userFrames)
	let windowsStore: Readable<HfWindow[]> = readable<HfWindow[]>(userWindows)
	let readingsStore: Readable<HfReading[]> = readable<HfReading[]>(userReadings)
	// let fidSortStore: Readable<string[]> = readable<string[]>(predictedFidsSorted)
	let fidStore: Readable<string[]> = readable<string[]>(predictedFids)
	console.log('RETURN LENGTH WINDOWS', userWindows.length)
	console.log('RETURN LENGTH FRAMES', userFrames.length)

	return {
		fStore: framesStore,
		wStore: windowsStore,
		rStore: readingsStore,
		fidSort: fidStore
	}
}) satisfies PageLoad
