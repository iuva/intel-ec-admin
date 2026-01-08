import axios from 'axios'
import { getToken, getRefreshToken, setToken, removeToken,setRefreshToken } from './auth'
import { refreshToken } from '@/api/index'
import { message } from 'ant-design-vue'
import router from '../router'

// Create axios instance
const service = axios.create({
	baseURL: '/api', // Use API address from environment variable
	timeout: 10000, // Request timeout
})

// Flag indicating if token is being refreshed
let isRefreshing = false
// Store request queue
let requests = []

// Request interceptor
service.interceptors.request.use(
	(config) => {
		// Get token from localStorage
		const token = getToken()
		if (token) {
			// Add bearer token to request header
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Response interceptor
service.interceptors.response.use(
	(response) => {
		// Directly return response data
		return response.data
	},
	async (error) => {
		const { config, response } = error
		console.log('Response error:', error)

		// If it's a 401 error, the token has expired
		if (response && response.status === 401) {
			// If config doesn't exist or has already been retried, directly redirect to login page
			if (
				!config ||
				config._retry ||
				response.data.error_code !== 'UNAUTHORIZED'
			) {
				message.error(response.data.message)
				removeToken()
				router.push('/login')
				return Promise.reject(error)
			}

			config._retry = true

			// If token is being refreshed, add request to queue
			if (isRefreshing) {
				return new Promise((resolve) => {
					requests.push((token) => {
						config.headers['Authorization'] = `Bearer ${token}`
						resolve(service(config))
					})
				})
			}

			isRefreshing = true

			try {
				// Call refresh token interface
				const current_refresh_token = getRefreshToken()
        const current_token = getToken()
				console.log('Refreshing token with refresh token:', current_refresh_token,current_token)
				const res = await refreshToken(current_refresh_token,current_token)

				const { token, refresh_token } = res.data
        console.log('Refreshed token:', token,refresh_token)
				// Save new token
				setToken(token)
				setRefreshToken(refresh_token)

				// Update request header
				config.headers['Authorization'] = `Bearer ${token}`

				// Process requests in queue
				requests.forEach((cb) => cb(token))
				requests = []

				return service(config)
			} catch (refreshError) {
				// Refresh failed, clear token and redirect to login page
				removeToken()
				router.push('/login')
				return Promise.reject(refreshError)
			} finally {
				isRefreshing = false
			}
		} else {
			message.error(response.data.message)
		}

		return Promise.reject(error)
	}
)

export default service
