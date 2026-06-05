/**
 * @file src/store/modules/user.ts
 * @description Pinia Store示例 - 用户模块
 * 演示知识点：
 * - Setup Store写法（组合式API风格）
 * - 跨Store调用（在user store中调用counter store）
 * - 异步action
 */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useCounterStore } from './counter'

/** 用户信息类型 */
interface UserInfo {
  id: number
  name: string
  email: string
  role: string
}

/**
 * 用户Store - 使用Setup Store写法（组合式API风格）
 * 与选项式区别：
 * - ref() → state
 * - computed() → getters
 * - function → actions
 */
export const useUserStore = defineStore('user', () => {
  // ========== State（ref定义响应式状态） ==========
  const userInfo = ref<UserInfo | null>(null)
  const token = ref<string>('')
  const isLoggedIn = ref<boolean>(false)

  // ========== Getters（computed计算属性） ==========
  /** 用户显示名 */
  const displayName = computed<string>(() => {
    return userInfo.value?.name || '未登录用户'
  })

  /** 是否为管理员 */
  const isAdmin = computed<boolean>(() => {
    return userInfo.value?.role === 'admin'
  })

  // ========== Actions（普通函数） ==========
  /** 模拟登录 */
  async function login(username: string, password: string): Promise<boolean> {
    // 模拟API请求延迟
    await new Promise((resolve) => setTimeout(resolve, 800))

    if (username === 'admin' && password === '123456') {
      userInfo.value = {
        id: 1,
        name: 'Admin',
        email: 'admin@vue3demo.com',
        role: 'admin'
      }
      token.value = 'mock-token-xxx'
      isLoggedIn.value = true
      return true
    }
    return false
  }

  /** 退出登录 */
  function logout(): void {
    userInfo.value = null
    token.value = ''
    isLoggedIn.value = false
  }

  /**
   * 跨Store调用示例
   * 在user store的action中调用counter store的方法
   */
  function loginAndCount(): void {
    const counterStore = useCounterStore()
    // 调用另一个store的action
    counterStore.increment()
    console.log('[跨Store调用] 登录次数已记录到counter store')
  }

  // 返回所有需要暴露的状态和方法
  return {
    userInfo,
    token,
    isLoggedIn,
    displayName,
    isAdmin,
    login,
    logout,
    loginAndCount
  }
}, {
  // 持久化配置
  persist: {
    key: 'user-store',
    pick: ['token', 'isLoggedIn']
  }
})
