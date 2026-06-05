<!--
  @file src/App.vue
  @description 根组件 - 整体Layout布局
  - 左侧固定侧边栏导航（自动从路由配置生成菜单）
  - 右侧主内容区域（RouterView渲染当前页面）
-->
<template>
  <div class="flex h-screen">
    <!-- 左侧侧边栏 - 固定宽度240px -->
    <aside class="w-60 flex-shrink-0">
      <Sidebar />
    </aside>

    <!-- 右侧主内容区域 -->
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      <!-- 页面标题 -->
      <div class="mb-4">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ currentRoute.meta?.title || '首页' }}
        </h2>
        <p class="text-sm text-gray-500 mt-1">
          知识点分组：{{ currentRoute.meta?.group || '-' }}
        </p>
      </div>

      <!-- 路由出口：渲染当前匹配的页面组件 -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
/**
 * App.vue 根组件逻辑
 * - 引入Sidebar侧边栏组件
 * - 获取当前路由信息用于显示页面标题
 */
import { useRoute } from 'vue-router'
import Sidebar from '@/components/layout/Sidebar.vue'

// 获取当前路由对象（响应式）
const currentRoute = useRoute()
</script>

<style>
/* 页面过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
