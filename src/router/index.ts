/**
 * @file src/router/index.ts
 * @description Vue Router 4 路由配置文件
 * - 定义所有知识点页面的路由，每条路由包含meta信息用于自动生成侧边栏菜单
 * - meta.title: 菜单标题
 * - meta.icon: 菜单图标(Element Plus图标名)
 * - meta.group: 所属分组，用于菜单分类
 */
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

/** 路由meta类型定义 */
export interface RouteMeta {
  title: string
  icon?: string
  group: string
  hidden?: boolean
}

/** 路由配置数组 - 每个知识点一个路由 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/template-basics'
  },
  {
    path: '/template-basics',
    name: 'TemplateBasics',
    component: () => import('@/pages/template-basics/index.vue'),
    meta: { title: '模板基础语法', icon: 'Document', group: '基础' }
  },
  {
    path: '/reactivity',
    name: 'Reactivity',
    component: () => import('@/pages/reactivity/index.vue'),
    meta: { title: '响应式API', icon: 'Refresh', group: '基础' }
  },
  {
    path: '/lifecycle',
    name: 'Lifecycle',
    component: () => import('@/pages/lifecycle/index.vue'),
    meta: { title: '生命周期', icon: 'Timer', group: '基础' }
  },
  {
    path: '/communication',
    name: 'Communication',
    component: () => import('@/pages/communication/index.vue'),
    meta: { title: '组件通信', icon: 'ChatDotRound', group: '组件' }
  },
  {
    path: '/builtin-use',
    name: 'BuiltinUse',
    component: () => import('@/pages/builtin-use/index.vue'),
    meta: { title: 'Vue内置use系列', icon: 'SetUp', group: '组件' }
  },
  {
    path: '/advanced-components',
    name: 'AdvancedComponents',
    component: () => import('@/pages/advanced-components/index.vue'),
    meta: { title: '高级内置组件', icon: 'Box', group: '组件' }
  },
  {
    path: '/directives-demo',
    name: 'DirectivesDemo',
    component: () => import('@/pages/directives-demo/index.vue'),
    meta: { title: '自定义指令', icon: 'MagicStick', group: '进阶' }
  },
  {
    path: '/pinia',
    name: 'PiniaDemo',
    component: () => import('@/pages/pinia/index.vue'),
    meta: { title: 'Pinia状态管理', icon: 'Files', group: '进阶' }
  },
  {
    path: '/vue-router',
    name: 'VueRouterDemo',
    component: () => import('@/pages/vue-router/index.vue'),
    meta: { title: 'VueRouter4', icon: 'Guide', group: '进阶' },
    children: [
      {
        path: 'detail/:id',
        name: 'RouterDetail',
        component: () => import('@/pages/vue-router/Detail.vue'),
        meta: { title: '路由详情', icon: '', group: '进阶', hidden: true }
      },
      {
        path: 'nested',
        name: 'RouterNested',
        component: () => import('@/pages/vue-router/Nested.vue'),
        meta: { title: '嵌套路由子页', icon: '', group: '进阶', hidden: true }
      }
    ]
  },
  {
    path: '/axios-demo',
    name: 'AxiosDemo',
    component: () => import('@/pages/axios-demo/index.vue'),
    meta: { title: 'Axios网络请求', icon: 'Connection', group: '进阶' }
  },
  {
    path: '/custom-hooks',
    name: 'CustomHooks',
    component: () => import('@/pages/custom-hooks/index.vue'),
    meta: { title: '自定义Hook', icon: 'Opportunity', group: '进阶' }
  },
  {
    path: '/advanced-features',
    name: 'AdvancedFeatures',
    component: () => import('@/pages/advanced-features/index.vue'),
    meta: { title: '进阶特性', icon: 'TrendCharts', group: '高级' }
  }
]

/** 创建路由实例 */
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 全局前置守卫示例（打印导航信息，用于教学演示）
router.beforeEach((to, from, next) => {
  console.log(`[路由守卫] 从 ${from.path} 导航到 ${to.path}`)
  next()
})

export default router
export { routes }
