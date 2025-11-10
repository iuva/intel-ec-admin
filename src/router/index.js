import { createRouter, createWebHistory } from 'vue-router'
import { getToken } from '../utils/auth'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/index.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('../views/List.vue')
      },
      {
        path: 'detail/:id',
        name: 'Detail',
        component: () => import('../views/Detail.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
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