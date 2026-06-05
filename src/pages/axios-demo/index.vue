<!--
  @file src/pages/axios-demo/index.vue
  @description 【知识点10】Axios封装&网络请求演示
  覆盖：统一封装、请求/响应拦截、GET/POST/PUT/DELETE、Mock数据
-->
<template>
  <div class="space-y-6">
    <section class="demo-section">
      <h3 class="demo-title">Axios 统一封装说明</h3>
      <div class="text-sm space-y-1">
        <p>1. 创建axios实例，配置baseURL和timeout</p>
        <p>2. 请求拦截器：自动携带token</p>
        <p>3. 响应拦截器：统一错误处理、提取data</p>
        <p>4. 封装get/post/put/del通用方法</p>
        <p>5. 配合vite-plugin-mock模拟后端接口</p>
      </div>
    </section>

    <!-- GET请求 -->
    <section class="demo-section">
      <h3 class="demo-title">GET - 获取用户列表</h3>
      <el-button size="small" :loading="loading" @click="fetchUsers">发送GET请求</el-button>
      <div v-if="userList.length" class="mt-2">
        <el-table :data="userList" size="small" border>
          <el-table-column prop="id" label="ID" width="60" />
          <el-table-column prop="name" label="姓名" />
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="age" label="年龄" width="60" />
        </el-table>
      </div>
    </section>

    <!-- POST请求 -->
    <section class="demo-section">
      <h3 class="demo-title">POST - 创建用户</h3>
      <div class="flex gap-2 items-center">
        <input v-model="newUser.name" class="border p-1 rounded" placeholder="姓名" />
        <input v-model="newUser.email" class="border p-1 rounded" placeholder="邮箱" />
        <el-button size="small" type="primary" @click="createNewUser">发送POST请求</el-button>
      </div>
      <p class="text-sm text-gray-500 mt-1">{{ postResult }}</p>
    </section>

    <!-- PUT请求 -->
    <section class="demo-section">
      <h3 class="demo-title">PUT - 更新用户</h3>
      <el-button size="small" type="warning" @click="updateExistUser">
        发送PUT请求(更新ID=1的用户)
      </el-button>
      <p class="text-sm text-gray-500 mt-1">{{ putResult }}</p>
    </section>

    <!-- DELETE请求 -->
    <section class="demo-section">
      <h3 class="demo-title">DELETE - 删除用户</h3>
      <el-button size="small" type="danger" @click="deleteExistUser">
        发送DELETE请求(删除ID=1)
      </el-button>
      <p class="text-sm text-gray-500 mt-1">{{ deleteResult }}</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getUserList, createUser, updateUser, deleteUser } from '@/api/modules/user'
import type { UserItem } from '@/api/modules/user'

const loading = ref<boolean>(false)
const userList = ref<UserItem[]>([])
const postResult = ref<string>('')
const putResult = ref<string>('')
const deleteResult = ref<string>('')

const newUser = reactive({ name: '', email: '' })

/** GET请求示例 */
async function fetchUsers(): Promise<void> {
  loading.value = true
  try {
    const res = await getUserList()
    userList.value = res.data
  } catch (e) {
    console.error('获取用户列表失败', e)
  } finally {
    loading.value = false
  }
}

/** POST请求示例 */
async function createNewUser(): Promise<void> {
  try {
    const res = await createUser({ name: newUser.name, email: newUser.email, age: 25 })
    postResult.value = `创建成功: ${JSON.stringify(res.data)}`
  } catch (e) {
    postResult.value = '创建失败'
  }
}

/** PUT请求示例 */
async function updateExistUser(): Promise<void> {
  try {
    const res = await updateUser(1, { name: '更新后的名字' })
    putResult.value = `更新成功: ${JSON.stringify(res.data)}`
  } catch (e) {
    putResult.value = '更新失败'
  }
}

/** DELETE请求示例 */
async function deleteExistUser(): Promise<void> {
  try {
    const res = await deleteUser(1)
    deleteResult.value = `删除成功: ${res.message}`
  } catch (e) {
    deleteResult.value = '删除失败'
  }
}
</script>
