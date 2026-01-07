export const pageRouters = [
  {
    path: '',
    redirect: '/enabled',
  },
  {
    path: 'enabled',
    title: 'Available HOST Management',
    icon: 'container-outlined',
    children: [
      {
        path: '',
        title: 'Available HOST List',
        name: 'EnabledList',
        meta: {keepAlive: true},
        component: () => import('../views/enabled/Enabled.vue'),
      },
      {
        path: 'detail/:id?',
        title: 'Available HOST Details',
        name: 'EnabledDetail',
        meta: {keepAlive: false},
        component: () => import('../views/enabled/Detail.vue'),
      }
    ]
  },
  {
    path: 'pending',
    title: 'Pending HOST Management',
    icon: 'audit-outlined',
    children: [
      {
        path: '',
        title: 'Pending HOST List',
        name: 'PendingList',
        meta: {keepAlive: true},
        component: () => import('../views/pending/Pending.vue'),
      },
      {
        path: 'detail/:id?',
        title: 'Pending HOST Details',
        name: 'PendingDetail',
        meta: {keepAlive: false},
        component: () => import('../views/pending/Detail.vue'),
      }
    ]
  },
  {
    path: 'ota',
    name: 'ota',
    title: 'OTA Management',
    icon: 'cloud-upload-outlined',
    meta: {keepAlive: true},
    component: () => import('../views/ota/Ota.vue'),
  },]
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
      ...pageRouters,
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