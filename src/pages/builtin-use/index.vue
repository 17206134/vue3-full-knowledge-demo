<!--
  @file src/pages/builtin-use/index.vue
  @description 【知识点5】Vue3内置use系列API演示
  覆盖：useTemplateRef、useAttrs、useSlots、useCssModule
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. useTemplateRef ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. useTemplateRef (Vue 3.5+)</h3>
      <p class="demo-desc">
        替代以前的ref("xxx")获取模板引用的方式。更明确的API，支持类型推断
      </p>
      <div ref="myDiv" class="p-3 bg-blue-50 rounded">
        这是一个div元素，使用useTemplateRef获取
      </div>
      <input ref="myInput" class="border p-1 rounded mt-2" placeholder="useTemplateRef获取input" />
      <div class="mt-2">
        <el-button size="small" @click="focusInput">聚焦input</el-button>
        <el-button size="small" @click="getDiv">获取div内容</el-button>
        <p class="text-sm text-gray-500 mt-1">{{ refResult }}</p>
      </div>
    </section>

    <!-- ========== 2. useAttrs ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. useAttrs</h3>
      <p class="demo-desc">
        获取传递给组件但未被props声明的属性（透传属性）。常用于组件二次封装
      </p>
      <AttrsDemo class="custom-class" data-id="123" title="透传标题" />
    </section>

    <!-- ========== 3. useSlots ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. useSlots</h3>
      <p class="demo-desc">
        在script setup中获取插槽内容，判断插槽是否被使用
      </p>
      <SlotsDemo>
        <template #header>自定义头部内容</template>
        <template #default>默认插槽内容</template>
      </SlotsDemo>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Vue3 内置use系列 API 演示
 */
import { ref, useTemplateRef, onMounted } from 'vue'
import AttrsDemo from './AttrsDemo.vue'
import SlotsDemo from './SlotsDemo.vue'

// ===== 1. useTemplateRef (Vue 3.5+) =====
// 新写法：通过useTemplateRef('模板中ref的值')获取引用，变量名可以自由命名
const divRef = useTemplateRef<HTMLDivElement>('myDiv')
const inputRef = useTemplateRef<HTMLInputElement>('myInput')
const refResult = ref<string>('')

function focusInput(): void {
  inputRef.value?.focus()
  refResult.value = '已聚焦input元素'
}

function getDiv(): void {
  refResult.value = `div内容: ${divRef.value?.textContent?.trim()}`
}

onMounted(() => {
  console.log('[useTemplateRef] div元素:', divRef.value)
  console.log('[useTemplateRef] input元素:', inputRef.value)
})
</script>
