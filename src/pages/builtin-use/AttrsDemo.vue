<!--
  @file src/pages/builtin-use/AttrsDemo.vue
  @description useAttrs演示子组件 - 显示所有透传属性
-->
<template>
  <div class="p-3 border rounded bg-white">
    <p class="text-sm font-semibold">AttrsDemo 子组件</p>
    <p class="text-sm">透传属性（useAttrs获取）：</p>
    <pre class="text-xs bg-gray-100 p-2 rounded mt-1">{{ attrs }}</pre>
  </div>
</template>

<script setup lang="ts">
/**
 * useAttrs - 获取组件的透传属性
 * 透传属性 = 父组件传递的属性 - props声明的属性 - emits声明的事件
 */
import { useAttrs } from 'vue'
// title被props声明了，所以不会被当作透传属性
const props = defineProps<{
  title?: string
}>()
// 获取所有透传属性（响应式）
const attrs = useAttrs()
console.log('[useAttrs] 透传属性:', attrs)
</script>
