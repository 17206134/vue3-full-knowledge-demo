<!--
  @file src/pages/advanced-components/TabB.vue
  @description KeepAlive演示 - Tab B组件
-->
<template>
  <div class="p-3 bg-green-50 rounded">
    <p class="font-semibold text-green-700">Tab B 组件</p>
    <p class="text-sm">输入内容：{{ text }}</p>
    <input v-model="text" class="border p-1 rounded" placeholder="输入内容会被缓存" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref<string>('')
</script>
