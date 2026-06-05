/**
 * @file src/api/modules/user.ts
 * @description 用户相关API接口模块
 * 基于统一封装的axios实例，定义用户CRUD接口
 */
import { get, post, put, del } from '@/api/request'

/** 用户数据类型 */
export interface UserItem {
  id: number
  name: string
  email: string
  age: number
  city?: string
}

/**
 * 获取用户列表
 * @returns Promise<用户数组>
 */
export function getUserList() {
  return get<UserItem[]>('/users')
}

/**
 * 获取单个用户
 * @param id - 用户ID
 */
export function getUserById(id: number) {
  return get<UserItem>(`/users/${id}`)
}

/**
 * 创建用户
 * @param data - 用户信息(不含id)
 */
export function createUser(data: Omit<UserItem, 'id'>) {
  return post<UserItem>('/users', data)
}

/**
 * 更新用户
 * @param id - 用户ID
 * @param data - 要更新的字段
 */
export function updateUser(id: number, data: Partial<UserItem>) {
  return put<UserItem>(`/users/${id}`, data)
}

/**
 * 删除用户
 * @param id - 用户ID
 */
export function deleteUser(id: number) {
  return del(`/users/${id}`)
}
