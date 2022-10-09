import { ref } from 'vue'

/*
 * @Author: lingdu waong2005@126.com
 * @Date: 2022-10-09 18:02:18
 * @LastEditors: lingdu waong2005@126.com
 * @LastEditTime: 2022-10-09 18:50:15
 * @FilePath: \IUI314\src\hooks\util\useTabUtil.ts
 * @Description:
 */

export const useTableUtil = () => {
  return {
    useTableSelectChange,
  }
}

const useTableSelectChange = () => {
  const ids = ref<string[]>([])
  const values = ref<any[]>([])
  const single = ref<boolean>(false)
  const slected = ref<boolean>(false)
  //   handler
  const handleSelectionChangeFn = (
    selection: { [x: string]: any }[],
    idKey: string,
    valueKey: string
  ) => {
    ids.value = selection.map((item) => item[idKey])
    values.value = selection.map((item) => item[valueKey])
    single.value = selection.length === 1
    slected.value = selection.length !== 0
  }

  return {
    handleSelectionChangeFn,
    ids,
    values,
    single,
    slected,
  }
}
