<!--
  @file src/pages/communication/ProvideInject.vue
  @description provide/inject 跨层通信子组件
  演示：inject注入祖先组件提供的数据（响应式）
-->
<template>
  <div class="p-3 border rounded bg-white mt-2">
    <p class="text-sm font-semibold text-orange-600">后代组件 (ProvideInject)</p>
    <p class="text-sm">inject获取的appName: {{ appName }}</p>
    <p class="text-sm">
      inject获取的themeColor:
      <span :style="{ color: themeColor }">■ {{ themeColor }}</span>
      （祖先修改颜色，这里实时同步）
    </p>
  </div>
</template>

<script setup lang="ts">
/**
 * inject - 注入祖先组件provide的数据
 * 参数1: provide的key
 * 参数2: 默认值（可选，当没有祖先provide该key时使用）
 * 注意：inject得到的响应式数据保持响应式
 */
import { inject } from 'vue'
import type { Ref } from 'vue'

// inject响应式数据（Ref类型）
const themeColor = inject<Ref<string>>('themeColor')
// inject普通值（非响应式）
const appName = inject<string>('appName', '默认AppName')
</script>
