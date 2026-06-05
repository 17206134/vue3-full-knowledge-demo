<!--
  @file src/pages/advanced-components/TabA.vue
  @description KeepAlive演示 - Tab A组件
-->
<template>
  <div class="p-3 bg-blue-50 rounded">
    <p class="font-semibold text-blue-700">Tab A 组件</p>
    <p class="text-sm">内部计数：{{ count }}</p>
    <el-button size="small" @click="count++">+1</el-button>
    <p class="text-xs text-gray-500 mt-1">（KeepAlive缓存后，切走再切回，count不会归零）</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onActivated, onDeactivated } from 'vue'

const count = ref<number>(0)

// KeepAlive专属钩子
onActivated(() => {
  console.log('[TabA] onActivated - 组件被激活')
})

onDeactivated(() => {
  console.log('[TabA] onDeactivated - 组件被停用（缓存中）')
})
</script>
