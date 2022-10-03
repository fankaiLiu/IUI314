import type { App } from 'vue'
import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
} from 'vue-router'

import { useRouterGuard } from '@/hooks/routes/useRouteGuard'
import type { AppRouteRecordRaw } from '@/types/base/router'

export const Layout = () => import('@/components/layout/index.vue')
export const ParentView = () => import('@/components/layout/parent-view.vue')
export const InnerLink = () => import('@/components/layout/inner-link.vue')

export const constantRoutes: AppRouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/components/layout/redirect/index.vue'),
      },
    ],
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/components/error/404.vue'),
    hidden: true,
  },
  // 401
  {
    path: '/401',
    component: () => import('@/components/error/401.vue'),
    hidden: true,
  },
  // login
  {
    path: '/login',
    component: () => import('@/components/login/index.vue'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    name: 'index',
    meta: { title: '首页', icon: 'dashboard' },
    children: [
      {
        path: '/index',
        component: () => import('@/views/AboutView.vue'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard' },
      },
    ],
  },
]

export const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes] as Readonly<RouteRecordRaw[]>,
  scrollBehavior() {
    return { top: 0 }
  },
})

export const setupRoutes = async (app: App) => {
  app.use(router)
  useRouterGuard(router)
  await router.isReady()
}
