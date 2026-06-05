<!--
  @file src/pages/communication/index.vue
  @description 【知识点4】组件通信专题 - 主页面
  覆盖5种Vue3组件通信方式：
  1. defineProps + defineEmits（父子通信）
  2. defineExpose + useTemplateRef（获取子组件实例）
  3. provide / inject（跨层通信）
  4. mitt事件总线（任意组件通信）
  5. Pinia全局状态通信
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. Props + Emits ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. defineProps + defineEmits 父子通信</h3>
      <p class="demo-desc">
        Props：父→子单向数据流；Emits：子→父事件通知。Vue3中使用编译器宏，无需import
      </p>
      <div class="border p-3 rounded bg-gray-50">
        <p class="text-sm mb-2">父组件数据：{{ parentMsg }} | 计数：{{ parentCount }}</p>
        <!-- 传递props，监听emit事件 -->
        <PropsEmitsChild
          :message="parentMsg"
          :count="parentCount"
          @update-msg="handleUpdateMsg"
          @increment="parentCount++"
        />
        <input v-model="parentMsg" class="border p-1 rounded mt-2" placeholder="修改父组件消息" />
      </div>
    </section>

    <!-- ========== 2. defineExpose + useTemplateRef ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. defineExpose + useTemplateRef 获取子组件实例</h3>
      <p class="demo-desc">
        useTemplateRef(Vue3.5+)：替代旧版ref获取DOM/组件实例的方式。子组件需通过defineExpose暴露方法/属性
      </p>
      <div class="border p-3 rounded bg-gray-50">
        <!-- ref绑定子组件 -->
        <ExposeChild ref="exposeChildRef" />
        <div class="mt-2 space-x-2">
          <el-button size="small" @click="callChildMethod">调用子组件方法</el-button>
          <el-button size="small" @click="getChildData">获取子组件数据</el-button>
        </div>
        <p class="text-sm text-gray-500 mt-1">{{ exposeResult }}</p>
      </div>
    </section>

    <!-- ========== 3. provide / inject ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. provide / inject 跨层通信</h3>
      <p class="demo-desc">
        祖先组件provide提供数据，后代组件inject注入使用。支持传递响应式数据
      </p>
      <div class="border p-3 rounded bg-gray-50">
        <p class="text-sm">祖先组件提供的主题色：
          <input v-model="themeColor" type="color" class="w-8 h-8 align-middle" />
          {{ themeColor }}
        </p>
        <!-- 深层嵌套子组件可以直接inject -->
        <ProvideInjectChild />
      </div>
    </section>

    <!-- ========== 4. mitt事件总线 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. mitt 全局事件总线</h3>
      <p class="demo-desc">
        替代Vue2的$on/$emit。适合兄弟组件、无关系组件间通信。注意在onUnmounted中取消监听
      </p>
      <div class="border p-3 rounded bg-gray-50">
        <MittSender />
        <MittReceiver />
      </div>
    </section>

    <!-- ========== 5. Pinia通信 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">5. Pinia 全局状态通信</h3>
      <p class="demo-desc">多个组件共享同一个store实例，任何组件修改都会响应式同步</p>
      <div class="border p-3 rounded bg-gray-50">
        <p class="text-sm">Counter Store 当前值：{{ counterStore.count }}</p>
        <el-button size="small" @click="counterStore.increment()">组件A +1</el-button>
        <el-button size="small" @click="counterStore.decrement()">组件B -1</el-button>
        <p class="text-xs text-gray-500 mt-1">多个组件引用同一个store，数据自动同步</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import { useCounterStore } from '@/store/modules/counter'
import PropsEmitsChild from './PropsEmits.vue'
import ExposeChild from './ExposeRef.vue'
import ProvideInjectChild from './ProvideInject.vue'
import MittSender from './MittSender.vue'
import MittReceiver from './MittReceiver.vue'

// ===== 1. Props + Emits =====
const parentMsg = ref<string>('Hello from Parent')
const parentCount = ref<number>(0)

function handleUpdateMsg(newMsg: string): void {
  parentMsg.value = newMsg
}

// ===== 2. Expose + Ref =====
const exposeChildRef = ref<InstanceType<typeof ExposeChild> | null>(null)
const exposeResult = ref<string>('')

function callChildMethod(): void {
  exposeChildRef.value?.sayHello('父组件调用')
  exposeResult.value = '已调用子组件的sayHello方法，查看控制台'
}

function getChildData(): void {
  const data = exposeChildRef.value?.childCount
  exposeResult.value = `获取到子组件数据: childCount = ${data}`
}

// ===== 3. Provide / Inject =====
const themeColor = ref<string>('#42b883')
// provide提供响应式数据（修改会同步到所有inject的组件）
provide('themeColor', themeColor)
provide('appName', 'Vue3 Demo')

// ===== 5. Pinia =====
const counterStore = useCounterStore()
</script>
