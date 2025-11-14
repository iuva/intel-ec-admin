import { createRouter, createWebHashHistory } from 'vue-router'
import { getToken } from '../utils/auth'
import { routes } from './routers'

const router = createRouter({
	history: createWebHashHistory(),
	routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
	const requiresAuth = to.meta.requiresAuth
	const hasToken = getToken()

	if (requiresAuth && !hasToken) {
		next('/login')
	} else if (!requiresAuth && hasToken && to.path === '/login') {
		next('/')
	} else {
		next()
	}
})

export default router
