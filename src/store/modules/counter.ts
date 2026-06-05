/**
 * @file src/store/modules/counter.ts
 * @description Pinia Store示例 - 计数器模块
 * 演示知识点：
 * - defineStore基础用法（选项式写法）
 * - state: 响应式状态定义
 * - getters: 计算属性（类似computed）
 * - actions: 方法（可包含异步操作）
 * - $patch: 批量修改state
 * - persist: 持久化配置
 */
import { defineStore } from 'pinia'

/** Counter Store 状态类型 */
interface CounterState {
  count: number
  name: string
  history: number[]
}

/**
 * 计数器Store
 * 第一个参数'counter'是store的唯一ID，全局不可重复
 */
export const useCounterStore = defineStore('counter', {
  // state: 返回一个函数，函数返回初始状态对象
  // 注意：必须是函数形式，确保每个组件实例获取独立的状态副本
  state: (): CounterState => ({
    count: 0,
    name: 'Vue3学习计数器',
    history: []
  }),

  // getters: 类似computed计算属性，具有缓存特性
  getters: {
    /** 双倍计数 - 演示getter基础用法 */
    doubleCount: (state): number => state.count * 2,

    /** 格式化显示 - 演示getter访问其他getter */
    displayText(): string {
      return `${this.name}: ${this.count} (双倍: ${this.doubleCount})`
    },

    /** 历史记录长度 */
    historyLength: (state): number => state.history.length
  },

  // actions: 可以是同步/异步方法，可以访问this
  actions: {
    /** 递增 */
    increment(): void {
      this.count++
      this.history.push(this.count)
    },

    /** 递减 */
    decrement(): void {
      this.count--
      this.history.push(this.count)
    },

    /** 异步递增 - 演示action中的异步操作 */
    async asyncIncrement(delay: number = 1000): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, delay))
      this.increment()
    },

    /** 重置状态 - 使用$reset()方法 */
    resetState(): void {
      this.$reset()
    },

    /**
     * 批量修改 - 演示$patch用法
     * $patch比逐个修改性能更好，只触发一次响应式更新
     */
    batchUpdate(name: string, count: number): void {
      this.$patch({
        name,
        count,
        history: [...this.history, count]
      })
    }
  },

  // persist: 持久化配置（需要pinia-plugin-persistedstate插件）
  persist: {
    key: 'counter-store', // localStorage的key
    pick: ['count', 'name'] // 只持久化指定字段（history不持久化）
  }
})
