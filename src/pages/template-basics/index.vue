<!--
  @file src/pages/template-basics/index.vue
  @description 【知识点1】Vue3模板基础语法 - 全面示例页面
  覆盖知识点：
  - 插值表达式 {{ }}
  - v-text / v-html 指令
  - v-bind 单向绑定（简写 :）
  - v-on 事件绑定（简写 @）+ 事件修饰符 + 按键修饰符
  - v-if / v-else-if / v-else 条件渲染
  - v-show 显示隐藏（与v-if的区别）
  - v-for 列表渲染（数组/对象遍历）+ key原理
  - v-model 双向绑定 + 修饰符(.lazy/.number/.trim)
  - 表单绑定：多选/单选/下拉
-->
<template>
  <div class="space-y-6">
    <!-- ==================== 1. 插值表达式 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">1. 插值表达式 {{}}</h3>
      <p class="demo-desc">双大括号语法，可包含JS表达式（非语句）</p>

      <!-- 基础文本插值 -->
      <p>消息：{{ message }}</p>
      <!-- 表达式运算 -->
      <p>计算：{{ 1 + 1 }} = 2</p>
      <!-- 三元表达式 -->
      <p>条件：{{ isActive ? '激活' : '未激活' }}</p>
      <!-- 方法调用 -->
      <p>方法调用：{{ message.split('').reverse().join('') }}</p>
    </section>

    <!-- ==================== 2. v-text / v-html ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">2. v-text / v-html</h3>
      <p class="demo-desc">v-text：覆盖元素文本内容；v-html：解析HTML字符串（注意XSS风险）</p>

      <!-- v-text：等价于{{ }}但会覆盖元素所有内容 -->
      <p v-text="message"></p>
      <!-- v-html：解析HTML标签，注意不要渲染用户输入的内容！ -->
      <p v-html="htmlContent"></p>
      <p class="text-red-500 text-xs">⚠️ v-html有XSS风险，切勿渲染不可信内容</p>
    </section>

    <!-- ==================== 3. v-bind 属性绑定 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">3. v-bind 属性绑定（简写 :）</h3>
      <p class="demo-desc">动态绑定HTML属性，单向数据流（数据→视图）</p>

      <!-- 绑定href -->
      <a :href="url" target="_blank" class="text-blue-500 underline">动态链接</a>
      <!-- 绑定class（对象语法） -->
      <p :class="{ 'text-green-500': isActive, 'font-bold': isActive }">
        动态class绑定（对象语法）
      </p>
      <!-- 绑定class（数组语法） -->
      <p :class="[isActive ? 'text-blue-500' : 'text-gray-500', 'text-sm']">
        动态class绑定（数组语法）
      </p>
      <!-- 绑定style -->
      <p :style="{ color: textColor, fontSize: fontSize + 'px' }">动态style绑定</p>
      <!-- 绑定多个属性（v-bind无参数形式） -->
      <input v-bind="inputAttrs" class="border p-1 rounded" />
      <el-button type="primary" size="small" class="ml-2" @click="isActive = !isActive">
        切换激活状态
      </el-button>
    </section>

    <!-- ==================== 4. v-on 事件绑定 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">4. v-on 事件绑定（简写 @）</h3>
      <p class="demo-desc">事件修饰符：.stop/.prevent/.once/.self；按键修饰符：.enter/.esc/.ctrl</p>

      <!-- 基础点击事件 -->
      <el-button @click="handleClick">基础点击（计数: {{ clickCount }}）</el-button>
      <!-- .once修饰符：只触发一次 -->
      <el-button @click.once="handleOnce" type="warning" class="ml-2">
        只能点一次(.once) {{ onceClicked ? '已点击' : '' }}
      </el-button>
      <!-- .prevent修饰符：阻止默认行为 -->
      <a
        href="https://vuejs.org"
        @click.prevent="handlePrevent"
        class="ml-2 text-blue-500 underline"
      >
        阻止跳转(.prevent)
      </a>
      <!-- 按键修饰符 -->
      <div class="mt-2">
        <input placeholder="按Enter触发" class="border p-1 rounded" @keyup.enter="handleEnter" />
        <input placeholder="按Esc触发" class="border p-1 rounded ml-2" @keyup.esc="handleEsc" />
        <p class="text-sm text-gray-500 mt-1">按键事件消息：{{ keyMessage }}</p>
      </div>
    </section>

    <!-- ==================== 5. v-if / v-show ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">5. v-if / v-else-if / v-else vs v-show</h3>
      <p class="demo-desc">
        v-if：真正的条件渲染，切换时销毁/创建DOM；v-show：CSS
        display切换，初始渲染开销大但切换开销小
      </p>

      <div class="flex gap-2 mb-2">
        <el-button size="small" @click="score = 95">优秀(95)</el-button>
        <el-button size="small" @click="score = 75">良好(75)</el-button>
        <el-button size="small" @click="score = 55">及格(55)</el-button>
        <el-button size="small" @click="score = 30">不及格(30)</el-button>
      </div>

      <!-- v-if链式条件渲染 -->
      <p v-if="score >= 90" class="text-green-500">🎉 优秀！分数：{{ score }}</p>
      <p v-else-if="score >= 70" class="text-blue-500">👍 良好！分数：{{ score }}</p>
      <p v-else-if="score >= 60" class="text-yellow-500">✅ 及格。分数：{{ score }}</p>
      <p v-else class="text-red-500">❌ 不及格。分数：{{ score }}</p>

      <!-- v-show对比 -->
      <div class="mt-3 border-t pt-3">
        <el-button size="small" @click="showBox = !showBox">
          切换v-show（当前: {{ showBox }}）
        </el-button>
        <!-- v-show：元素始终存在于DOM，仅切换display属性 -->
        <div v-show="showBox" class="mt-2 p-2 bg-blue-100 rounded">
          我是v-show控制的元素（检查DOM可看到display:none）
        </div>
      </div>
    </section>

    <!-- ==================== 6. v-for 列表渲染 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">6. v-for 列表渲染</h3>
      <p class="demo-desc">
        遍历数组/对象；key的作用：帮助Vue精确识别节点，提升diff效率（必须唯一且稳定）
      </p>

      <!-- 遍历数组 -->
      <h4 class="font-semibold text-sm mt-2">数组遍历：</h4>
      <ul class="list-disc pl-5">
        <!--
          key原理说明：
          - Vue使用key来判断节点是否可复用
          - 用index做key在列表增删时会导致错误复用（如带状态的组件）
          - 最佳实践：使用数据的唯一id作为key
        -->
        <li v-for="(fruit, index) in fruits" :key="fruit.id">
          {{ index }}. {{ fruit.name }} - ¥{{ fruit.price }}
        </li>
      </ul>

      <!-- 遍历对象 -->
      <h4 class="font-semibold text-sm mt-3">对象遍历（value, key, index）：</h4>
      <ul class="list-disc pl-5">
        <li v-for="(value, key, index) in userObj" :key="key">
          {{ index }} - {{ key }}: {{ value }}
        </li>
      </ul>

      <!-- v-for + v-if 注意事项 -->
      <p class="text-xs text-orange-500 mt-2">
        ⚠️ Vue3中v-if优先级高于v-for，不建议在同一元素上同时使用（用template包裹或computed过滤）
      </p>
    </section>

    <!-- ==================== 7. v-model 双向绑定 ==================== -->
    <section class="demo-section">
      <h3 class="demo-title">7. v-model 双向绑定 + 修饰符</h3>
      <p class="demo-desc">
        v-model = v-bind:value + v-on:input
        的语法糖；修饰符：.lazy(change触发)/.number(转数字)/.trim(去空格)
      </p>

      <!-- 基础v-model -->
      <div class="space-y-2">
        <div>
          <label class="text-sm">基础绑定：</label>
          <input v-model="inputText" class="border p-1 rounded" placeholder="实时同步" />
          <span class="ml-2 text-sm">值：{{ inputText }}</span>
        </div>

        <!-- .lazy修饰符：失焦或按Enter才同步 -->
        <div>
          <label class="text-sm">.lazy修饰符：</label>
          <input v-model.lazy="lazyText" class="border p-1 rounded" placeholder="失焦才同步" />
          <span class="ml-2 text-sm">值：{{ lazyText }}</span>
        </div>

        <!-- .number修饰符：将输入值转为number类型 -->
        <div>
          <label class="text-sm">.number修饰符：</label>
          <input v-model.number="numValue" type="number" class="border p-1 rounded" />
          <span class="ml-2 text-sm">值：{{ numValue }}（类型：{{ typeof numValue }}）</span>
        </div>

        <!-- .trim修饰符：自动去除首尾空格 -->
        <div>
          <label class="text-sm">.trim修饰符：</label>
          <input v-model.trim="trimText" class="border p-1 rounded" placeholder="自动去空格" />
          <span class="ml-2 text-sm">值长度：{{ trimText.length }}</span>
        </div>
      </div>

      <!-- 表单控件v-model -->
      <div class="mt-4 space-y-3 border-t pt-3">
        <h4 class="font-semibold text-sm">表单控件绑定：</h4>

        <!-- 多选框 -->
        <div>
          <label class="text-sm block">多选框(数组)：</label>
          <label v-for="lang in ['Vue', 'React', 'Angular']" :key="lang" class="mr-3">
            <input type="checkbox" :value="lang" v-model="checkedLangs" />
            {{ lang }}
          </label>
          <span class="text-sm text-gray-500">选中：{{ checkedLangs }}</span>
        </div>

        <!-- 单选框 -->
        <div>
          <label class="text-sm block">单选框：</label>
          <label v-for="gender in ['男', '女', '其他']" :key="gender" class="mr-3">
            <input type="radio" :value="gender" v-model="selectedGender" />
            {{ gender }}
          </label>
          <span class="text-sm text-gray-500">选中：{{ selectedGender }}</span>
        </div>

        <!-- 下拉选择 -->
        <div>
          <label class="text-sm block">下拉选择：</label>
          <select v-model="selectedCity" class="border p-1 rounded">
            <option disabled value="">请选择</option>
            <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
          </select>
          <span class="ml-2 text-sm text-gray-500">选中：{{ selectedCity }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  /**
   * 模板基础语法页面 - 逻辑部分
   * 所有响应式数据使用ref/reactive定义
   */
  import { ref, reactive } from 'vue'

  // ========== 1. 插值表达式数据 ==========
  const message = ref<string>('Hello Vue3!')
  const isActive = ref<boolean>(true)

  // ========== 2. v-html数据 ==========
  const htmlContent = ref<string>('<strong style="color: red;">HTML加粗红色文字</strong>')

  // ========== 3. v-bind数据 ==========
  const url = ref<string>('https://cn.vuejs.org')
  const textColor = ref<string>('#42b883')
  const fontSize = ref<number>(16)
  // v-bind批量绑定属性（无参数写法）
  const inputAttrs = reactive({
    type: 'text',
    placeholder: '批量绑定属性',
    disabled: false
  })

  // ========== 4. 事件相关 ==========
  const clickCount = ref<number>(0)
  const onceClicked = ref<boolean>(false)
  const keyMessage = ref<string>('')

  function handleClick(): void {
    clickCount.value++
  }

  function handleOnce(): void {
    onceClicked.value = true
  }

  function handlePrevent(): void {
    alert('链接默认跳转已被.prevent阻止')
  }

  function handleEnter(): void {
    keyMessage.value = '你按下了Enter键！'
  }

  function handleEsc(): void {
    keyMessage.value = '你按下了Esc键！'
  }

  // ========== 5. 条件渲染 ==========
  const score = ref<number>(85)
  const showBox = ref<boolean>(true)

  // ========== 6. v-for数据 ==========
  interface Fruit {
    id: number
    name: string
    price: number
  }

  const fruits = ref<Fruit[]>([
    { id: 1, name: '苹果', price: 5 },
    { id: 2, name: '香蕉', price: 3 },
    { id: 3, name: '橘子', price: 4 }
  ])

  const userObj = reactive<Record<string, string | number>>({
    name: '张三',
    age: 25,
    city: '北京'
  })

  // ========== 7. v-model数据 ==========
  const inputText = ref<string>('')
  const lazyText = ref<string>('')
  const numValue = ref<number>(0)
  const trimText = ref<string>('')
  const checkedLangs = ref<string[]>([])
  const selectedGender = ref<string>('')
  const selectedCity = ref<string>('')
  const cities = ref<string[]>(['北京', '上海', '广州', '深圳'])
</script>
