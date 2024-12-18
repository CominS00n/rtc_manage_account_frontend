import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/home',
    components: {
      default: () => import('../components/layouts/mainLayout.vue'),
      LeftSidebar: () => import('../components/layouts/navigationBar.vue'),
    },
    children: [
      {
        path: '',
        name: 'Default',
        component: () => import('../views/HomeView.vue'),
        meta: {
          title: 'Home',
        },
      },
      {
        path: 'request-account',
        name: 'request-account',
        component: () => import('../views/RequestAccView.vue'),
        meta: {
          title: 'Request Account',
        },
      },
      {
        path: 'request-account/view-request/:id',
        name: 'ViewRequest',
        component: () => import('../views/ExportPdfView.vue'),
        meta: {
          title: 'View Request',
        },
      },
      {
        path: 'user-management',
        name: 'User Management',
        component: () => import('../views/userManageView.vue'),
        meta: {
          title: 'User Management',
        },
      },
      {
        path: 'activity-log',
        name: 'Activity Log',
        component: () => import('../views/ActivityLogView.vue'),
        meta: {
          title: 'Activity Log',
        },
      },
      {
        path: 'roles',
        name: 'Role Management',
        component: () => import('../views/RoleManageView.vue'),
        meta: {
          title: 'Role Management',
        },
      },
      {
        path: 'user-audit',
        name: 'User Audit',
        component: () => import('../views/UserAuditView.vue'),
        meta: {
          title: 'User Audit',
        },
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('../views/settingView.vue'),
        meta: {
          title: 'Settings',
        },
      },
    ],
  },
  {
    path: '/approval/:token',
    name: 'Approval',
    component: () => import('../views/ApproveView.vue'),
    meta: {
      title: 'Approve Request',
    },
  },
  {
    path: '/login',
    name: 'Login',
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
  next()
})

export default router
