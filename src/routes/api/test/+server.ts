import { json, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
	console.log('✅ BUNGA')
	return json({
		status: 200,
		body: 'test call successful'
	})
}
