import type { RequestHandler } from '@sveltejs/kit'
import { decodeAsync } from '@msgpack/msgpack'
import * as fs from 'fs'
import type { Frame, FrameHeader } from '$lib/utilities/types'
import { uploadFrameHttp } from '$lib/utilities/server/repository.server'
import { getUid } from '$lib/utilities/server/auth.server'
import { DATA_DB_TEST } from '$lib/utilities/constants'
import { app } from '$lib/utilities/firebase'
import { getAuth } from 'firebase/auth'

// https://www.ibm.com/docs/en/odm/8.8.0?topic=api-rest-response-codes-error-messages

const MSGPACK_TYPE = 'application/x-msgpack'
const JSON_TYPE = 'application/json'
const CSV_TYPE = 'text/csv'
const PLAIN_TYPE = 'text/plain'

type HfWindow = {
	numSamples: number
	samplingRate: number
	metricType: string
	collectionCount: number
}

export const POST: RequestHandler = async ({ request }) => {
	let response: Response
	
	const contentType = request.headers.get('Content-Type')

	if (request.body != null && contentType) {
		if (contentType.startsWith(CSV_TYPE) || contentType.startsWith(PLAIN_TYPE)) {
			const data = await request.text()

			let dataArr = data.split(',')
			console.log(dataArr[0], dataArr[1], dataArr[2], dataArr[3], dataArr.length)

			let numSamples = dataArr[0]
			let samplingRate = dataArr[1]
			let metricType = dataArr[2]
			let collectionCount = dataArr[3]
			let transmissionCount = dataArr[4]
			let postId = dataArr[5] // the fid from previous transmission if it exists
			let idToken = dataArr[6] // token

			const frameHeader: FrameHeader = {
				sr: Number(samplingRate)
			}

			const frame: Frame = {
				status: 'new',
				target: DATA_DB_TEST,
			}

			if(postId) {
				if(postId !== 'INIT') {
					frame.fid = postId;
				}
			}

			if(metricType = 'PPG0') {
				dataArr.splice(0, 3).forEach(element => frame.ir_frame?.push(Number(element)))
			}
			else if (metricType = 'PPG1') {
				dataArr.splice(0, 3).forEach(element => frame.red_frame?.push(Number(element)))
			}

			if(!idToken || idToken != '') return new Response('Cannot get authentication token', {status: 401}) 
			
			const uid = getUid(idToken)

			if(uid == '') {
				new Response('Could not retrieve uid from token', { status: 400 })
			}

			console.log(idToken, uid, "<><><><><ID::ID::ID::ID><><><><>")

			if(metricType == 'PPG0' || metricType == 'PPG1') {
				if(uid && uid != null && typeof(uid) != 'undefined') {
					const fidInQuestion = await uploadFrameHttp(uid, idToken, frame, frameHeader)
					return new Response(`${fidInQuestion}`, { status: 200 })
				}
			}

			fs.openSync(
				'./WINDOWS/' + 'N' + String(collectionCount) + 'DATA' + String(metricType) + '.txt',
				'w+'
			)

			dataArr.forEach((element) =>
				fs.appendFileSync(
					'./WINDOWS/' + 'N' + String(collectionCount) + 'DATA' + String(metricType) + '.txt',
					element + '\n'
				)
			)
			return new Response('bungus', { status: 200 })
		}
	} else {
		// errors
		console.log('content type invalid or something else went wrong...')
	}

	return new Response('balls', { status: 400 })
}
