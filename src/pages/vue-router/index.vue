<!--
  @file src/pages/vue-router/index.vue
  @description 【知识点9】VueRouter4全套演示
  覆盖：基础路由、嵌套路由、动态路由、query/params、编程式导航、路由守卫、懒加载
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. 基础路由信息 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. 当前路由信息</h3>
      <div class="text-sm space-y-1">
        <p>当前路径: {{ route.path }}</p>
        <p>路由名称: {{ route.name }}</p>
        <p>路由参数(params): {{ JSON.stringify(route.params) }}</p>
        <p>查询参数(query): {{ JSON.stringify(route.query) }}</p>
        <p>路由meta: {{ JSON.stringify(route.meta) }}</p>
      </div>
    </section>

    <!-- ========== 2. 动态路由参数 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. 动态路由参数 /:id</h3>
      <p class="demo-desc">路由路径中使用:param定义动态段，组件内通过route.params获取</p>
      <div class="space-x-2">
        <el-button size="small" @click="goToDetail(1)">查看详情 #1</el-button>
        <el-button size="small" @click="goToDetail(2)">查看详情 #2</el-button>
        <el-button size="small" @click="goToDetail(99)">查看详情 #99</el-button>
      </div>
    </section>

    <!-- ========== 3. query参数 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. query 与 params 两种传参</h3>
      <p class="demo-desc">
        params: 路径参数(/detail/1)，刷新保留；query: URL查询(?name=xx)，刷新保留
      </p>
      <div class="space-x-2">
        <!-- query传参 -->
        <el-button size="small" @click="goWithQuery">携带query跳转</el-button>
        <!-- params传参 -->
        <el-button size="small" @click="goWithParams">携带params跳转</el-button>
      </div>
    </section>

    <!-- ========== 4. 编程式导航 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. 编程式导航 (push/replace/go)</h3>
      <p class="demo-desc">
        push: 新增历史记录；replace: 替换当前记录(无法后退)；go: 前进/后退N步
      </p>
      <div class="space-x-2">
        <el-button size="small" @click="router.push('/template-basics')">
          push到模板语法页
        </el-button>
        <el-button size="small" @click="router.replace('/reactivity')">
          replace到响应式页(无后退)
        </el-button>
        <el-button size="small" @click="router.go(-1)">后退一步go(-1)</el-button>
        <el-button size="small" @click="router.go(1)">前进一步go(1)</el-button>
      </div>
    </section>

    <!-- ========== 5. 嵌套路由 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">5. 嵌套路由</h3>
      <p class="demo-desc">
        children配置嵌套子路由，父路由组件需要包含router-view出口
      </p>
      <el-button size="small" @click="router.push('/vue-router/nested')">
        跳转到嵌套子路由
      </el-button>
      <!-- 嵌套路由出口 -->
      <router-view />
    </section>

    <!-- ========== 6. 路由守卫 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">6. 路由守卫说明</h3>
      <div class="text-sm space-y-2">
        <div>
          <p class="font-semibold">全局前置守卫 (router.beforeEach)</p>
          <p class="text-gray-500">在router/index.ts中配置，每次导航都执行，常用于权限验证</p>
        </div>
        <div>
          <p class="font-semibold">路由独享守卫 (beforeEnter)</p>
          <p class="text-gray-500">在路由配置中定义，只对该路由生效</p>
        </div>
        <div>
          <p class="font-semibold">组件内守卫 (onBeforeRouteLeave/onBeforeRouteUpdate)</p>
          <p class="text-gray-500">在组件内使用，离开或更新路由时触发</p>
        </div>
      </div>
      <p class="text-xs text-orange-500 mt-2">
        查看控制台可以看到全局beforeEach守卫的日志输出
      </p>
    </section>

    <!-- ========== 7. 路由懒加载 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">7. 路由懒加载</h3>
      <p class="demo-desc">
        使用 () => import() 实现路由组件按需加载，首屏只加载当前路由组件的JS
      </p>
      <pre class="text-xs bg-gray-100 p-2 rounded">
// 路由配置中的懒加载写法
component: () => import('@/pages/xxx/index.vue')
// Vite会自动将每个懒加载路由打包为独立chunk
      </pre>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * VueRouter4演示
 * useRoute: 获取当前路由信息（响应式）
 * useRouter: 获取路由实例（用于编程式导航）
 */
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'

const route = useRoute() // 当前路由信息
const router = useRouter() // 路由实例

/** 跳转到动态路由详情页 */
function goToDetail(id: number): void {
  // 方式1: path + params
  router.push(`/vue-router/detail/${id}`)
}

/** 携带query参数跳转 */
function goWithQuery(): void {
  router.push({
    path: '/vue-router',
    query: { name: '张三', age: '25' }
  })
}

/** 携带params跳转（需要使用name） */
function goWithParams(): void {
  router.push({
    name: 'RouterDetail',
    params: { id: '42' }
  })
}

/**
 * 组件内路由守卫
 * onBeforeRouteLeave: 离开当前路由时触发
 * 常用场景：表单未保存提示
 */
onBeforeRouteLeave((to, from) => {
  console.log(`[组件内守卫] 即将离开 ${from.path}，前往 ${to.path}`)
  // 可以返回false取消导航
  // return false
})
</script>
