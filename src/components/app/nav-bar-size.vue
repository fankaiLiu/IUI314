<!--
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-02 07:44:59
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-22 18:36:56
 * @FilePath: \IUI314\src\components\app\nav-bar-size.vue
 * @Description: 设置app element 部分组件大小
-->
<template>
  <div>
    <el-dropdown trigger="click">
      <el-icon
        size="large"
        color="var(--drop-down-icon-color)"
        class="cursor-pointer"
      >
        <SvgIcon name="size-change" />
      </el-icon>
      <template #dropdown>
        <el-dropdown-item
          v-for="size in sizeList"
          :key="size.key"
          @click="appStore.setAppSize(size.key)"
        >
          {{ size.value }}
        </el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts" name="nav-bar-size">
import { ref } from 'vue'

import { useAppStore } from '@/stores'

const appStore = useAppStore()

const sizeList = ref([
  { key: 'small', value: '较小' },
  { key: 'default', value: '默认' },
  { key: 'large', value: '较大' },
])
</script>
