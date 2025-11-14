import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	console.log('环境变量', import.meta)
	console.log('环境变量', process.env.VITE_API_BASE_URL)
	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		server: {
			port: 3000,
			proxy: {
				'/api': {
					target: env.VITE_API_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(new RegExp(`^/api`), ''),
				},
			},
		},
	}
})
