import { checkEmailPass }from '$lib/utilities/auth'

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData()
		const email: string | null = data.get('email')?.toString() || null
        const pass: string | null = data.get('pass')?.toString() || null

        if(email && pass) {
            console.log("we are checking...")
            await checkEmailPass(email, pass)
            
        }
	}
}
