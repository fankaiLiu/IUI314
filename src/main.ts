/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-09-30 18:41:35
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-21 18:19:20
 * @FilePath: \IUI314\src\main.ts
 * @Description: main
 */
import './assets/css/main.scss'
import 'virtual:svg-icons-register'
import 'uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css' //element-puls dark theme

import { createApp } from 'vue'

import { useSetupI18n } from '@/i18n'
import { setupRoutes } from '@/router'
import { setupStores } from '@/stores'

import App from './App.vue'

const bootApp = async () => {
  const app = createApp(App)

  setupStores(app)
  await setupRoutes(app)
  useSetupI18n().setupI18n(app)
  app.mount('#app')
}

bootApp()
