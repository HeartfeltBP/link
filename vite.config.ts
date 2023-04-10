import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['@abandonware/bluetooth-hci-socket']
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
})
