<!--
  @file src/pages/advanced-features/CustomInput.vue
  @description 自定义v-model组件（传统写法）
  原理：接收modelValue prop + 触发update:modelValue事件
  支持多个v-model（v-model:content）
-->
<template>
  <div class="border p-2 rounded bg-white">
    <label class="text-xs text-gray-500">CustomInput组件:</label>
    <!-- 单个v-model对应 modelValue -->
    <input
      :value="modelValue"
      class="border p-1 rounded w-full mt-1"
      @input="handleModelInput"
    />
    <!-- 多v-model: content对应 v-model:content -->
    <input
      v-if="content !== undefined"
      :value="content"
      class="border p-1 rounded w-full mt-1"
      placeholder="content绑定"
      @input="handleContentInput"
    />
  </div>
</template>

<script setup lang="ts">
/**
 * 自定义v-model组件
 * 组件上 v-model="xxx" 等价于:
 *   :modelValue="xxx" @update:modelValue="xxx = $event"
 *
 * 多个v-model: v-model:content="yyy" 等价于:
 *   :content="yyy" @update:content="yyy = $event"
 */

// 声明props（接收v-model绑定的值）
defineProps<{
  modelValue: string
  content?: string
}>()

// 声明emits（通知父组件更新值）
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'update:content', value: string): void
}>()

function handleModelInput(e: Event): void {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function handleContentInput(e: Event): void {
  emit('update:content', (e.target as HTMLInputElement).value)
}
</script>
