<!--
  @file src/pages/communication/ExposeRef.vue
  @description defineExpose + ref获取子组件实例 示例
  重点演示：子组件通过defineExpose选择性暴露属性/方法
-->
<template>
  <div class="p-3 border rounded bg-white">
    <p class="text-sm font-semibold text-teal-600">子组件 (ExposeRef)</p>
    <p class="text-sm">内部计数: {{ childCount }}</p>
    <el-button size="small" @click="childCount++">内部+1</el-button>
  </div>
</template>

<script setup lang="ts">
/**
 * defineExpose - 暴露组件内部属性/方法给父组件
 * 注意：script setup中组件默认是封闭的，外部无法访问内部数据
 * 必须通过defineExpose主动暴露才能被父组件ref访问
 */
import { ref } from 'vue'

const childCount = ref<number>(0)
const privateData = ref<string>('这是私有数据，外部无法访问')

/** 暴露给父组件调用的方法 */
function sayHello(from: string): void {
  console.log(`[ExposeRef子组件] sayHello被${from}调用了！当前count=${childCount.value}`)
}

/** 暴露给父组件的重置方法 */
function reset(): void {
  childCount.value = 0
}

// 只暴露指定的属性和方法（privateData不暴露）
defineExpose({
  childCount,
  sayHello,
  reset
})
</script>
