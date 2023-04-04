import type { RequestHandler } from '../../../../../../../../../Documents/GW/CAPSTONE/link/.svelte-kit/types/src/routes/api/test/$types'
import { getAuth } from 'firebase-admin/auth'

/**
 * POST token information to server and upload
 * TODO: move into sls
 */

// export const POST = ({ request, cookies }) => {
//     const idToken = request.text()
//     const csrfToken = cookies.get('csrfToken')

//     return null
// }