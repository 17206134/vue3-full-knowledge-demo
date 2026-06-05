<!--
  @file src/pages/communication/MittSender.vue
  @description mitt事件总线 - 发送方组件
-->
<template>
  <div class="p-2 bg-yellow-50 rounded mb-2">
    <p class="text-sm font-semibold text-yellow-700">发送方组件</p>
    <input v-model="msg" class="border p-1 rounded text-sm" placeholder="输入消息" />
    <el-button size="small" class="ml-2" @click="sendMessage">发送mitt事件</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import emitter from '@/utils/mitt'

const msg = ref<string>('Hello Mitt!')

function sendMessage(): void {
  // 通过mitt发送事件，任何监听此事件的组件都会收到
  emitter.emit('send-message', msg.value)
}
</script>
