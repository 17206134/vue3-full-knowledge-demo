# Git 提交规范（Commit Convention）

> 本项目使用 **Husky + lint-staged + Commitlint** 强制约束代码提交流程，提交不规范会被自动拦截。

---

## 一、提交流程钩子

| 钩子         | 工具            | 作用                                                         |
| ------------ | --------------- | ------------------------------------------------------------ |
| `pre-commit` | **lint-staged** | 仅对暂存（staged）文件运行 ESLint 自动修复 + Prettier 格式化 |
| `commit-msg` | **commitlint**  | 校验提交信息是否符合 Conventional Commits 规范               |

```text
git commit -m "..."
   │
   ├─► [pre-commit] 暂存文件 lint + format
   │        │
   │        ├─ 通过 ✅ → 继续
   │        └─ 失败 ❌ → 阻止提交，显示错误
   │
   └─► [commit-msg] 校验提交信息格式
            │
            ├─ 通过 ✅ → 提交成功
            └─ 失败 ❌ → 阻止提交，提示规范
```

---

## 二、Commit Message 格式

```text
<type>(<scope>): <subject>

<body>

<footer>
```

- **type**（必填）：提交类型，详见下表
- **scope**（可选）：影响范围，如 `home`、`router`、`pinia`
- **subject**（必填）：简短描述，不超过 100 字符，**不以句号结尾**
- **body**（可选）：详细描述
- **footer**（可选）：BREAKING CHANGE 或 issue 关联，如 `Closes #123`

### type 枚举

| type       | 含义                              | 示例                                |
| ---------- | --------------------------------- | ----------------------------------- |
| `feat`     | ✨ 新功能                         | `feat(home): 新增项目首页`          |
| `fix`      | 🐛 修复 bug                       | `fix(router): 修复嵌套路由跳转异常` |
| `docs`     | 📝 文档变更                       | `docs: 更新 README 启动说明`        |
| `style`    | 💄 代码格式（不影响功能）         | `style: 统一缩进为 2 空格`          |
| `refactor` | ♻️ 重构（既不是新功能也不是修复） | `refactor(store): 抽离 user 模块`   |
| `perf`     | ⚡ 性能优化                       | `perf(list): 列表渲染加 v-memo`     |
| `test`     | ✅ 增加/修改测试                  | `test(hooks): 补充 useFetch 测试`   |
| `build`    | 📦 构建系统/外部依赖变动          | `build: 升级 vite 到 6.4`           |
| `ci`       | 🎡 CI 配置变动                    | `ci: 新增 GitHub Actions`           |
| `chore`    | 🔨 其他杂项变动                   | `chore: 调整 .gitignore`            |
| `revert`   | ⏪ 回滚提交                       | `revert: 回滚 a1b2c3`               |

---

## 三、规范示例

### ✅ 正确

```text
feat(home): 新增项目首页和 GitHub 入口
fix(axios): 修复 token 过期未刷新的 bug
docs(commit): 添加提交规范说明文档
chore: 配置 husky + commitlint
build: 添加 lint-staged 依赖
```

### ❌ 错误

```text
update something               # 缺 type
Feat: add home                 # type 必须小写
feat 新增首页                   # 缺冒号
feat(home): 新增首页.           # subject 不能以句号结尾
新增首页                        # 完全不符合规范
```

---

## 四、相关文件

| 文件                                   | 说明                                    |
| -------------------------------------- | --------------------------------------- |
| `.husky/pre-commit`                    | pre-commit 钩子脚本（运行 lint-staged） |
| `.husky/commit-msg`                    | commit-msg 钩子脚本（运行 commitlint）  |
| `commitlint.config.cjs`                | commitlint 规则配置                     |
| `package.json` 中的 `lint-staged` 字段 | 暂存文件检查命令                        |
| `.eslintrc.cjs`                        | ESLint 规则                             |
| `.prettierrc`                          | Prettier 格式化规则                     |

---

## 五、本地启用钩子

新克隆项目后，安装依赖时会自动通过 `prepare` 脚本启用 husky 钩子：

```bash
npm install
```

如果钩子未生效，可手动执行：

```bash
npx husky init
```

---

## 六、紧急绕过（不推荐）

极特殊情况可以跳过钩子（**慎用**）：

```bash
git commit -m "feat: xxx" --no-verify
```

> ⚠️ 团队协作中请勿滥用，提交后建议立即补一次符合规范的 amend。
