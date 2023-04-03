import type { RequestHandler } from '@sveltejs/kit'
import { decodeAsync } from '@msgpack/msgpack'
import * as fs from 'fs'

// https://www.ibm.com/docs/en/odm/8.8.0?topic=api-rest-response-codes-error-messages

const MSGPACK_TYPE = 'application/x-msgpack'
const JSON_TYPE = 'application/json'
const CSV_TYPE = 'text/csv'

type HfWindow = {
	numSamples: number
	samplingRate: number
	metricType: string
	collectionCount: number
}

export const POST: RequestHandler = async ({ request }) => {
	const contentType = request.headers.get('Content-Type')
	if (request.body != null && contentType) {
		if (contentType.startsWith(MSGPACK_TYPE)) {
			const data = await decodeAsync(request.body)
			console.log('NOT IMPLEMENTED')
		} else if (contentType.startsWith(JSON_TYPE)) {
			const data = await request.json()
			console.log('NOT IMPLEMENTED')
		} else if (contentType.startsWith(CSV_TYPE)) {
			const data = await request.text()

			let dataArr = data.split(',')
			console.log(dataArr[0], dataArr[1], dataArr[2], dataArr[3], dataArr.length)

			let numSamples = dataArr[0]
			let samplingRate = dataArr[1]
			let metricType = dataArr[2]
			let collectionCount = dataArr[3]

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
		}
	} else {
		// errors
		console.log('something went wrong API/SERVER')
	}

	return new Response('balls')
}
