<!--
  @file src/components/layout/Sidebar.vue
  @description 侧边栏导航组件
  - 自动读取路由配置，按group分组渲染菜单
  - 支持路由meta中的title和icon字段
  - 当前激活路由高亮显示
-->
<template>
  <div class="sidebar h-full bg-gray-900 text-white overflow-y-auto">
    <!-- 项目标题 -->
    <div class="p-4 text-center border-b border-gray-700">
      <h1 class="text-lg font-bold text-green-400">Vue3 学习Demo</h1>
      <p class="text-xs text-gray-400 mt-1">全知识点系统学习</p>
    </div>

    <!-- 按分组渲染菜单 -->
    <div v-for="group in menuGroups" :key="group.name" class="mt-2">
      <!-- 分组标题 -->
      <div class="px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
        {{ group.name }}
      </div>
      <!-- 菜单项 -->
      <router-link
        v-for="item in group.items"
        :key="item.path"
        :to="item.path"
        class="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        active-class="!bg-green-600 !text-white"
      >
        <el-icon class="mr-2">
          <component :is="item.meta.icon" />
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * 侧边栏菜单逻辑
 * 核心思路：从路由配置中提取所有非hidden路由，按group字段分组
 */
import { computed } from 'vue'
import { routes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

/** 菜单分组类型 */
interface MenuGroup {
  name: string
  items: RouteRecordRaw[]
}

/**
 * 计算属性：将路由按group分组
 * 过滤掉redirect路由和hidden路由
 */
const menuGroups = computed<MenuGroup[]>(() => {
  const groups: Record<string, RouteRecordRaw[]> = {}

  routes.forEach((route) => {
    // 跳过无meta或redirect的路由
    if (!route.meta || route.redirect) return
    // 跳过标记为hidden的路由
    const meta = route.meta as { title: string; group: string; hidden?: boolean }
    if (meta.hidden) return

    const groupName = meta.group
    if (!groups[groupName]) {
      groups[groupName] = []
    }
    groups[groupName].push(route)
  })

  // 转换为数组，保持分组顺序
  return Object.entries(groups).map(([name, items]) => ({ name, items }))
})
</script>
