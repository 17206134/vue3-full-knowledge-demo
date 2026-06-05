<!--
  @file src/pages/lifecycle/ChildComponent.vue
  @description 生命周期演示 - 子组件
  用于演示子组件的创建和销毁时机
-->
<template>
  <div class="mt-3 p-3 bg-blue-50 rounded border border-blue-200">
    <p class="text-sm font-semibold text-blue-700">子组件（LifecycleChild）</p>
    <p class="text-sm">接收到的msg: {{ msg }}</p>
    <p class="text-xs text-gray-500">内部计数: {{ innerCount }}</p>
    <el-button size="small" @click="innerCount++">子组件内部+1</el-button>
  </div>
</template>

<script setup lang="ts">
/**
 * 子组件 - 演示生命周期
 * 当父组件通过v-if销毁此组件时，会触发onBeforeUnmount和onUnmounted
 */
import { ref, inject, onBeforeMount, onMounted, onBeforeUnmount, onUnmounted } from 'vue'

// 接收父组件传递的props
defineProps<{
  msg: string
}>()

const innerCount = ref<number>(0)

// 注入父组件提供的日志函数
const addLog = inject<(msg: string) => void>('addLog', () => {})

// 子组件生命周期
onBeforeMount(() => {
  addLog('[子组件] onBeforeMount')
})

onMounted(() => {
  addLog('[子组件] onMounted - 子组件DOM已挂载')
})

onBeforeUnmount(() => {
  addLog('[子组件] onBeforeUnmount - 子组件即将销毁（可在此清理定时器等）')
})

onUnmounted(() => {
  addLog('[子组件] onUnmounted - 子组件已销毁')
})
</script>
