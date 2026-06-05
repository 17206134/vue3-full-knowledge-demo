<!--
  @file src/pages/builtin-use/SlotsDemo.vue
  @description useSlots演示子组件 - 判断插槽是否存在并渲染
-->
<template>
  <div class="p-3 border rounded bg-white">
    <p class="text-sm font-semibold">SlotsDemo 子组件</p>
    <!-- 判断header插槽是否被传入 -->
    <div v-if="hasHeader" class="bg-purple-50 p-2 rounded mt-2">
      <p class="text-xs text-purple-600">header插槽内容：</p>
      <slot name="header" />
    </div>
    <!-- 默认插槽 -->
    <div class="bg-blue-50 p-2 rounded mt-2">
      <p class="text-xs text-blue-600">default插槽内容：</p>
      <slot />
    </div>
    <p class="text-xs text-gray-500 mt-2">
      已使用的插槽: {{ slotNames.join(', ') }}
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * useSlots - 在script setup中获取插槽信息
 * 返回一个对象，key是插槽名，value是渲染函数
 * 常用于判断某个插槽是否被使用
 */
import { useSlots, computed } from 'vue'

const slots = useSlots()
console.log(slots,'slots是个啥')
// 判断header插槽是否存在
const hasHeader = computed<boolean>(() => !!slots.header)

// 获取所有已使用的插槽名
const slotNames = computed<string[]>(() => Object.keys(slots))
</script>
