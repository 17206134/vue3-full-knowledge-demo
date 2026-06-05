<!--
  @file src/pages/advanced-components/AsyncChild.vue
  @description Suspense异步组件演示
  使用顶层await模拟异步数据加载
-->
<template>
  <div class="p-3 bg-purple-50 rounded">
    <p class="font-semibold text-purple-700">异步组件（已加载完成）</p>
    <p class="text-sm">异步数据: {{ asyncData }}</p>
  </div>
</template>

<script setup lang="ts">
/**
 * 顶层await：script setup中可以直接使用await
 * 搭配Suspense使用，加载完成前显示fallback
 */

// 模拟异步请求（2秒延迟）
const asyncData = await new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('异步加载的数据内容 - ' + new Date().toLocaleTimeString())
  }, 2000)
})
</script>
