/**
 * @file src/store/index.ts
 * @description Pinia 状态管理入口文件
 * - 创建Pinia实例
 * - 注册持久化插件：将指定store数据自动存储到localStorage
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建Pinia实例
const pinia = createPinia()

// 注册持久化插件 - 开启后store数据刷新页面不丢失
pinia.use(piniaPluginPersistedstate)

export default pinia
