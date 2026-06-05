/**
 * @file src/directives/throttle.ts
 * @description 自定义指令 v-throttle
 * 作用：对按钮点击事件进行节流，防止用户短时间内重复点击
 * 适用场景：表单提交按钮、支付按钮等防重复点击
 * 使用方式：<button v-throttle="handleClick">提交</button>
 * 默认节流时间：2000ms，可通过 v-throttle:3000 自定义
 */
import type { Directive, DirectiveBinding } from 'vue'

export const throttleDirective: Directive = {
  /**
   * mounted钩子：替换元素的click事件为节流版本
   * @param el - DOM元素
   * @param binding - binding.value为原始点击函数，binding.arg为节流时间(ms)
   */
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 获取节流间隔时间，默认2000ms
    const throttleTime: number = binding.arg ? parseInt(binding.arg) : 2000
    let lastClickTime = 0

    el.addEventListener('click', (event: Event) => {
      const now = Date.now()
      // 如果距离上次点击时间超过节流间隔，则允许执行
      if (now - lastClickTime >= throttleTime) {
        lastClickTime = now
        // 执行绑定的函数
        if (typeof binding.value === 'function') {
          binding.value(event)
        }
      }
    })
  }
}
