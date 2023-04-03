import type { RequestHandler } from '@sveltejs/kit'
import { decodeAsync } from '@msgpack/msgpack'

// https://www.ibm.com/docs/en/odm/8.8.0?topic=api-rest-response-codes-error-messages

const MSGPACK_TYPE = 'application/x-msgpack'
const JSON_TYPE = 'application/json'
const CSV_TYPE = 'text/csv'

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
			console.log(dataArr[0], dataArr[1], dataArr[2], dataArr.length)
			// console.log(data)
		}
	} else {
		// errors
		console.log('something went wrong API/SERVER')
	}
	// console.log(request.headers)
	// console.log(request.body)
	return new Response('balls')
}
