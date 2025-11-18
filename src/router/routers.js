export const pageRouters = [
  {
    path: '',
    redirect: '/enabled',
  },
  {
    path: 'enabled',
    title: '可用HOST管理',
    icon: 'container-outlined',
    children: [
      {
        path: '',
        title: '可用HOST列表',
        name: 'EnabledList',
        meta: {keepAlive: true},
        component: () => import('../views/enabled/Enabled.vue'),
      },
      {
        path: 'detail/:id?',
        title: '可用HOST详情',
        name: 'EnabledDetail',
        meta: {keepAlive: false},
        component: () => import('../views/enabled/Detail.vue'),
      }
    ]
  },
  {
    path: 'pending',
    title: '待审批HOST管理',
    icon: 'audit-outlined',
    children: [
      {
        path: '',
        title: '待审批HOST列表',
        name: 'PendingList',
        meta: {keepAlive: true},
        component: () => import('../views/pending/Pending.vue'),
      },
      {
        path: 'detail/:id?',
        title: '待审批HOST详情',
        name: 'PendingDetail',
        meta: {keepAlive: false},
        component: () => import('../views/pending/Detail.vue'),
      }
    ]
  },
  {
    path: 'ota',
    name: 'ota',
    title: 'OTA管理',
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