<!--
  @file src/pages/lifecycle/index.vue
  @description 【知识点3】Vue3生命周期钩子 - 演示页面
  覆盖知识点：
  - onBeforeMount / onMounted: 挂载阶段
  - onBeforeUpdate / onUpdated: 更新阶段
  - onBeforeUnmount / onUnmounted: 卸载阶段
  - 对比选项式API生命周期写法
  - 子组件销毁时机演示
-->
<template>
  <div class="space-y-6">
    <section class="demo-section">
      <h3 class="demo-title">Vue3 生命周期钩子</h3>
      <p class="demo-desc">
        组合式API生命周期对应关系：beforeCreate/created → setup()本身；
        beforeMount → onBeforeMount；mounted → onMounted；以此类推
      </p>

      <!-- 生命周期对照表 -->
      <div class="overflow-x-auto">
        <table class="text-sm border-collapse w-full">
          <thead>
            <tr class="bg-gray-100">
              <th class="border p-2">选项式API</th>
              <th class="border p-2">组合式API</th>
              <th class="border p-2">说明</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="border p-2">beforeCreate</td><td class="border p-2">setup()开始</td><td class="border p-2">实例初始化</td></tr>
            <tr><td class="border p-2">created</td><td class="border p-2">setup()结束</td><td class="border p-2">数据已创建</td></tr>
            <tr><td class="border p-2">beforeMount</td><td class="border p-2">onBeforeMount</td><td class="border p-2">DOM挂载前</td></tr>
            <tr><td class="border p-2">mounted</td><td class="border p-2">onMounted</td><td class="border p-2">DOM挂载完成</td></tr>
            <tr><td class="border p-2">beforeUpdate</td><td class="border p-2">onBeforeUpdate</td><td class="border p-2">数据变化,DOM更新前</td></tr>
            <tr><td class="border p-2">updated</td><td class="border p-2">onUpdated</td><td class="border p-2">DOM更新完成</td></tr>
            <tr><td class="border p-2">beforeUnmount</td><td class="border p-2">onBeforeUnmount</td><td class="border p-2">组件卸载前</td></tr>
            <tr><td class="border p-2">unmounted</td><td class="border p-2">onUnmounted</td><td class="border p-2">组件卸载完成</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- 演示更新阶段 -->
    <section class="demo-section">
      <h3 class="demo-title">更新阶段演示</h3>
      <p>计数器：{{ count }}</p>
      <el-button size="small" @click="count++">+1 触发更新</el-button>
      <p class="text-sm text-gray-500 mt-2">每次点击会触发 onBeforeUpdate → onUpdated，查看控制台</p>
    </section>

    <!-- 子组件销毁演示 -->
    <section class="demo-section">
      <h3 class="demo-title">组件销毁时机演示</h3>
      <p class="demo-desc">通过v-if切换子组件的显示/隐藏来触发卸载生命周期</p>
      <el-button size="small" @click="showChild = !showChild">
        {{ showChild ? '销毁子组件' : '创建子组件' }}
      </el-button>
      <LifecycleChild v-if="showChild" :msg="childMsg" />
      <input v-model="childMsg" class="border p-1 rounded mt-2" placeholder="修改传给子组件的props" />
    </section>

    <!-- 生命周期日志 -->
    <section class="demo-section">
      <h3 class="demo-title">生命周期执行日志</h3>
      <div class="bg-gray-900 text-green-400 p-3 rounded text-xs max-h-60 overflow-y-auto font-mono">
        <p v-for="(log, i) in logs" :key="i">{{ log }}</p>
      </div>
      <el-button size="small" class="mt-2" @click="logs = []">清空日志</el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 生命周期演示 - 父组件
 * 在setup()中注册各生命周期钩子，通过控制台和页面日志展示执行时机
 */
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, provide } from 'vue'
import LifecycleChild from './ChildComponent.vue'

const count = ref<number>(0)
const showChild = ref<boolean>(true)
const childMsg = ref<string>('来自父组件的消息')
const logs = ref<string[]>([])

/** 添加日志工具函数 */
function addLog(msg: string): void {
  const time = new Date().toLocaleTimeString()
  logs.value.push(`[${time}] ${msg}`)
}

// 提供日志函数给子组件使用
provide('addLog', addLog)

// ========== 生命周期钩子注册 ==========

// setup阶段 = beforeCreate + created
addLog('[父组件] setup() 执行 (等价于 beforeCreate + created)')

/**
 * onBeforeMount: DOM挂载前
 * 此时模板已编译，但还未插入到页面DOM中
 * 适用场景：极少使用
 */
onBeforeMount(() => {
  addLog('[父组件] onBeforeMount - DOM即将挂载')
})

/**
 * onMounted: DOM挂载完成
 * 此时可以访问DOM元素、初始化第三方库、发起网络请求
 * 适用场景：获取DOM引用、初始化echarts/swiper等
 */
onMounted(() => {
  addLog('[父组件] onMounted - DOM挂载完成，可操作DOM了')
})

/**
 * onBeforeUpdate: 数据变化后，DOM更新前
 * 可以在这里访问更新前的DOM状态
 */
onBeforeUpdate(() => {
  addLog('[父组件] onBeforeUpdate - 数据变了，DOM即将更新')
})

/**
 * onUpdated: DOM更新完成
 * 注意：不要在这里修改状态，否则会无限循环
 */
onUpdated(() => {
  addLog('[父组件] onUpdated - DOM更新完成')
})

/**
 * onBeforeUnmount: 组件卸载前
 * 此时组件实例仍完全可用
 * 适用场景：清除定时器、取消事件监听
 */
onBeforeUnmount(() => {
  addLog('[父组件] onBeforeUnmount - 即将销毁')
})

/**
 * onUnmounted: 组件卸载完成
 * 所有子组件已卸载，所有响应式效果已停止
 */
onUnmounted(() => {
  addLog('[父组件] onUnmounted - 已销毁')
})
</script>
