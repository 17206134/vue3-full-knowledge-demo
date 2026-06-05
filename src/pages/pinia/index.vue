<!--
  @file src/pages/pinia/index.vue
  @description 【知识点8】Pinia状态管理完整演示
  覆盖：state/getters/actions、$patch、多模块、actions互调、持久化
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. 基础用法 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. Pinia 基础用法 (state/getters/actions)</h3>
      <div class="space-y-1 text-sm">
        <p>count: {{ counterStore.count }}</p>
        <p>doubleCount(getter): {{ counterStore.doubleCount }}</p>
        <p>displayText(getter): {{ counterStore.displayText }}</p>
        <p>history: {{ counterStore.history }}</p>
        <div class="space-x-2 mt-2">
          <el-button size="small" @click="counterStore.increment()">increment</el-button>
          <el-button size="small" @click="counterStore.decrement()">decrement</el-button>
          <el-button size="small" type="warning" @click="counterStore.asyncIncrement()">
            asyncIncrement(1s延迟)
          </el-button>
          <el-button size="small" type="danger" @click="counterStore.resetState()">
            $reset重置
          </el-button>
        </div>
      </div>
    </section>

    <!-- ========== 2. $patch 批量修改 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. $patch 批量修改state</h3>
      <p class="demo-desc">
        $patch比逐个修改更高效，只触发一次订阅(subscription)。支持对象和函数两种写法
      </p>
      <div class="space-x-2">
        <!-- 对象写法：直接传入要修改的字段 -->
        <el-button size="small" @click="counterStore.batchUpdate('批量修改', 100)">
          $patch对象写法(count=100)
        </el-button>
        <!-- 函数写法：适合复杂修改逻辑 -->
        <el-button size="small" @click="patchWithFn">$patch函数写法</el-button>
      </div>
    </section>

    <!-- ========== 3. 多模块 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. 多模块拆分 & Setup Store写法</h3>
      <p class="demo-desc">
        user store使用Setup Store写法（组合式API风格），与选项式写法的counter store对比
      </p>
      <div class="text-sm space-y-1">
        <p>用户名: {{ userStore.displayName }}</p>
        <p>是否登录: {{ userStore.isLoggedIn }}</p>
        <p>是否管理员: {{ userStore.isAdmin }}</p>
        <div class="space-x-2 mt-2">
          <el-button size="small" @click="userStore.login('admin', '123456')">
            模拟登录(admin/123456)
          </el-button>
          <el-button size="small" @click="userStore.logout()">退出</el-button>
        </div>
      </div>
    </section>

    <!-- ========== 4. Actions互相调用 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. Store之间互相调用</h3>
      <p class="demo-desc">在一个store的action中引入并使用另一个store</p>
      <el-button size="small" @click="userStore.loginAndCount()">
        调用user.loginAndCount()（内部调用counter.increment）
      </el-button>
      <p class="text-sm text-gray-500 mt-1">counter当前值: {{ counterStore.count }}</p>
    </section>

    <!-- ========== 5. 持久化 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">5. 持久化插件 (pinia-plugin-persistedstate)</h3>
      <p class="demo-desc">
        配置persist选项后，store数据自动存储到localStorage，刷新页面不丢失
      </p>
      <div class="text-sm space-y-1">
        <p>counter store的count和name已配置持久化，刷新页面后值保留</p>
        <p>user store的token和isLoggedIn已配置持久化</p>
        <p class="text-xs text-orange-500">
          配置方式：在defineStore中添加 persist: { key: 'xxx', pick: ['field1', 'field2'] }
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * Pinia完整示例
 * 同时使用两个store，演示模块化和互调
 */
import { useCounterStore } from '@/store/modules/counter'
import { useUserStore } from '@/store/modules/user'

const counterStore = useCounterStore()
const userStore = useUserStore()

/** $patch函数写法 - 适合数组操作等复杂修改 */
function patchWithFn(): void {
  counterStore.$patch((state) => {
    state.count += 10
    state.name = '函数式修改'
    state.history.push(state.count)
  })
}
</script>
