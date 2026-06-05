<!--
  @file src/pages/communication/PropsEmits.vue
  @description defineProps + defineEmits 子组件示例
  演示：类型约束、默认值、emit事件
-->
<template>
  <div class="p-3 border rounded bg-white mt-2">
    <p class="text-sm font-semibold text-purple-600">子组件 (PropsEmits)</p>
    <p class="text-sm">接收的message: {{ message }}</p>
    <p class="text-sm">接收的count: {{ count }}</p>
    <div class="mt-2 space-x-2">
      <!-- 通过emit通知父组件修改消息 -->
      <el-button size="small" @click="emit('update-msg', '子组件修改了消息!')">
        emit修改消息
      </el-button>
      <!-- 通过emit通知父组件递增 -->
      <el-button size="small" @click="emit('increment')">emit递增</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * defineProps - 声明组件接收的props
 * Vue3中有3种写法：
 * 1. 运行时声明：defineProps({ message: String })
 * 2. 类型声明（推荐）：defineProps<{ message: string }>()
 * 3. 带默认值：withDefaults(defineProps<Props>(), { ... })
 */

// 方式2：纯类型声明（推荐，TS友好）
interface Props {
  /** 消息文本 - 必传 */
  message: string
  /** 计数 - 可选，默认0 */
  count?: number
  /** 标签列表 - 可选，默认空数组 */
  tags?: string[]
}

// withDefaults为类型声明的props提供默认值
const props = withDefaults(defineProps<Props>(), {
  count: 0,
  tags: () => ['默认标签']
})

/**
 * defineEmits - 声明组件可触发的事件
 * 类型声明写法：指定每个事件的参数类型
 */
const emit = defineEmits<{
  /** 更新消息事件 */
  (e: 'update-msg', msg: string): void
  /** 递增事件 */
  (e: 'increment'): void
}>()

// props是响应式只读的，不可直接修改
console.log('[PropsEmits] props.message:', props.message)
</script>
