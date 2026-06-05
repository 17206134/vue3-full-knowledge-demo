<!--
  @file src/pages/communication/MittReceiver.vue
  @description mitt事件总线 - 接收方组件
  重点：组件销毁时必须取消监听，防止内存泄漏
-->
<template>
  <div class="p-2 bg-green-50 rounded">
    <p class="text-sm font-semibold text-green-700">接收方组件</p>
    <p class="text-sm">收到的消息：{{ receivedMsg || '（等待消息...）' }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import emitter from '@/utils/mitt'

const receivedMsg = ref<string>('')

/** mitt事件处理函数 */
function handleMessage(msg: string): void {
  receivedMsg.value = msg
}

// 组件挂载时监听事件
onMounted(() => {
  emitter.on('send-message', handleMessage as (msg: unknown) => void)
})

// 组件销毁时取消监听（防止内存泄漏！）
onUnmounted(() => {
  emitter.off('send-message', handleMessage as (msg: unknown) => void)
})
</script>
