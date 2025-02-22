/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-23 10:49:40
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-29 09:20:16
 * @FilePath: \IUI314\src\hooks\app\useAppUtil.ts
 * @Description:
 */
import { onMounted } from 'vue'

import { useAppStore } from '@/stores'

export const useAnimation = () => {
  const animationList = [
    'fade',
    'fade-transform',
    'slide-fade',
    'el-zoom-in-center',
  ]
  const appStore = useAppStore()
  const setAnimation = (v: string) => {
    appStore.setAnimation(v)
  }
  return {
    animationList,
    setAnimation,
  }
}

export const useSetVh = () => {
  const setVh = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  // 监控屏幕高度 设置 --vh
  window.addEventListener('resize', () => setVh())
  onMounted(() => setVh())
  return { setVh }
}
