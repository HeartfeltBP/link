export const ssr = false

import { goto } from '$app/navigation'
import { uStore } from '$lib/utilities/auth'
import { firestore } from '$lib/utilities/firebase'
import { getDocs, collection} from 'firebase/firestore'
import type { PageLoad } from './$types'
import { DATA_DB } from '$lib/utilities/constants'
import { userStore } from 'sveltefire'

const getSelectedFrames = (async () => {
	if (!uStore)

}) satisfies PageLoad

export const load = (async () => {
	if (!uStore) {
		goto('/')
		return
	}
	
	const userDbRef = doc(firestore, DATA_DB + `${uStore}`)
	const devStatsSelection = localStorage.getItem('devStats') == 'DEV_STAT' ? true : false
	const userWindows = devStatsStatus ? document

}) satisfies PageLoad
