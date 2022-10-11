/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-09 14:38:34
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-11 20:12:50
 * @FilePath: \IUI314\src\views\system\dict\useDictType.ts
 * @Description:
 */
import { type Ref, ref } from 'vue'

import { ApiSysDictData, ApiSysDictType } from '@/api/apis'
import { addTimeQueryParam, useGet } from '@/hooks'
import type {
  dictData,
  dictDataList,
  dictDataQueryParam,
  dictType,
  dictTypeList,
  dictTypeQueryParam,
} from '@/types/system/dict'

/**
 *字典类型相关数据
 * @param querParam 请求参数
 */
export const getDictTypeList = (
  querParam: Ref<dictTypeQueryParam>,
  time?: Ref<string[]>
) => {
  const list = ref<dictType[]>([])
  const total = ref(0)
  /**
   * 获取字典类型列表
   */
  const getListFn = async () => {
    if (time) {
      querParam.value = addTimeQueryParam(querParam.value, time?.value)
    }
    const { data, execute } = useGet<dictTypeList>(
      ApiSysDictType.getList,
      querParam
    )
    await execute()
    list.value = data.value?.list!
    total.value = data.value?.total!
  }
  getListFn()
  return {
    getListFn,
    list,
    total,
  }
}

/**
 *字典数据相关数据
 * @param querParam 请求参数
 */
export const getDictDataList = (
  querParam: Ref<dictDataQueryParam>,
  time?: Ref<string[]>
) => {
  const list = ref<dictData[]>([])
  const total = ref(0)
  /**
   * 获取字典类型列表
   */
  const getListFn = async () => {
    if (time) {
      querParam.value = addTimeQueryParam(querParam.value, time?.value)
    }
    const { data, execute } = useGet<dictDataList>(
      ApiSysDictData.getList,
      querParam
    )
    await execute()
    list.value = data.value?.list!
    total.value = data.value?.total!
  }
  getListFn()
  return {
    getListFn,
    list,
    total,
  }
}
