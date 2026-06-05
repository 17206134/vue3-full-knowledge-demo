<!--
  @file src/pages/vue-router/Detail.vue
  @description 动态路由参数详情页 - 演示/:id取值
-->
<template>
  <div class="p-4 bg-white rounded border mt-3">
    <h3 class="font-bold text-lg">详情页</h3>
    <p class="text-sm">动态路由参数 id: {{ route.params.id }}</p>
    <p class="text-sm">完整路径: {{ route.fullPath }}</p>
    <el-button size="small" class="mt-2" @click="router.back()">返回</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
</script>
