/**
 * @file src/directives/copy.ts
 * @description 自定义指令 v-copy
 * 作用：点击元素时将指定文本复制到剪贴板
 * 适用场景：一键复制链接、复制邀请码等
 * 使用方式：<button v-copy="'要复制的文本'">复制</button>
 */
import type { Directive, DirectiveBinding } from 'vue'
import { ElMessage } from 'element-plus'

export const copyDirective: Directive = {
  /**
   * mounted钩子：绑定点击事件
   * @param el - 绑定指令的DOM元素
   * @param binding - 指令绑定对象，binding.value 为要复制的文本
   */
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    // 将要复制的值存储在元素的自定义属性上
    ;(el as HTMLElement & { __copyValue: string }).__copyValue = binding.value

    el.addEventListener('click', async () => {
      const text = (el as HTMLElement & { __copyValue: string }).__copyValue
      if (!text) {
        ElMessage.warning('没有可复制的内容')
        return
      }
      try {
        // 使用现代Clipboard API复制文本
        await navigator.clipboard.writeText(text)
        ElMessage.success('复制成功!')
      } catch {
        // 降级方案：使用execCommand（旧浏览器兼容）
        const textarea = document.createElement('textarea')
        textarea.value = text
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        ElMessage.success('复制成功!')
      }
    })
  },
  /**
   * updated钩子：当绑定值更新时同步更新存储的值
   */
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    ;(el as HTMLElement & { __copyValue: string }).__copyValue = binding.value
  }
}
