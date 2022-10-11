/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-05 19:54:45
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-11 19:31:01
 * @FilePath: \IUI314\src\stores\modules\tab-bar.ts
 * @Description:
 */
import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

import { isString } from '@/hooks'
import { DEFAULT_ROUTE, router } from '@/router'
import type { TabBarState, TagProps } from '@/types/base/router'

export const formatTag = (route: RouteLocationNormalized): TagProps => {
  const { name, meta, fullPath, query } = route
  return {
    title: meta.title || '',
    name: String(name),
    fullPath,
    query,
    no_cache: meta.no_cache,
  }
}

export const useTabBarStore = defineStore('tab-bar', {
  state: (): TabBarState => ({
    cacheTabList: new Set(),
    tagList: [DEFAULT_ROUTE],
  }),
  // persist: {
  // paths: ['tagList'],
  // },
  getters: {
    getTabList(): TagProps[] {
      return this.tagList
    },
    getCacheList(): string[] {
      return Array.from(this.cacheTabList)
    },
  },

  actions: {
    updateTabList(route: RouteLocationNormalized) {
      if (route.fullPath.includes('redirect')) return
      this.tagList.push(formatTag(route))
      if (route.meta.no_cache === false) {
        this.cacheTabList.add(route.name as string)
      }
    },
    deleteTag(idx: number, tag: TagProps) {
      this.tagList.splice(idx, 1)
      this.cacheTabList.delete(tag.name)
    },
    addCache(tag: TagProps) {
      const { name, no_cache } = tag
      if (!no_cache && isString(name) && name !== '') {
        this.cacheTabList.add(name)
      }
    },
    deleteCache(tag: TagProps) {
      this.cacheTabList.delete(tag.name)
    },
    freshTabList(tags: TagProps[]) {
      this.tagList = tags
      this.cacheTabList.clear()
      // 要先判断ignoreCache
      this.tagList
        .filter((el) => !el.no_cache)
        .map((el) => el.name)
        .forEach((x) => this.cacheTabList.add(x))
    },
    resetTabList() {
      this.tagList = [DEFAULT_ROUTE]
      this.cacheTabList.clear()
    },
    async reload(tag: TagProps) {
      this.deleteCache(tag)
      console.log('tag :>> ', tag)
      await router.replace({
        path: '/redirect' + tag.fullPath,
        query: tag.query,
      })
      this.addCache(tag)
    },
  },
})
