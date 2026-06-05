/**
 * @file src/directives/focus.ts
 * @description 自定义指令 v-focus
 * 作用：元素挂载时自动获取焦点
 * 适用场景：搜索框、表单输入框自动聚焦
 * 使用方式：<input v-focus />
 */
import type { Directive } from 'vue'

/**
 * v-focus 指令定义
 * 钩子函数说明：
 * - mounted: 元素插入DOM后触发（最常用）
 * - 其他钩子：created/beforeMount/beforeUpdate/updated/beforeUnmount/unmounted
 */
export const focusDirective: Directive = {
  // mounted钩子：元素被插入到DOM后调用
  mounted(el: HTMLElement) {
    // 如果绑定元素本身是input，直接聚焦
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      el.focus()
    } else {
      // 否则查找内部的input元素聚焦（适配Element Plus等组件库）
      const input = el.querySelector('input') || el.querySelector('textarea')
      input?.focus()
    }
  }
}
