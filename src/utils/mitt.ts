/**
 * @file src/utils/mitt.ts
 * @description 全局事件总线封装（基于mitt库）
 * 作用：替代Vue2的EventBus($on/$emit)，实现跨组件通信
 * 使用场景：兄弟组件通信、深层嵌套组件通信
 * 注意：组件销毁时务必取消监听，防止内存泄漏
 */
import mitt from 'mitt'

/** 定义事件类型映射（TS类型安全） */
type Events = {
  /** 示例事件：传递消息字符串 */
  'send-message': string
  /** 示例事件：传递用户信息 */
  'update-user': { name: string; age: number }
  /** 通用事件：任意类型 */
  [key: string]: unknown
}

/**
 * 创建全局事件总线实例
 * 使用方式：
 *   发送事件：emitter.emit('send-message', 'hello')
 *   监听事件：emitter.on('send-message', (msg) => console.log(msg))
 *   取消监听：emitter.off('send-message', handler)
 *   清除所有：emitter.all.clear()
 */
const emitter = mitt<Events>()

export default emitter
