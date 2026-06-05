<!--
  @file src/pages/advanced-features/SlotDemo.vue
  @description 插槽演示子组件
  演示：默认插槽、具名插槽、作用域插槽
-->
<template>
  <div class="border rounded p-3 bg-white mt-2">
    <!-- 具名插槽: header -->
    <div class="border-b pb-2 mb-2">
      <slot name="header">
        <p class="text-gray-400">header默认内容（未传入时显示）</p>
      </slot>
    </div>

    <!-- 默认插槽 -->
    <div class="mb-2">
      <slot>
        <p class="text-gray-400">default默认内容</p>
      </slot>
    </div>

    <!-- 作用域插槽: item -->
    <div class="mb-2">
      <p class="text-xs text-gray-500">作用域插槽列表：</p>
      <!--
        作用域插槽原理：
        子组件通过slot标签的属性向父组件传递数据
        父组件通过 #slotName="slotProps" 接收数据
      -->
      <div v-for="(item, index) in items" :key="item.name">
        <slot name="item" :item="item" :index="index">
          <!-- 默认渲染（父组件不自定义时使用） -->
          <p class="text-sm">{{ index }}. {{ item.name }}: {{ item.value }}</p>
        </slot>
      </div>
    </div>

    <!-- 具名插槽: footer -->
    <div class="border-t pt-2">
      <slot name="footer">
        <p class="text-gray-400 text-sm">footer默认内容</p>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

/** 作用域插槽传递的数据 */
interface ListItem {
  name: string
  value: number
}

const items = reactive<ListItem[]>([
  { name: 'Vue3', value: 95 },
  { name: 'React', value: 88 },
  { name: 'Angular', value: 72 }
])
</script>
