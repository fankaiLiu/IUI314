/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-01 14:50:08
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-06 13:24:30
 * @FilePath: \IUI314\src\stores\modules\app.ts
 * @Description: appStore
 */
import { defineStore } from 'pinia'

import { useDynamicTitle } from '@/hooks/util'

interface AppStore {
  siderBar: {
    isCollapse: boolean
  }
  device: {
    isMobile: boolean
  }
  app: {
    name: string
    title: string
    dynamicTitle: boolean
    isDark: boolean | undefined
    theme: string
    lang: string
    navBar: boolean
    tabBar: boolean
  }
}

export const useAppStore = defineStore('app', {
  state: (): AppStore => ({
    siderBar: {
      isCollapse: false,
    },
    device: {
      isMobile: false,
    },
    app: {
      name: import.meta.env.VITE_APP_TITLE,
      title: '',
      dynamicTitle: true,
      isDark: undefined,
      theme: '',
      lang: 'zh-CN',
      navBar: true,
      tabBar: true,
    },
  }),
  persist: {
    paths: ['siderBar', 'device', 'app'],
  },
  actions: {
    toggleSiderBar(isMobile?: boolean) {
      this.siderBar.isCollapse = isMobile ? isMobile : !this.siderBar.isCollapse
    },
    setIsMobile(isMobile: boolean) {
      this.device.isMobile = isMobile
    },
    setThemeColor(color: string) {
      this.app.isDark = color === 'dark' ? true : false
      this.app.theme = color
    },
    setNavBar(navBarStatus: boolean) {
      this.app.navBar = navBarStatus
    },
    setTabBar(tabBarStatus: boolean) {
      this.app.tabBar = tabBarStatus
    },
    setAppName(name: string) {
      this.app.name = name
    },
    setAppTitle(title: string) {
      this.app.title = title
      useDynamicTitle()
    },
    setDynamicTitle(isynamicTitle: boolean) {
      this.app.dynamicTitle = isynamicTitle
    },
  },
})
