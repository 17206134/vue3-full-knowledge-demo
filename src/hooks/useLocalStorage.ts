/**
 * @file src/hooks/useLocalStorage.ts
 * @description 自定义Hook - localStorage响应式封装
 * 使用场景：持久化用户偏好设置（主题、语言、表单草稿等）
 * 思路：ref + watch监听变化自动同步到localStorage
 * 注意：需要处理JSON序列化/反序列化，以及读取失败的情况
 */
import { ref, watch } from 'vue'
import type { Ref } from 'vue'

/**
 * useLocalStorage - 响应式localStorage
 * @param key - localStorage存储的key
 * @param defaultValue - 默认值（localStorage无值时使用）
 * @returns 响应式ref，修改会自动同步到localStorage
 * @example
 * const theme = useLocalStorage('theme', 'light')
 * theme.value = 'dark' // 自动存储到localStorage
 */
export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  // 尝试从localStorage读取已存储的值
  let storedValue: T = defaultValue
  try {
    const raw = localStorage.getItem(key)
    if (raw !== null) {
      storedValue = JSON.parse(raw) as T
    }
  } catch (e) {
    console.warn(`[useLocalStorage] 读取key="${key}"失败，使用默认值`, e)
  }

  // 创建响应式ref
  const data = ref<T>(storedValue) as Ref<T>

  // 监听ref变化，自动同步到localStorage
  watch(
    data,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch (e) {
        console.warn(`[useLocalStorage] 写入key="${key}"失败`, e)
      }
    },
    { deep: true } // 深度监听，对象内部属性变化也会触发
  )

  return data
}
