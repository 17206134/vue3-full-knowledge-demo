<!--
  @file src/pages/reactivity/index.vue
  @description 【知识点2】Vue3响应式API全集 - 示例页面
  覆盖知识点：
  - ref：基础类型/对象的响应式引用
  - reactive：对象/数组的响应式代理
  - toRef / toRefs：从reactive对象中提取响应式引用
  - unref：获取ref的原始值
  - isRef / isReactive：类型判断工具
  - shallowRef / shallowReactive：浅层响应式（性能优化）
  - readonly / shallowReadonly：只读代理
  - computed：计算属性（缓存+依赖追踪）
  - watch：侦听器（单/多数据源、深度监听）
  - watchEffect：自动依赖收集的副作用
-->
<template>
  <div class="space-y-6">
    <!-- ==================== 1. ref基础 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">1. ref - 响应式引用</h3>
      <p class="demo-desc">
        ref()可包装任意类型为响应式数据。基础类型通过.value访问，模板中自动解包无需.value
      </p>
      <!-- 基础类型ref -->
      <div class="space-y-1">
        <p>字符串ref: {{ strRef }}</p>
        <p>数字ref: {{ numRef }}</p>
        <p>布尔ref: {{ boolRef }}</p>
        <!-- 对象ref：ref也可以包装对象，内部会自动调用reactive -->
        <p>对象ref: {{ objRef.name }} - {{ objRef.age }}岁</p>
        <el-button size="small" @click="numRef++">数字+1</el-button>
        <el-button size="small" @click="objRef.age++">年龄+1</el-button>
      </div>
    </section>

    <!-- ==================== 2. reactive ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">2. reactive - 响应式代理</h3>
      <p class="demo-desc">
        reactive()只能用于对象类型（Object/Array/Map/Set），返回Proxy代理对象。
        坑点：不能解构（会丢失响应性），不能重新赋值整个对象
      </p>
      <div class="space-y-1">
        <p>用户：{{ state.user.name }}，年龄：{{ state.user.age }}</p>
        <p>爱好：{{ state.hobbies.join(', ') }}</p>
        <el-button size="small" @click="state.user.age++">年龄+1</el-button>
        <el-button size="small" @click="state.hobbies.push('游泳')">添加爱好</el-button>
      </div>
      <p class="text-xs text-orange-500 mt-2">
        ⚠️ 坑点：const { name } = state.user 解构后name不是响应式的！需要用toRefs
      </p>
    </section>

    <!-- ==================== 3. toRef / toRefs ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">3. toRef / toRefs - 保持响应式解构</h3>
      <p class="demo-desc">
        toRef：从reactive对象中取单个属性为ref；toRefs：将整个reactive对象的所有属性转为ref
      </p>
      <div class="space-y-1">
        <!-- toRef：单属性提取 -->
        <p>toRef取出的name: {{ nameRef }}（修改会同步到原对象）</p>
        <!-- toRefs：批量提取 -->
        <p>toRefs取出的age: {{ ageRef }}</p>
        <el-button size="small" @click="nameRef = '李四'">修改nameRef</el-button>
        <el-button size="small" @click="ageRef++">修改ageRef</el-button>
        <p class="text-xs text-gray-500">原对象state.user: {{ state.user }}</p>
      </div>
    </section>

    <!-- ==================== 4. shallowRef / shallowReactive ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">4. shallowRef / shallowReactive - 浅层响应式</h3>
      <p class="demo-desc">
        只有第一层属性是响应式的，深层嵌套不追踪。适用于大对象性能优化场景
      </p>
      <div class="space-y-1">
        <p>shallowRef对象: {{ shallowObj }}</p>
        <p>shallowReactive: {{ shallowState.nested.count }}</p>
        <!-- 直接修改深层不会触发视图更新 -->
        <el-button size="small" @click="shallowState.nested.count++">
          修改深层(不更新视图)
        </el-button>
        <!-- 替换整个.value才触发更新 -->
        <el-button size="small" @click="shallowObj = { a: Math.random() }">
          替换shallowRef整体(触发更新)
        </el-button>
      </div>
    </section>

    <!-- ==================== 5. readonly ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">5. readonly / shallowReadonly - 只读代理</h3>
      <p class="demo-desc">
        readonly：深层只读，任何修改都会警告；shallowReadonly：只有第一层只读
      </p>
      <div class="space-y-1">
        <p>只读对象: {{ readonlyObj.name }} - {{ readonlyObj.age }}</p>
        <el-button size="small" @click="tryModifyReadonly">
          尝试修改readonly（控制台会报警告）
        </el-button>
      </div>
    </section>

    <!-- ==================== 6. computed ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">6. computed - 计算属性</h3>
      <p class="demo-desc">
        具有缓存特性，只有依赖变化才重新计算。支持get/set写法实现可写计算属性
      </p>
      <div class="space-y-2">
        <!-- 只读computed -->
        <div>
          <p>firstName: <input v-model="firstName" class="border p-1 rounded w-20" /></p>
          <p>lastName: <input v-model="lastName" class="border p-1 rounded w-20" /></p>
          <p>computed全名(只读): {{ fullName }}</p>
        </div>
        <!-- 可写computed（get/set） -->
        <div class="border-t pt-2">
          <p>可写computed: <input v-model="fullNameWritable" class="border p-1 rounded" /></p>
          <p class="text-xs text-gray-500">修改computed会通过set拆分并赋值给firstName和lastName</p>
        </div>
      </div>
    </section>

    <!-- ==================== 7. watch ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">7. watch - 侦听器</h3>
      <p class="demo-desc">
        监听数据源变化执行回调。支持监听单数据、多数据、深度监听、立即执行
      </p>
      <div class="space-y-2">
        <!-- 监听单个ref -->
        <div>
          <el-button size="small" @click="watchCount++">watchCount++（当前: {{ watchCount }}）</el-button>
          <p class="text-sm text-gray-600">watch日志: {{ watchLog }}</p>
        </div>
        <!-- 深度监听对象 -->
        <div class="border-t pt-2">
          <el-button size="small" @click="deepObj.nested.value++">修改深层对象</el-button>
          <p class="text-sm text-gray-600">deep watch: {{ deepWatchLog }}</p>
        </div>
      </div>
    </section>

    <!-- ==================== 8. watchEffect ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">8. watchEffect - 自动依赖收集</h3>
      <p class="demo-desc">
        自动追踪回调中用到的响应式数据，无需指定监听源。立即执行一次，依赖变化后重新执行
      </p>
      <div class="space-y-1">
        <el-button size="small" @click="effectX++">effectX++（{{ effectX }}）</el-button>
        <el-button size="small" @click="effectY++">effectY++（{{ effectY }}）</el-button>
        <p class="text-sm text-gray-600">watchEffect日志: {{ effectLog }}</p>
        <p class="text-xs text-orange-500">
          与watch区别：watchEffect不需要指定监听源，自动收集依赖；无法获取旧值
        </p>
      </div>
    </section>

    <!-- ==================== 9. 工具函数 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">9. 响应式工具函数</h3>
      <p class="demo-desc">unref / isRef / isReactive - 类型判断和值提取</p>
      <div class="space-y-1 text-sm">
        <p>isRef(numRef): {{ isRefResult }}</p>
        <p>isReactive(state): {{ isReactiveResult }}</p>
        <p>unref(numRef) = {{ unrefResult }}（等价于 numRef.value）</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
/**
 * 响应式API演示 - 逻辑部分
 */
import {
  ref,
  reactive,
  toRef,
  toRefs,
  shallowRef,
  shallowReactive,
  readonly,
  computed,
  watch,
  watchEffect,
  isRef,
  isReactive,
  unref
} from 'vue'

// ========== 1. ref ==========
const strRef = ref<string>('Hello')
const numRef = ref<number>(42)
const boolRef = ref<boolean>(true)
const objRef = ref<{ name: string; age: number }>({ name: '张三', age: 20 })

// ========== 2. reactive ==========
const state = reactive({
  user: { name: '张三', age: 25 },
  hobbies: ['篮球', '编程']
})

// ========== 3. toRef / toRefs ==========
// toRef: 从reactive对象提取单个属性，保持响应式连接
const nameRef = toRef(state.user, 'name')
// toRefs: 将reactive对象所有属性转为ref（解构时常用）
const { age: ageRef } = toRefs(state.user)

// ========== 4. shallowRef / shallowReactive ==========
// shallowRef: 只有.value的重新赋值才触发更新
const shallowObj = shallowRef<{ a: number }>({ a: 1 })
// shallowReactive: 只有第一层属性是响应式的
const shallowState = shallowReactive({
  name: '浅层',
  nested: { count: 0 } // 这层不是响应式的
})

// ========== 5. readonly ==========
const originalObj = reactive({ name: '原始数据', age: 18 })
// readonly包装后，尝试修改会在开发环境发出警告
const readonlyObj = readonly(originalObj)

function tryModifyReadonly(): void {
  // 下面这行会触发Vue运行时警告（但不会报错）
  ;(readonlyObj as { name: string }).name = '尝试修改'
  console.warn('readonly对象不允许直接修改，但可以通过修改原始对象间接改变')
  originalObj.name = '通过原始对象修改'
}

// ========== 6. computed ==========
const firstName = ref<string>('张')
const lastName = ref<string>('三')

// 只读计算属性
const fullName = computed<string>(() => firstName.value + lastName.value)

// 可写计算属性（get + set）
const fullNameWritable = computed<string>({
  get: () => firstName.value + ' ' + lastName.value,
  set: (val: string) => {
    const parts = val.split(' ')
    firstName.value = parts[0] || ''
    lastName.value = parts[1] || ''
  }
})

// ========== 7. watch ==========
const watchCount = ref<number>(0)
const watchLog = ref<string>('')

// 监听单个ref
watch(watchCount, (newVal, oldVal) => {
  watchLog.value = `变化: ${oldVal} → ${newVal}`
})

// 深度监听对象
const deepObj = reactive({ nested: { value: 0 } })
const deepWatchLog = ref<string>('')

watch(
  () => deepObj.nested.value,
  (newVal, oldVal) => {
    deepWatchLog.value = `深层值变化: ${oldVal} → ${newVal}`
  }
)

// ========== 8. watchEffect ==========
const effectX = ref<number>(0)
const effectY = ref<number>(0)
const effectLog = ref<string>('')

// watchEffect自动收集依赖，effectX或effectY变化都会重新执行
watchEffect(() => {
  effectLog.value = `自动追踪: x=${effectX.value}, y=${effectY.value}, sum=${effectX.value + effectY.value}`
})

// ========== 9. 工具函数 ==========
const isRefResult = isRef(numRef) // true
const isReactiveResult = isReactive(state) // true
const unrefResult = unref(numRef) // 等价于 numRef.value
</script>
