import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    alias: '/request-account',
    components: {
      default: () => import('../components/layouts/mainLayout.vue'),
      LeftSidebar: () => import('../components/layouts/navigationBar.vue'),
    },
    children: [
      {
        path: '',
        name: 'request-account',
        component: () => import('../views/RequestAccView.vue'),
      },
      {
        path: 'user-management',
        name: 'User Management',
        component: () => import('../views/userManageView.vue'),
      },
      {
        path: 'activity-log',
        name: 'Activity Log',
        component: () => import('../views/ActivityLogView.vue'),
      },
      {
        path: 'roles',
        name: 'Role Management',
        component: () => import('../views/RoleManageView.vue'),
      },
      {
        path: 'user-audit',
        name: 'User Audit',
        component: () => import('../views/UserAuditView.vue'),
      }
    ],
  },
  {
    path: '/approval/:token',
    name: 'Approval',
    component: () => import('../views/ApproveView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },

  {
    path: '/:catchAll(.*)',
    name: '404 Not Found',
    component: () => import('@/views/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router
