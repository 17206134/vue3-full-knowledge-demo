/**
 * @file src/mock/user.ts
 * @description Mock接口 - 用户相关
 * 使用vite-plugin-mock拦截请求，返回模拟数据
 * 开发环境无需后端即可调试前端页面
 */
import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'

const mockMethods: MockMethod[] = [
  // GET 获取用户列表
  {
    url: '/api/users',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: 'success',
        data: Mock.mock({
          'list|5-10': [{
            'id|+1': 1,
            'name': '@cname',
            'email': '@email',
            'age|18-60': 1,
            'city': '@city'
          }]
        }).list
      }
    }
  },
  // GET 获取单个用户
  {
    url: '/api/users/:id',
    method: 'get',
    response: ({ query }: { query: Record<string, string> }) => {
      return {
        code: 0,
        message: 'success',
        data: {
          id: query.id || 1,
          name: Mock.mock('@cname'),
          email: Mock.mock('@email'),
          age: Mock.mock('@integer(18, 60)')
        }
      }
    }
  },
  // POST 创建用户
  {
    url: '/api/users',
    method: 'post',
    response: ({ body }: { body: Record<string, unknown> }) => {
      return {
        code: 0,
        message: '创建成功',
        data: { id: Mock.mock('@integer(100, 999)'), ...body }
      }
    }
  },
  // PUT 更新用户
  {
    url: '/api/users/:id',
    method: 'put',
    response: ({ body }: { body: Record<string, unknown> }) => {
      return {
        code: 0,
        message: '更新成功',
        data: body
      }
    }
  },
  // DELETE 删除用户
  {
    url: '/api/users/:id',
    method: 'delete',
    response: () => {
      return {
        code: 0,
        message: '删除成功',
        data: null
      }
    }
  }
]

export default mockMethods
