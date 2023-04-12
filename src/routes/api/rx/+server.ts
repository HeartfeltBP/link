/*eslint prefer-const: 0*/
import type { RequestHandler } from '@sveltejs/kit'
import * as fs from 'fs'
import type { HfFrame, HfFrameHeader } from '$lib/utilities/types'
import { uploadFrame } from '$lib/utilities/server/repository.server'
import { getUid } from '$lib/utilities/server/auth.server'
import { DATA_DB } from '$lib/utilities/constants'

// https://www.ibm.com/docs/en/odm/8.8.0?topic=api-rest-response-codes-error-messages

// const MSGPACK_TYPE = 'application/x-msgpack'
// const JSON_TYPE = 'application/json'
const CSV_TYPE = 'text/csv'
const PLAIN_TYPE = 'text/plain'

// type HfWindow = {
// 	numSamples: number
// 	samplingRate: number
// 	metricType: string
// 	collectionCount: number
// }

export const POST: RequestHandler = async ({ request }) => {
	const contentType = request.headers.get('Content-Type')

	if (request.body != null && contentType) {
		if (contentType.startsWith(CSV_TYPE) || contentType.startsWith(PLAIN_TYPE)) {
			const data = await request.text()

			const dataArr = data.split(',')
			console.log(
				dataArr[0],
				dataArr[1],
				dataArr[2],
				dataArr[3],
				dataArr[4],
				dataArr[5],
				dataArr[6],
				dataArr.length
			)

			// const numSamples = dataArr[0]
			const samplingRate = dataArr[1]
			const metricType = dataArr[2]
			const collectionCount = dataArr[3]
			// const transmissionCount = dataArr[4]
			const postId = dataArr[5] // the fid from previous transmission if it exists
			const tokenAuth = dataArr[6] // token

			// const sampleData = dataArr.slice(6, -1) use this instead of of the foreach?

			const tokenTemp = tokenAuth.split(' ')
			tokenTemp[1] = tokenTemp[1].replace(/[\r\n]+/gm, '')
			const idToken = tokenTemp[1]
			console.log(tokenTemp, idToken)
			if (!idToken || idToken == '')
				return new Response('Cannot get authentication token', { status: 401 })

			console.log('<><><><><ID::ID:' + `${getUid(idToken)}` + ':ID::ID><><><><>')

			const frameHeader: HfFrameHeader = {
				sr: Number(samplingRate)
			}

			const frame: HfFrame = {
				status: 'new',
				target: DATA_DB
			}

			if (postId) {
				frame.fid = postId
			} else {
				console.error('Cannot get postId')
			}

			let tempArr: number[] = []
			if (metricType == 'PPG0') {
				console.info('Processing IR Frame')
				dataArr.splice(7).forEach((element) => tempArr.push(Number(element)))
				frame.ir_frame = tempArr
			} else if (metricType == 'PPG1') {
				console.info('Processing Red Frame')
				dataArr.splice(7).forEach((element) => tempArr.push(Number(element)))
				frame.red_frame = tempArr
			} else {
				return new Response('INIT', { status: 200 })
			}

			console.log(tempArr)
			const fidInQuestion: string | null = await uploadFrame(idToken, frame, frameHeader)

			// currently only support PPG, ECG can still be sent, however it will be rejected
			if (fidInQuestion) {
				frame.status = 'new'
				return new Response(`${fidInQuestion}`, { status: 201 })
			} else {
				return new Response('INIT', { status: 200 })
			}
			
			// code to create sample log file
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
