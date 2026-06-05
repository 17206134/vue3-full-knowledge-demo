# Vue3 全知识点学习 Demo 工程

> 从入门到进阶全覆盖的 Vue3 系统学习项目

## 技术栈

- **Vue 3.5+** - 组合式 API + script setup 语法糖
- **TypeScript** - 严格类型校验
- **Vue Router 4** - 路由管理
- **Pinia 3** - 状态管理（含持久化插件）
- **TailwindCSS 3** - 原子化 CSS 框架
- **Element Plus** - UI 组件库
- **Axios** - HTTP 请求封装
- **ESLint + Prettier** - 代码规范
- **Vite** - 构建工具
- **Mock.js + vite-plugin-mock** - 接口模拟

## 快速启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 代码检查
npm run lint

# 代码格式化
npm run format
```

## 页面学习顺序（推荐）

| 序号 | 页面 | 知识点 | 路由 |
|------|------|--------|------|
| 1 | 模板基础语法 | 插值/指令/事件/条件/循环/表单 | /template-basics |
| 2 | 响应式API | ref/reactive/computed/watch | /reactivity |
| 3 | 生命周期 | onMounted等全部钩子 | /lifecycle |
| 4 | 组件通信 | props/emits/provide/mitt/pinia | /communication |
| 5 | Vue内置use系列 | useTemplateRef/useAttrs/useSlots | /builtin-use |
| 6 | 高级内置组件 | Teleport/Suspense/KeepAlive | /advanced-components |
| 7 | 自定义指令 | v-focus/v-copy/v-throttle | /directives-demo |
| 8 | Pinia状态管理 | state/getters/actions/$patch/持久化 | /pinia |
| 9 | VueRouter4 | 动态路由/守卫/嵌套/编程式导航 | /vue-router |
| 10 | Axios网络请求 | 封装/拦截器/Mock | /axios-demo |
| 11 | 自定义Hook | useWindowSize/useToggle/useFetch | /custom-hooks |
| 12 | 进阶特性 | v-model自定义/defineModel/插槽 | /advanced-features |

## 目录结构

```
src/
├── api/                  # Axios统一封装 + 接口模块
│   ├── request.ts        # axios实例、拦截器、通用方法
│   └── modules/          # 按业务模块分文件
├── assets/               # 静态资源
├── components/           # 通用组件
│   └── layout/           # 布局组件（侧边栏等）
├── directives/           # 全局自定义指令
│   ├── focus.ts          # v-focus 自动聚焦
│   ├── copy.ts           # v-copy 点击复制
│   └── throttle.ts       # v-throttle 节流点击
├── hooks/                # 自定义Hook
│   ├── useWindowSize.ts  # 窗口尺寸
│   ├── useToggle.ts      # 布尔切换
│   ├── useLocalStorage.ts # 本地存储
│   └── useFetch.ts       # 通用请求
├── mock/                 # Mock接口数据
├── pages/                # 12个知识点页面
│   ├── template-basics/  # 模板语法
│   ├── reactivity/       # 响应式API
│   ├── lifecycle/        # 生命周期
│   ├── communication/    # 组件通信
│   ├── builtin-use/      # 内置use系列
│   ├── advanced-components/ # 高级组件
│   ├── directives-demo/  # 自定义指令
│   ├── pinia/            # Pinia
│   ├── vue-router/       # 路由
│   ├── axios-demo/       # 网络请求
│   ├── custom-hooks/     # 自定义Hook
│   └── advanced-features/ # 进阶特性
├── router/               # 路由配置（自动生成侧边栏菜单）
├── store/                # Pinia模块化Store
│   ├── index.ts          # Pinia入口+持久化插件
│   └── modules/          # 按模块拆分
├── styles/               # 全局样式（Tailwind入口）
├── utils/                # 工具函数（mitt事件总线等）
├── App.vue               # 根组件（Layout布局）
└── main.ts               # 应用入口
```

## 特性说明

- **自动侧边导航**：路由配置中的 `meta.group` 字段自动分组渲染菜单
- **代码高密度注释**：每个文件头部说明用途，API旁详细注释
- **TypeScript 严格模式**：所有变量、参数、返回值标注类型
- **TailwindCSS + Element Plus**：样式混合使用，展示两种方案
- **Mock 接口**：无需后端即可运行全部请求示例
