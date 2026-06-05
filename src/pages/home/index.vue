<!--
  @file src/pages/home/index.vue
  @description 项目首页 - 项目介绍、知识点导航、GitHub 链接
-->
<template>
  <div class="space-y-6">
    <!-- ========== Hero 区域 ========== -->
    <section
      class="rounded-xl p-8 text-white shadow-md"
      style="background: linear-gradient(135deg, #41b883 0%, #34495e 100%)"
    >
      <h1 class="text-3xl font-bold mb-2">🐶 Vue3 全知识点学习项目</h1>
      <p class="text-base opacity-90">
        一个用 Vite + TypeScript + Element Plus + Tailwind 搭建的 Vue3 学习 Demo，
        覆盖响应式、生命周期、组件通信、内置 use 系列、Pinia、Router、Axios、自定义指令/Hook 等核心知识点。
      </p>
      <div class="mt-5 flex flex-wrap items-center gap-3">
        <a
          :href="GITHUB_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-black/40 hover:bg-black/60 transition-colors px-4 py-2 rounded-md text-sm font-medium"
        >
          <el-icon><Link /></el-icon>
          GitHub 仓库
        </a>
        <span class="text-xs opacity-75 break-all">{{ GITHUB_URL }}</span>
      </div>
    </section>

    <!-- ========== 技术栈 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">🛠 技术栈</h3>
      <div class="flex flex-wrap gap-2 mt-2">
        <el-tag v-for="t in techStack" :key="t" type="success" effect="plain">
          {{ t }}
        </el-tag>
      </div>
    </section>

    <!-- ========== 快速开始 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">🚀 快速开始</h3>
      <pre class="bg-gray-900 text-green-300 text-sm p-4 rounded-md overflow-x-auto"><code>git clone {{ GITHUB_URL }}
cd vue3-full-knowledge-demo
npm install
npm run dev</code></pre>
      <p class="text-sm text-gray-500 mt-2">
        默认运行端口：<code class="text-pink-600">http://localhost:5173</code>
      </p>
    </section>

    <!-- ========== 知识点导航 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">📚 知识点目录</h3>
      <p class="demo-desc">点击卡片直接跳转到对应知识点演示页面</p>

      <div v-for="group in menuGroups" :key="group.name" class="mt-4">
        <div class="text-xs text-gray-400 uppercase tracking-wider mb-2">
          {{ group.name }}
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <router-link
            v-for="item in group.items"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-md hover:border-green-500 hover:shadow-md transition-all text-sm text-gray-700 hover:text-green-600"
          >
            <el-icon><component :is="item.meta?.icon" /></el-icon>
            <span>{{ item.meta?.title }}</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 项目首页逻辑
 * - 从路由配置自动生成知识点目录（按 group 分组）
 * - 展示 GitHub 仓库地址和快速开始命令
 */
import { computed } from 'vue'
import { routes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

/** GitHub 仓库地址 */
const GITHUB_URL = 'https://github.com/17206134/vue3-full-knowledge-demo'

/** 项目技术栈 */
const techStack = [
  'Vue 3.5+',
  'TypeScript',
  'Vite 6',
  'Vue Router 4',
  'Pinia',
  'Element Plus',
  'Tailwind CSS',
  'Axios',
  'Mitt'
]

interface MenuGroup {
  name: string
  items: RouteRecordRaw[]
}

/** 知识点目录：从路由配置过滤生成 */
const menuGroups = computed<MenuGroup[]>(() => {
  const groups: Record<string, RouteRecordRaw[]> = {}
  routes.forEach((route) => {
    if (!route.meta || route.redirect) return
    const meta = route.meta as { title: string; group: string; hidden?: boolean }
    if (meta.hidden) return
    // 跳过首页自身
    if (route.path === '/home') return
    if (!groups[meta.group]) groups[meta.group] = []
    groups[meta.group].push(route)
  })
  return Object.entries(groups).map(([name, items]) => ({ name, items }))
})
</script>

<style scoped>
.demo-section {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}
.demo-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}
.demo-desc {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 12px;
}
</style>
