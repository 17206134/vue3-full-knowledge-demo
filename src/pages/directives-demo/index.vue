<!--
  @file src/pages/directives-demo/index.vue
  @description 【知识点7】自定义指令演示页面
  覆盖：全局指令(v-focus/v-copy/v-throttle)使用 + 局部指令定义
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. v-focus 自动聚焦 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. v-focus - 自动聚焦指令（全局注册）</h3>
      <p class="demo-desc">元素挂载时自动获取焦点，适用于搜索框、登录表单等</p>
      <input v-focus class="border p-2 rounded w-64" placeholder="页面加载后我会自动聚焦" />
    </section>

    <!-- ========== 2. v-copy 复制指令 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. v-copy - 点击复制指令（全局注册）</h3>
      <p class="demo-desc">点击元素将指定文本复制到剪贴板</p>
      <div class="space-y-2">
        <p class="text-sm">要复制的内容：{{ copyText }}</p>
        <input v-model="copyText" class="border p-1 rounded" />
        <el-button v-copy="copyText" type="primary" size="small">点我复制</el-button>
      </div>
    </section>

    <!-- ========== 3. v-throttle 节流指令 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. v-throttle - 节流点击指令（全局注册）</h3>
      <p class="demo-desc">防止按钮被快速重复点击，默认2秒内只允许触发一次</p>
      <div class="space-y-2">
        <el-button v-throttle="handleThrottle" type="danger" size="small">
          节流按钮（快速点击试试，2秒内只生效一次）
        </el-button>
        <p class="text-sm text-gray-500">点击次数：{{ throttleCount }}</p>
      </div>
    </section>

    <!-- ========== 4. 局部自定义指令 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. 局部自定义指令（组件内定义）</h3>
      <p class="demo-desc">
        在script setup中以vXxx命名的变量会自动注册为局部指令（v-xxx使用）
      </p>
      <!-- v-highlight: 局部指令，高亮文本背景色 -->
      <p v-highlight="'yellow'">这段文字使用了v-highlight指令（黄色背景）</p>
      <p v-highlight="'lightblue'">这段使用v-highlight指令（蓝色背景）</p>
      <!-- v-tooltip: 局部指令，悬浮提示 -->
      <p v-longpress="handleLongPress" class="cursor-pointer inline-block bg-gray-100 p-2 rounded">
        长按我触发事件（长按500ms）
      </p>
      <p class="text-sm text-gray-500 mt-1">{{ longPressMsg }}</p>
    </section>

    <!-- 指令钩子生命周期说明 -->
    <section class="demo-section">
      <h3 class="demo-title">指令钩子函数说明</h3>
      <div class="text-sm space-y-1">
        <p><code class="bg-gray-100 px-1">created</code> - 元素属性/事件绑定前</p>
        <p><code class="bg-gray-100 px-1">beforeMount</code> - 元素插入DOM前</p>
        <p><code class="bg-gray-100 px-1">mounted</code> - 元素插入DOM后（最常用）</p>
        <p><code class="bg-gray-100 px-1">beforeUpdate</code> - 组件更新前</p>
        <p><code class="bg-gray-100 px-1">updated</code> - 组件更新后</p>
        <p><code class="bg-gray-100 px-1">beforeUnmount</code> - 元素卸载前</p>
        <p><code class="bg-gray-100 px-1">unmounted</code> - 元素卸载后</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 自定义指令演示
 * 全局指令在main.ts中注册，这里直接使用
 * 局部指令在script setup中以 vXxx 命名即可自动注册
 */
import { ref } from 'vue'
import type { Directive, DirectiveBinding } from 'vue'

const copyText = ref<string>('这是要复制的文本内容')
const throttleCount = ref<number>(0)
const longPressMsg = ref<string>('')

function handleThrottle(): void {
  throttleCount.value++
}

function handleLongPress(): void {
  longPressMsg.value = `长按触发! 时间: ${new Date().toLocaleTimeString()}`
}

/**
 * 局部指令 v-highlight
 * 命名规则：vXxx 变量会自动被Vue识别为 v-xxx 指令
 * 作用：为元素添加背景高亮色
 */
const vHighlight: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.style.backgroundColor = binding.value || 'yellow'
    el.style.padding = '2px 4px'
  },
  updated(el: HTMLElement, binding: DirectiveBinding<string>) {
    el.style.backgroundColor = binding.value || 'yellow'
  }
}

/**
 * 局部指令 v-longpress
 * 作用：长按元素触发回调（默认500ms）
 */
const vLongpress: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    let timer: ReturnType<typeof setTimeout> | null = null
    const duration = 500

    el.addEventListener('mousedown', () => {
      timer = setTimeout(() => {
        if (typeof binding.value === 'function') {
          binding.value()
        }
      }, duration)
    })

    el.addEventListener('mouseup', () => {
      if (timer) clearTimeout(timer)
    })

    el.addEventListener('mouseleave', () => {
      if (timer) clearTimeout(timer)
    })
  }
}
</script>
