<!--
  @file src/pages/advanced-features/index.vue
  @description 【知识点12】Vue3进阶特性
  覆盖：
  1. script setup 顶层await
  2. 组件v-model自定义（自定义组件双向绑定）
  3. defineModel语法糖（Vue3.4+）
  4. 作用域插槽、具名插槽、动态插槽名
-->
<template>
  <div class="space-y-6">
    <!-- ========== 1. 组件v-model ========== -->
    <section class="demo-section">
      <h3 class="demo-title">1. 自定义组件 v-model</h3>
      <p class="demo-desc">
        组件上使用v-model本质是 :modelValue + @update:modelValue 的语法糖。
        支持多个v-model绑定不同属性
      </p>
      <div class="space-y-2">
        <!-- 单个v-model -->
        <p class="text-sm">父组件inputValue: {{ inputValue }}</p>
        <CustomInput v-model="inputValue" />

        <!-- 多个v-model -->
        <p class="text-sm mt-3">多v-model绑定: title={{ title }}, content={{ content }}</p>
        <CustomInput v-model="title" v-model:content="content" />
      </div>
    </section>

    <!-- ========== 2. defineModel (Vue 3.4+) ========== -->
    <section class="demo-section">
      <h3 class="demo-title">2. defineModel 语法糖 (Vue 3.4+)</h3>
      <p class="demo-desc">
        defineModel简化了自定义v-model的写法，无需手动声明props和emit，一行搞定双向绑定
      </p>
      <p class="text-sm">defineModel值: {{ modelValue }}</p>
      <ModelInput v-model="modelValue" />
    </section>

    <!-- ========== 3. 插槽全示例 ========== -->
    <section class="demo-section">
      <h3 class="demo-title">3. 插槽 - 具名插槽 & 作用域插槽 & 动态插槽名</h3>
      <p class="demo-desc">
        默认插槽：无name的slot；具名插槽：有name的slot；
        作用域插槽：子组件向插槽传递数据，父组件通过v-slot接收
      </p>

      <!-- 具名插槽示例 -->
      <SlotDemo>
        <template #header>
          <h4 class="font-bold text-blue-600">自定义头部（具名插槽 #header）</h4>
        </template>

        <template #default>
          <p>默认插槽内容</p>
        </template>

        <template #footer>
          <p class="text-gray-500">自定义底部（具名插槽 #footer）</p>
        </template>
      </SlotDemo>

      <!-- 作用域插槽示例 -->
      <h4 class="font-semibold text-sm mt-4">作用域插槽：</h4>
      <SlotDemo>
        <template #header>作用域插槽示例</template>
        <!-- 通过v-slot接收子组件传递的数据 -->
        <template #item="{ item, index }">
          <div class="p-1 bg-yellow-50 rounded mb-1">
            自定义渲染第{{ index }}项：{{ item.name }} - {{ item.value }}
          </div>
        </template>
      </SlotDemo>

      <!-- 动态插槽名 -->
      <h4 class="font-semibold text-sm mt-4">动态插槽名：</h4>
      <div class="flex gap-2 mb-2">
        <el-button
          v-for="name in ['header', 'footer']"
          :key="name"
          size="small"
          :type="dynamicSlot === name ? 'primary' : 'default'"
          @click="dynamicSlot = name"
        >
          切换到 #{{ name }}
        </el-button>
      </div>
      <SlotDemo>
        <!-- 动态插槽名：[变量] 语法 -->
        <template #[dynamicSlot]>
          <p class="text-green-600 font-bold">我被插入到了 #{{ dynamicSlot }} 插槽中！</p>
        </template>
      </SlotDemo>
    </section>

    <!-- ========== 4. script setup顶层await ========== -->
    <section class="demo-section">
      <h3 class="demo-title">4. script setup 顶层 await</h3>
      <p class="demo-desc">
        在script setup中可以直接使用await（组件变为异步组件）。
        需要配合Suspense使用，否则组件不会渲染
      </p>
      <pre class="text-xs bg-gray-100 p-2 rounded">
// 在 script setup 中直接使用 await
const data = await fetch('/api/data').then(r => r.json())
// 组件自动成为异步组件，父组件需用Suspense包裹
      </pre>
      <p class="text-xs text-gray-500">
        参见"高级内置组件"页面的Suspense + AsyncChild示例
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomInput from './CustomInput.vue'
import ModelInput from './ModelInput.vue'
import SlotDemo from './SlotDemo.vue'

// 1. 组件v-model
const inputValue = ref<string>('Hello v-model')
const title = ref<string>('标题')
const content = ref<string>('内容')

// 2. defineModel
const modelValue = ref<string>('defineModel值')

// 3. 动态插槽名
const dynamicSlot = ref<string>('header')
</script>
