<!--
  @file src/pages/vue-router/Nested.vue
  @description 嵌套路由子页面
-->
<template>
  <div class="p-4 bg-green-50 rounded border mt-3">
    <h3 class="font-bold">嵌套子路由页面</h3>
    <p class="text-sm">我是通过children配置渲染在父路由的router-view中的</p>
    <el-button size="small" class="mt-2" @click="$router.back()">返回父路由</el-button>
  </div>
</template>
