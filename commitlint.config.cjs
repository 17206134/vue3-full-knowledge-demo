/**
 * @file commitlint.config.cjs
 * @description Commit Message 规范配置
 * 参考：https://www.conventionalcommits.org/
 *
 * 提交格式：<type>(<scope>): <subject>
 * 示例：
 *   feat(home): 新增项目首页
 *   fix(router): 修复路由跳转bug
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // type 枚举（提交类型必须是以下之一）
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复 bug
        'docs', // 文档变更
        'style', // 代码格式（不影响功能，例如空格、分号、缩进）
        'refactor', // 重构（既不是新增功能也不是修复 bug）
        'perf', // 性能优化
        'test', // 增加测试
        'build', // 构建系统或外部依赖变动（npm/vite 等）
        'ci', // CI 配置变动
        'chore', // 其他不修改 src 或测试的变动
        'revert' // 回滚提交
      ]
    ],
    'type-case': [2, 'always', 'lower-case'], // type 必须小写
    'type-empty': [2, 'never'], // type 不能为空
    'subject-empty': [2, 'never'], // subject 不能为空
    'subject-full-stop': [2, 'never', '.'], // subject 不以句号结尾
    'header-max-length': [2, 'always', 100] // header 最长 100 字符
  }
}
