<!--
  @file src/pages/advanced-components/index.vue
  @description 【知识点6】Vue3高级内置组件
  覆盖：Teleport、Suspense、KeepAlive、动态组件component:is
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. Teleport ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. Teleport - 传送门</h3>
      <p class="demo-desc">
        将组件的DOM渲染到指定位置（如body），常用于弹窗/Toast/全屏遮罩。
        优点：逻辑在组件内，DOM在外部，不受父组件CSS影响
      </p>
      <el-button size="small" @click="showModal = true">打开Teleport弹窗</el-button>
      <!-- Teleport: to属性指定目标DOM选择器 -->
      <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-6 w-80">
            <h3 class="text-lg font-bold mb-2">Teleport弹窗</h3>
            <p class="text-sm text-gray-600 mb-4">
              我被渲染到body上了！检查DOM结构可以看到我不在父组件内
            </p>
            <el-button type="primary" @click="showModal = false">关闭</el-button>
          </div>
        </div>
      </Teleport>
    </section>

    <!-- ========== 2. KeepAlive ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. KeepAlive - 缓存组件</h3>
      <p class="demo-desc">
        缓存不活动的组件实例，切换时不销毁而是停用（deactivated）。
        独有钩子：onActivated（激活时）、onDeactivated（停用时）
      </p>
      <div class="flex gap-2 mb-2">
        <el-button
          v-for="tab in ['TabA', 'TabB']"
          :key="tab"
          size="small"
          :type="currentTab === tab ? 'primary' : 'default'"
          @click="currentTab = tab"
        >
          {{ tab }}
        </el-button>
      </div>
      <!-- KeepAlive包裹的组件切换时不会销毁 -->
      <KeepAlive>
        <component :is="currentTabComponent" />
      </KeepAlive>
      <p class="text-xs text-gray-500 mt-2">
        切换Tab后再切回来，组件内的计数器状态会保留（因为被KeepAlive缓存）
      </p>
    </section>

    <!-- ========== 3. 动态组件 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. 动态组件 component :is</h3>
      <p class="demo-desc">
        根据变量动态切换渲染的组件。不配合KeepAlive时每次切换都会销毁重建
      </p>
      <div class="flex gap-2 mb-2">
        <el-button
          v-for="tab in ['TabA', 'TabB']"
          :key="tab"
          size="small"
          :type="dynamicTab === tab ? 'primary' : 'default'"
          @click="dynamicTab = tab"
        >
          {{ tab }}(无缓存)
        </el-button>
      </div>
      <!-- 不使用KeepAlive，每次切换都重新创建 -->
      <component :is="dynamicComponent" />
    </section>

    <!-- ========== 4. Suspense ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. Suspense - 异步组件加载</h3>
      <p class="demo-desc">
        等待异步组件加载完成再显示，加载期间展示fallback内容（loading状态）
      </p>
      <el-button size="small" @click="showAsync = !showAsync" class="mb-2">
        {{ showAsync ? '隐藏' : '加载' }}异步组件
      </el-button>
      <Suspense v-if="showAsync">
        <!-- #default: 异步组件加载完成后显示 -->
        <template #default>
          <AsyncChild />
        </template>
        <!-- #fallback: 加载中显示的内容 -->
        <template #fallback>
          <div class="p-4 text-center text-gray-500">
            <p>⏳ 异步组件加载中...</p>
          </div>
        </template>
      </Suspense>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineAsyncComponent, shallowRef, markRaw } from 'vue'
import TabA from './TabA.vue'
import TabB from './TabB.vue'

// ===== 1. Teleport =====
const showModal = ref<boolean>(false)

// ===== 2. KeepAlive + 动态组件 =====
const currentTab = ref<string>('TabA')
const components: Record<string, typeof TabA> = { TabA: markRaw(TabA), TabB: markRaw(TabB) }
const currentTabComponent = computed(() => components[currentTab.value])

// ===== 3. 动态组件（无缓存） =====
const dynamicTab = ref<string>('TabA')
const dynamicComponent = computed(() => components[dynamicTab.value])

// ===== 4. Suspense =====
const showAsync = ref<boolean>(false)
// defineAsyncComponent: 定义异步组件（模拟延迟加载）
const AsyncChild = defineAsyncComponent(() => import('./AsyncChild.vue'))
</script>
