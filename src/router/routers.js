export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {requiresAuth: false},
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../layout/index.vue'),
    meta: {requiresAuth: true},
    children: [
      {
        path: '',
        redirect: '/enabled',
      },
      {
        path: 'enabled',
        children: [
          {
            path: '',
            name: 'EnabledList',
            meta: {keepAlive: true},
            component: () => import('../views/enabled/Enabled.vue'),
          },
          {
            path: 'detail/:id?',
            name: 'EnabledDetail',
            meta: {keepAlive: false},
            component: () => import('../views/enabled/Detail.vue'),
          }
        ]
      },
      {
        path: 'pending',
        children: [
          {
            path: '',
            name: 'PendingList',
            meta: {keepAlive: true},
            component: () => import('../views/pending/Pending.vue'),
          },
          {
            path: 'detail/:id?',
            name: 'PendingDetail',
            meta: {keepAlive: false},
            component: () => import('../views/pending/Detail.vue'),
          }
        ]
      },
      {
        path: 'ota',
        name: 'ota',
        meta: {keepAlive: true},
        component: () => import('../views/ota/Ota.vue'),
      },
      {
        path: '/404',
        name: 'NotFount',
        component: () => import('../views/404.vue'),
        meta: {requiresAuth: false},
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  }
]
