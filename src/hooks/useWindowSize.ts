/**
 * @file src/hooks/useWindowSize.ts
 * @description 自定义Hook - 响应式获取窗口尺寸
 * 使用场景：响应式布局、Canvas适配、图表resize
 * 思路：监听window resize事件，实时更新宽高ref
 * 注意：组件卸载时自动移除事件监听（防止内存泄漏）
 */
import { ref, onMounted, onUnmounted } from 'vue'

/** 返回值类型 */
interface WindowSize {
  width: Ref<number>
  height: Ref<number>
}

import type { Ref } from 'vue'

/**
 * useWindowSize - 获取响应式窗口尺寸
 * @returns { width, height } 响应式的窗口宽高
 * @example
 * const { width, height } = useWindowSize()
 * // width.value 和 height.value 会随窗口resize自动更新
 */
export function useWindowSize(): WindowSize {
  const width = ref<number>(window.innerWidth)
  const height = ref<number>(window.innerHeight)

  /** resize事件处理函数 */
  function handleResize(): void {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  // 挂载时添加监听
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  // 卸载时移除监听（重要！防止内存泄漏）
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return { width, height }
}
