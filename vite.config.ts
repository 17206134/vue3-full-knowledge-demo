/**
 * @file vite.config.ts
 * @description Vite构建工具配置文件
 * 配置内容：路径别名、Vue插件、Element Plus自动导入、Mock插件
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { viteMockServe } from 'vite-plugin-mock'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    // Vue3 单文件组件支持
    vue(),
    // API自动导入：无需手动import即可使用Vue/VueRouter/Pinia的API
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts'
    }),
    // 组件自动注册：Element Plus组件无需手动注册即可使用
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts'
    }),
    // Mock接口服务：开发环境拦截请求，返回模拟数据
    viteMockServe({
      mockPath: 'src/mock',
      enable: true
    })
  ],
  resolve: {
    // 路径别名配置：@ 指向 src 目录
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
