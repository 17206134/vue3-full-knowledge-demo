<!--
  @file src/pages/custom-hooks/index.vue
  @description 【知识点11】自定义Hook专题
  覆盖：useWindowSize、useToggle、useLocalStorage、useFetch
  讲解Hook封装思路与复用思想
-->
<template>
  <div class="space-y-6">
    <section class="demo-section">
      <h3 class="demo-title">Hook封装思想</h3>
      <div class="text-sm space-y-1">
        <p>1. Hook = 封装可复用的响应式逻辑（状态 + 行为）</p>
        <p>2. 命名约定：以use开头（useXxx）</p>
        <p>3. 内部可使用所有组合式API（ref/reactive/watch/生命周期等）</p>
        <p>4. 返回响应式数据和操作方法，组件中直接解构使用</p>
        <p>5. 优势：逻辑复用、关注点分离、易于测试</p>
      </div>
    </section>

    <!-- ========== 1. useWindowSize ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. useWindowSize - 响应式窗口尺寸</h3>
      <p class="demo-desc">监听resize事件，返回实时的宽高数据</p>
      <p class="text-sm">窗口宽度: {{ width }}px</p>
      <p class="text-sm">窗口高度: {{ height }}px</p>
      <p class="text-xs text-gray-500">拖动浏览器窗口大小，数据会实时更新</p>
    </section>

    <!-- ========== 2. useToggle ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. useToggle - 布尔值切换</h3>
      <p class="demo-desc">最简单实用的Hook，适合所有开关场景</p>
      <p class="text-sm">当前状态: {{ visible.state.value ? '显示' : '隐藏' }}</p>
      <div class="space-x-2 mt-2">
        <el-button size="small" @click="visible.toggle()">toggle</el-button>
        <el-button size="small" @click="visible.setTrue()">setTrue</el-button>
        <el-button size="small" @click="visible.setFalse()">setFalse</el-button>
      </div>
      <div v-if="visible.state.value" class="mt-2 p-2 bg-green-50 rounded">
        我是通过useToggle控制显示的内容
      </div>
    </section>

    <!-- ========== 3. useLocalStorage ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. useLocalStorage - 持久化存储</h3>
      <p class="demo-desc">修改值自动同步localStorage，刷新页面后数据保留</p>
      <div class="space-y-2">
        <div>
          <label class="text-sm">主题设置: </label>
          <select v-model="theme" class="border p-1 rounded">
            <option value="light">浅色</option>
            <option value="dark">深色</option>
          </select>
          <span class="text-sm ml-2">(刷新页面后值保留: {{ theme }})</span>
        </div>
        <div>
          <label class="text-sm">用户名: </label>
          <input v-model="username" class="border p-1 rounded" />
        </div>
      </div>
    </section>

    <!-- ========== 4. useFetch ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. useFetch - 通用请求Hook</h3>
      <p class="demo-desc">封装loading/error/data三态，一行代码完成请求状态管理</p>
      <div class="space-y-2">
        <el-button size="small" :loading="fetchState.loading.value" @click="fetchState.execute()">
          重新请求
        </el-button>
        <p v-if="fetchState.error.value" class="text-red-500 text-sm">
          错误: {{ fetchState.error.value }}
        </p>
        <p v-else-if="fetchState.data.value" class="text-sm">
          数据: {{ JSON.stringify(fetchState.data.value).slice(0, 100) }}...
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 自定义Hook使用示例
 * 每个hook独立封装，组件内只需调用并解构
 */
import { useWindowSize } from '@/hooks/useWindowSize'
import { useToggle } from '@/hooks/useToggle'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useFetch } from '@/hooks/useFetch'
import { getUserList } from '@/api/modules/user'

// 1. useWindowSize
const { width, height } = useWindowSize()

// 2. useToggle
const visible = useToggle(false)

// 3. useLocalStorage - 修改会自动存储
const theme = useLocalStorage<string>('app-theme', 'light')
const username = useLocalStorage<string>('app-username', '')

// 4. useFetch - 自动发起请求
const fetchState = useFetch(() => getUserList())
</script>
