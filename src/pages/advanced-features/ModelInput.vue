<!--
  @file src/pages/advanced-features/ModelInput.vue
  @description defineModel语法糖示例（Vue 3.4+）
  一行代码实现v-model双向绑定，无需手动声明props和emit
-->
<template>
  <div class="border p-2 rounded bg-white">
    <label class="text-xs text-gray-500">ModelInput组件 (defineModel):</label>
    <!-- 直接使用model ref，修改会自动同步到父组件 -->
    <input v-model="model" class="border p-1 rounded w-full mt-1" />
  </div>
</template>

<script setup lang="ts">
/**
 * defineModel (Vue 3.4+)
 * 返回一个ref，自动关联组件的v-model
 * 等价于：
 *   const props = defineProps<{ modelValue: string }>()
 *   const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>()
 *   const model = computed({
 *     get: () => props.modelValue,
 *     set: (val) => emit('update:modelValue', val)
 *   })
 *
 * 一行代替了上面所有代码！
 */
const model = defineModel<string>({ default: '' })
</script>
