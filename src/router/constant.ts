/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-06 16:05:22
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-16 12:56:49
 * @FilePath: \IUI314\src\router\constant.ts
 * @Description:
 */

import type { AppRouteRecordRaw } from '@/types/base/router'

export const Layout = () => import('@/components/layout/Layout.vue')
export const ParentView = () => import('@/components/layout/parent-view.vue')
export const InnerLink = () => import('@/components/layout/inner-link.vue')
export const NotFound = () => import('@/components/exception/404.vue')
export const NoPermission = () => import('@/components/exception/401.vue')
export const ServerError = () => import('@/components/exception/500.vue')

export const REDIRECT_ROUTE_NAME = 'redirect' //重定向
export const DEFAULT_ROUTE_NAME = 'dashboard' //首页
export const DictDataRouteName = 'dict_data' //字典数据
export const DEFAULT_ROUTE = {
  title: '首页',
  name: DEFAULT_ROUTE_NAME,
  Path: '/index',
  fullPath: '/index',
}

// NotFound  404
export const NotFoundRoute: AppRouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: NotFound,
  hidden: true,
}

export const NoPermissionRoute: AppRouteRecordRaw = {
  path: '/401',
  component: NoPermission,
  name: '401',
  hidden: true,
}

export const ServerErrorRoute: AppRouteRecordRaw = {
  path: '/401',
  component: ServerError,
  name: '401',
  hidden: true,
}

export const DictDataRoute: AppRouteRecordRaw = {
  path: '/system/dict',
  component: Layout,
  hidden: true,
  children: [
    {
      path: 'data',
      component: () => import('@/views/system/dict/data.vue'),
      name: DictDataRouteName,
      meta: {
        title: '字典数据',
        activeMenu: '/system/basic/dict',
        no_cache: true,
        icon: 'dict',
      },
    },
  ],
}
