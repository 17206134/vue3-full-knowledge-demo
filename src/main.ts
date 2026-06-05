/**
 * @file src/main.ts
 * @description 应用入口文件
 * - 创建Vue应用实例
 * - 注册全局插件：Router、Pinia、Element Plus
 * - 注册全局自定义指令
 * - 引入全局样式
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/tailwind.css'

// 导入全局自定义指令
import { focusDirective } from './directives/focus'
import { copyDirective } from './directives/copy'
import { throttleDirective } from './directives/throttle'

// 创建Vue应用实例
const app = createApp(App)

// 注册全局插件
app.use(router) // Vue Router - 路由管理
app.use(pinia) // Pinia - 状态管理
app.use(ElementPlus) // Element Plus - UI组件库

// 注册所有Element Plus图标为全局组件
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 注册全局自定义指令
app.directive('focus', focusDirective) // v-focus: 自动聚焦
app.directive('copy', copyDirective) // v-copy: 点击复制文本
app.directive('throttle', throttleDirective) // v-throttle: 节流点击

// 挂载应用到DOM
app.mount('#app')
