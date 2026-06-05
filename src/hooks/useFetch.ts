/**
 * @file src/hooks/useFetch.ts
 * @description 自定义Hook - 通用异步请求封装
 * 使用场景：任何需要loading/error/data状态管理的异步请求
 * 思路：封装请求三状态(loading/error/data) + 自动/手动执行
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

/** useFetch返回值类型 */
interface UseFetchReturn<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string>
  execute: () => Promise<void>
}

/**
 * useFetch - 通用异步请求Hook
 * @param fetchFn - 异步请求函数
 * @param immediate - 是否立即执行（默认true）
 * @returns { data, loading, error, execute }
 * @example
 * const { data, loading, error } = useFetch(() => getUserList())
 * // data.value 请求成功的数据
 * // loading.value 是否加载中
 * // error.value 错误信息
 */
export function useFetch<T>(
  fetchFn: () => Promise<{ data: T }>,
  immediate: boolean = true
): UseFetchReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  /** 执行请求 */
  async function execute(): Promise<void> {
    loading.value = true
    error.value = ''
    try {
      const res = await fetchFn()
      data.value = res.data
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : '请求失败'
    } finally {
      loading.value = false
    }
  }

  // 是否立即执行
  if (immediate) {
    execute()
  }

  return { data, loading, error, execute }
}
