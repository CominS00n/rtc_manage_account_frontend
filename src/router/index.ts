import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'request',
    component: () => import('../views/RequestAccView.vue'),
    meta: {
      title: 'Request Account',
    },
  },
  {
    path: '/admin',
    name: 'admin',
    redirect: '/admin/request-account',
    components: {
      default: () => import('../components/layouts/mainLayout.vue'),
      LeftSidebar: () => import('../components/layouts/navigationBar.vue'),
    },
    children: [
      {
        path: 'request-account',
        name: 'request account',
        component: () => import('../views/RequestAccView.vue'),
        meta: {
          title: 'request account',
          requiresAuth: true,
        },
      },
      {
        path: 'account-request',
        name: 'account request',
        component: () => import('../views/AccountView.vue'),
        meta: {
          title: 'Request Account',
          requiresAuth: true,
        },
      },
      {
        path: 'request-account/view-request/:id',
        name: 'ViewRequest',
        component: () => import('../views/ExportPdfView.vue'),
        meta: {
          title: 'View Request',
          requiresAuth: true,
        },
      },
      {
        path: 'user-management',
        name: 'user management',
        component: () => import('../views/userManageView.vue'),
        meta: {
          title: 'User Management',
          requiresAuth: true,
        },
      },
      {
        path: 'activity-log',
        name: 'activity logs',
        component: () => import('../views/ActivityLogView.vue'),
        meta: {
          title: 'Activity Log',
          requiresAuth: true,
        },
      },
      // {
      //   path: 'user-audit',
      //   name: 'user audit',
      //   component: () => import('../views/UserAuditView.vue'),
      //   meta: {
      //     title: 'User Audit',
      //     requiresAuth: true,
      //   },
      // },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/settingView.vue'),
        meta: {
          title: 'Settings',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/approval/:token',
    name: 'approval',
    component: () => import('../views/ApproveView.vue'),
    meta: {
      title: 'Approve Request',
    },
  },
  {
    path: '/tracking-status/id/:id',
    name: 'tracking status',
    component: () => import('../views/trackStatusView.vue'),
  },
  {
    path: '/notfound-item',
    name: 'notfound item',
    component: () => import('../views/NotFoundItem.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      title: 'Login',
    },
  },

  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: {
      title: '404 Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'My App'
  document.title =
    typeof to.meta.title === 'function'
      ? to.meta.title(to)
      : to.meta.title || defaultTitle

  const user = localStorage.getItem('user')

  if (to.path === '/' && user) {
    next({ name: 'admin' })
  } else if (to.meta.requiresAuth && !user) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
