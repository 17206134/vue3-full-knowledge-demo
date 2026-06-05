/**
 * @file src/hooks/useToggle.ts
 * @description 自定义Hook - 布尔值切换
 * 使用场景：开关状态、显示/隐藏、展开/收起
 * 思路：封装ref + toggle/set方法
 */
import { ref } from 'vue'
import type { Ref } from 'vue'

/** 返回值类型 */
interface UseToggleReturn {
  state: Ref<boolean>
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

/**
 * useToggle - 布尔状态切换Hook
 * @param initialValue - 初始值，默认false
 * @returns { state, toggle, setTrue, setFalse }
 * @example
 * const { state, toggle } = useToggle(false)
 * toggle() // state.value = true
 */
export function useToggle(initialValue: boolean = false): UseToggleReturn {
  const state = ref<boolean>(initialValue)

  function toggle(): void {
    state.value = !state.value
  }

  function setTrue(): void {
    state.value = true
  }

  function setFalse(): void {
    state.value = false
  }

  return { state, toggle, setTrue, setFalse }
}
