<!--
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-15 09:32:17
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-27 16:02:14
 * @FilePath: \IUI314\src\views\system\menu\auth.vue
 * @Description: 
-->
<template>
  <div>
    <el-form
      v-show="showSearch"
      ref="queryRef"
      :inline="true"
      :model="queryParams"
      label-width="68px"
      class="base-form"
    >
      <el-form-item :label="t('menu.name')" prop="menu_name">
        <el-input
          v-model="queryParams.menu_name"
          clearable
          :placeholder="t('menu.nameTip')"
          @keyup.enter="getList"
        />
      </el-form-item>
      <el-form-item :label="t('menu.status')" prop="status">
        <el-select
          v-model="queryParams.status"
          :clearable="true"
          :placeholder="t('menu.status')"
        >
          <el-option
            v-for="dict in dicts[dictKey.sysNormalDisable]"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="t('menu.method')" prop="method">
        <el-select
          v-model="queryParams.method"
          :placeholder="t('menu.method')"
          clearable
        >
          <el-option
            v-for="dict in dicts[dictKey.sysApiMethod]"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" type="primary" @click="getList">
          {{ t('common.search') }}
        </el-button>
        <el-button :icon="Refresh" @click="resetQuery()">
          {{ t('common.reset') }}
        </el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="menu_list" tooltip-effect="light">
      <el-table-column
        :label="t('menu.id')"
        align="center"
        width="100"
        show-overflow-tooltip
        prop="order_sort"
      />
      <el-table-column
        :label="t('menu.name')"
        align="center"
        prop="menu_name"
        show-overflow-tooltip
      />
      <el-table-column
        label="api"
        align="center"
        width="150px"
        show-overflow-tooltip
      >
        <template #default="scope">
          <el-popover placement="top-start" title="API" trigger="hover">
            <template #reference>
              <span>{{ scope.row.api }}</span>
            </template>
            {{ scope.row.api }}
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column :label="t('menu.method')" align="center" prop="method">
        <template #default="scope">
          <dict-tag
            :options="dicts[dictKey.sysApiMethod]"
            :value="scope.row.method"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="data_scope"
        :label="t('menu.dataScope')"
        width="100"
        align="center"
      >
        <template #default="scope">
          <dict-tag
            v-if="scope.row.method == 'GET'"
            :options="dicts[dictKey.sysNormalDisable]"
            :value="scope.row.data_scope"
          />
          <el-tag v-else>not support</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="t('menu.database')" width="160px">
        <template #default="scope">
          <el-popover
            placement="top-start"
            :title="t('menu.database')"
            trigger="hover"
            :width="get_max_length(scope.row.dbs) * 9 + 5"
          >
            <template #reference>
              <span>
                {{
                  scope.row.dbs.length > 1
                    ? scope.row.dbs[0] + ' ↑ '
                    : scope.row.dbs.length == 0
                    ? ''
                    : scope.row.dbs[0]
                }}</span
              >
            </template>
            <li v-for="(it, index) in scope.row.dbs" :key="it + index">
              {{ it }}
            </li>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="APIs" width="200">
        <template #default="scope">
          <el-popover
            placement="top-start"
            title="APIs"
            trigger="hover"
            :width="get_max_length(scope.row.apis) * 9 + 5"
          >
            <template #reference>
              <span>
                {{
                  scope.row.apis.length > 1
                    ? scope.row.apis[0] + ' ↑ '
                    : scope.row.apis.length == 0
                    ? ''
                    : scope.row.apis[0]
                }}</span
              >
            </template>
            <li v-for="(it, index) in scope.row.apis" :key="it + index">
              {{ it }}
            </li>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        :label="t('common.log')"
        align="center"
        prop="log_method"
      >
        <template #default="scope">
          <dict-tag
            :options="dicts[dictKey.apiLogMethod]"
            :value="scope.row.log_method"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="t('common.cache')"
        align="center"
        prop="data_cache_method"
      >
        <template #default="scope">
          <div v-if="scope.row.method !== 'GET'" />
          <dict-tag
            v-else
            :options="dicts[dictKey.apiCacheMethod]"
            :value="scope.row.data_cache_method"
          />
        </template>
      </el-table-column>
      <el-table-column :label="t('common.status')" align="center" prop="status">
        <template #default="scope">
          <dict-tag
            :options="dicts[dictKey.sysNormalDisable]"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="t('common.createTime')"
        align="center"
        prop="created_at"
        width="180"
      >
        <template #default="scope">
          <span>{{ parseTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="hasPermission(ApiSysMenu.updateLogCache, ApiSysDbApi.edit)"
        :label="t('common.operation')"
        align="center"
        width="200"
        class-name="small-padding fixed-width"
      >
        <template #default="scope">
          <el-tooltip
            v-if="scope.row.menu_type == 'F'"
            :content="t('menu.dbRelation')"
            placement="top"
            effect="light"
          >
            <el-button
              style="color: green"
              link
              :icon="DataBoard"
              @click="handleDbRelation(scope.row)"
            >
              {{ t('menu.dbRelation') }}
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total > 0"
      v-model:page="queryParams.page_num"
      v-model:limit="queryParams.page_size"
      :total="total"
      @pagination="getList"
    />
    <!-- 数据库关联组件 -->
    <AuthDialog
      v-if="open"
      :form-data="formData"
      :title="title"
      :open="open"
      @close-dialog="closeDialog"
    />
  </div>
</template>
<script lang="ts" setup>
import { DataBoard, Refresh, Search } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { ApiSysDbApi, ApiSysMenu } from '@/api/apis'
import {
  hasPermission,
  parseTime,
  useDicts,
  useFormUtil,
  useListData,
} from '@/hooks'
import type { MessageSchema } from '@/i18n'
import { systemMenus } from '@/router'
import { MenuType } from '@/types/base/router'
import { dictKey } from '@/types/system/dict'
import type { authMenu, menuQueryParam } from '@/types/system/menu'

import AuthDialog from './pages/auth-dialog.vue'

const { t } = useI18n<{ message: MessageSchema }>({ useScope: 'global' })
const queryRef = ref<FormInstance>()
const { formReset } = useFormUtil()
// 字典数据
const dicts = useDicts(
  dictKey.sysNormalDisable,
  dictKey.sysApiMethod,
  dictKey.apiCacheMethod,
  dictKey.apiLogMethod
)
const showSearch = ref(true)
const open = ref(false)
const title = ref('')
const formData = ref<authMenu>({})
const queryParams = ref<menuQueryParam>({
  page_num: 1,
  page_size: 10,
  menu_type: MenuType.F,
})

const {
  list: menu_list,
  getListFn: getList,
  total,
} = useListData<menuQueryParam, authMenu>(ApiSysMenu.getAuthList, queryParams)

const get_max_length = (v: string[]) => {
  let l = 0
  v.forEach((element) => {
    l = Math.max(l, element.length)
  })
  return l
}

const resetQuery = () => {
  formReset(queryRef.value)
  getList()
}

const handleDbRelation = (row: authMenu) => {
  formData.value = row
  title.value = row.menu_name + '  数据库关联+日志+缓存'
  open.value = true
}
const closeDialog = () => {
  open.value = false
  getList()
}

// 导出名称
defineOptions({
  name: systemMenus.menu_auth.path,
})
</script>
