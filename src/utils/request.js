import axios from 'axios'
import { getToken, getRefreshToken, setToken, removeToken,setRefreshToken } from './auth'
import { refreshToken } from '@/api/index'
import { message } from 'ant-design-vue'
import router from '../router'

// 创建axios实例
const service = axios.create({
	baseURL: '/api', // 使用环境变量中的API地址
	timeout: 10000, // 请求超时时间
})

// 是否正在刷新token的标志
let isRefreshing = false
// 存储请求队列
let requests = []

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		// 从localStorage中获取token
		const token = getToken()
		if (token) {
			// 在请求头中添加bearer token
			config.headers['Authorization'] = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		// 直接返回响应数据
		return response.data
	},
	async (error) => {
		const { config, response } = error
		console.log('响应错误:', error)

		// 如果是401错误，说明token过期
		if (response && response.status === 401) {
			// 如果配置不存在或已经重试过，直接跳转到登录页
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

			// 如果正在刷新token，则将请求加入队列
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
				// 调用刷新token的接口
				const current_refresh_token = getRefreshToken()
        const current_token = getToken()
				console.log('Refreshing token with refresh token:', current_refresh_token,current_token)
				const res = await refreshToken(current_refresh_token,current_token)

				const { token, refresh_token } = res.data
        console.log('Refreshed token:', token,refresh_token)
				// 保存新的token
				setToken(token)
				setRefreshToken(refresh_token)

				// 更新请求头
				config.headers['Authorization'] = `Bearer ${token}`

				// 处理队列中的请求
				requests.forEach((cb) => cb(token))
				requests = []

				return service(config)
			} catch (refreshError) {
				// 刷新失败，清除token并跳转到登录页
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
