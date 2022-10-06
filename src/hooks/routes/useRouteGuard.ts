/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-03 21:54:48
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-05 21:10:18
 * @FilePath: \IUI314\src\hooks\routes\useRouteGuard.ts
 * @Description: 路由守卫，刷新路由丢失，搞了一天也不知道到底是怎么好的
 */
import 'nprogress/nprogress.css'

import NProgress from 'nprogress'
import type { Router, RouteRecordRaw } from 'vue-router'

import { NotFoundRoutes } from '@/router'
import { usePermissionStore, useUserStore } from '@/stores'

import { useToken } from '../app/useDevice'
import { setRouteEmitter } from './useRouterListener'
import { isHttp } from './useRouteUtl'

const whiteList = ['/login']

NProgress.configure({ showSpinner: false })
// routerGuard
export const useRouterGuard = async (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    NProgress.start()
    setRouteEmitter(to) //监听路由变化
    const { valid } = useToken()
    //  token 有效
    if (valid) {
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        const userStore = useUserStore()
        const permissionStore = usePermissionStore()
        if (permissionStore.isReloading) {
          await userStore.getUserInfo()
          const aRoutes = await permissionStore.generateRoutes()
          aRoutes.forEach((aRoute) => {
            if (!isHttp(aRoute.path)) {
              router.addRoute(aRoute as RouteRecordRaw)
            }
          })
          router.addRoute(NotFoundRoutes as RouteRecordRaw)
          permissionStore.setIsReloading(false)
          next({ ...to, replace: true })
        } else {
          next()
        }
        NProgress.done()
      }
    } else {
      // 没有token
      if (whiteList.includes(to.path)) {
        // 在免登录白名单，直接进入
        next()
        NProgress.done()
      } else {
        next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
        NProgress.done()
      }
      next()
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
