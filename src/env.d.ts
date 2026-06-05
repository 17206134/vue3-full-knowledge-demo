/**
 * @file src/env.d.ts
 * @description TypeScript环境类型声明文件
 * 声明.vue文件模块类型，让TS识别Vue单文件组件
 */

/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
