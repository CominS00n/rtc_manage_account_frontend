import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    alias: '/',
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
      {
        path: '/user-management',
        name: 'User Management',
        component: () => import('../views/userManageView.vue'),
      },
      {
        path: '/request-account',
        name: 'Request Account',
        component: () => import('../views/RequestAccView.vue'),
      },
      {
        path: '/activity-log',
        name: 'Activity Log',
        component: () => import('../views/ActivityLogView.vue'),
      },
      {
        path: '/roles',
        name: 'Role Management',
        component: () => import('../views/RoleManageView.vue'),
      },
      {
        path: '/test-data/:id',
        name: 'Test Data',
        component: () => import('../views/DataTestView.vue'),
      }
    ],
  },
  {
    path: '/approval/:id',
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
