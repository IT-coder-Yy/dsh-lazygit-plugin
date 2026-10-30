<div align="center">

# DSH LazyGit Plugin

**看得清 Git 历史与变更，点几下就能完成日常 Git 操作。**

集成在 DeepSeek Harness Web 中的可视化 Git 工作台。

![DeepSeek Harness](https://img.shields.io/badge/DeepSeek%20Harness-Developer%20Preview-4f46e5)
![Web profile](https://img.shields.io/badge/profile-Web-0ea5e9)
[![npm version](https://img.shields.io/npm/v/dsh-lazygit-plugin.svg)](https://www.npmjs.com/package/dsh-lazygit-plugin)
[![GitHub repository](https://img.shields.io/badge/GitHub-Repository-181717?logo=github)](https://github.com/IT-coder-Yy/dsh-lazygit-plugin)
[![MIT License](https://img.shields.io/badge/license-MIT-22c55e)](LICENSE)
[![LINUX DO](https://img.shields.io/badge/%E7%A4%BE%E5%8C%BA-LINUX%20DO-f59e0b)](https://linux.do)

[English](README.md) · 简体中文

</div>

## 效果预览

![DSH LazyGit Plugin 变更视图与 Git 快捷操作](./assets/preview.jpg)

## Git 可视化，操作更简单

**仓库情况，一眼看清。** 用提交图浏览历史，点击查看提交详情与文件 Diff，对比已暂存和未暂存改动，在同一工作台掌握分支、标签、贮藏与远程同步状态。

**日常操作，点击完成。** 暂存、提交、切换分支、合并、贮藏、拉取和推送都可直接在界面操作。合并前先预览改动，遇到冲突用内置三方编辑器处理。

| 功能区 | 可以做什么 |
| --- | --- |
| 变更 | 按目录树浏览文件；用双行号和逐块独立横向滚动审阅 Diff，或切换原始 Diff；暂存、取消暂存单个或全部文件；手写多行提交说明，或点击「AI 生成」填写约定式提交说明。 |
| 提交记录 | 浏览提交图、说明、父提交、变更文件及 Diff；修改、撤销或 Revert 提交。 |
| 分支 | 搜索、新建、切换和删除本地分支；查看远程分支与标签。 |
| 合并分支 | 预览待引入提交与文件改动；选择普通合并、仅快进或压缩合并。 |
| 冲突解决 | 对照当前方、传入方与结果；逐块选择一方、保留双方或手动编辑；保存、标记解决并继续。 |
| 贮藏 | 贮藏全部或指定文件，按需包含未跟踪文件；审阅、应用、弹出、删除或从贮藏创建分支。 |
| 同步 | 查看上游和领先/落后数量；获取更新、仅快进拉取、推送、设置上游，以及管理 Rebase。 |
| 建议 | 与独立 Git 助手对话；审阅命令、原因和风险；逐步执行提议或复制后手动执行；分析失败原因并审阅修复建议。 |

工作台底部的命令日志展示通过界面提交的 Git 命令，以及执行中、成功或失败状态。工作台跟随宿主的浅色或深色主题。

## 快速开始

需要 Git、Node.js `^22.19.0 || >=24.0.0` 和 DeepSeek Harness Web。DSH `0.2.2-alpha.2` 需要 Node.js `>=24.9.0`。

如果之前安装过 `dsh-easygit-plugin`，请先停止 Harness 后端，执行 `dsh plugin --profile web remove dsh-easygit-plugin`，再按下方命令安装新包。已有助手会话关联和提议记录会自动导入一次，保留旧存储，也不覆盖新名称下已有的记录；手动挂载的用户还需将旧挂载替换为 [lazygit.cordis.yml](lazygit.cordis.yml) 中的 `lazygit` 条目。重启后刷新浏览器即可。

```sh
npm install -g @deepseek-ai/dsh@0.2.1-rc.5
dsh plugin --profile web add dsh-lazygit-plugin@0.5.2
dsh web
```

打开 Git 仓库对应的会话，点击输入框旁的 **Git** 按钮，即可在原生右侧标签页中打开工作台。

标题栏右侧的 **中文 / EN** 小按钮可切换工作台界面语言，浏览器会记住你的选择。切换时保留当前页签和未提交的输入；文件路径、提交内容与 Git 原始输出保持原文。

日常提交只需：**变更 → 审阅 Diff → 暂存文件 → 填写说明 → 提交 → 同步 → 推送**。新分支可以在推送时设置上游。

如果 pnpm 因包刚发布而暂缓安装，可在 `~/.dsh/profiles/web/pnpm-workspace.yaml` 的现有配置中加入：

```yaml
minimumReleaseAgeExclude:
  - dsh-lazygit-plugin
```

## 常用工作流

### 1. 审阅、提交与推送

在 **变更** 页选择文件查看 Diff，暂存本次改动，填写提交说明或点击 **AI 生成**。检查说明并提交后，进入 **同步 → 推送**；新分支可在推送时设置上游。

AI 生成需先配置模型，会将暂存差异与少量项目背景发送给该模型，生成结果请在提交前检查。

### 2. 切换分支、合并与解决冲突

在 **分支** 页新建或切换分支。手头改动暂不提交时，可先用 **贮藏** 保存；恢复时，**应用** 保留贮藏，**弹出** 在恢复成功后删除贮藏。

工作区干净后，进入 **合并分支**，选择分支、预览改动并选择合并方式。使用远程分支前先获取更新。遇到冲突，在 **冲突解决** 中编辑结果，再按 **保存 → 标记解决 → 继续** 完成处理。

### 3. 修正已有提交

在 **变更 → 提交撤销与修正** 中，可修改最近提交说明、补充已暂存改动，或撤销最近提交并保留修改。这些操作会改写历史，请先确认提交是否已推送。若要用新提交抵消某次提交，在 **提交记录** 中选中它并点击 **Revert 此提交**，操作前需保持工作区与暂存区干净。

### 4. 用 Git 助手处理复杂操作

打开 **建议 → 展开 Git 助手聊天**，描述目标，审阅建议的命令与风险后确认执行。多步提议遇到失败即停止；可让助手分析原因，修复建议同样需要确认后执行。

## 更新、卸载与源码安装

```sh
# 更新 / 卸载
dsh plugin --profile web update dsh-lazygit-plugin
dsh plugin --profile web remove dsh-lazygit-plugin
```

更新后重启 Harness 后端并刷新浏览器，确保 Host 和 Client 均加载新版本。

```sh
# 从源码安装
git clone https://github.com/IT-coder-Yy/dsh-lazygit-plugin.git
cd dsh-lazygit-plugin
npm install
npm run build
dsh plugin --profile web add "${PWD}"
```

也可直接从仓库安装：`dsh plugin --profile web add github:IT-coder-Yy/dsh-lazygit-plugin`。

## 兼容性

| DSH 版本 | 真实服务冒烟测试 | 工作目录读取 |
| --- | --- | --- |
| 此前已验证版本（`0.2.0-rc.1` 至 `0.2.1-rc.3`） | 通过 | 原有会话目录；自 `0.2.1-alpha.2` 起支持切换 worktree |
| `0.2.1-rc.4` | 通过 | 当前工作目录，支持切换 worktree |
| `0.2.1-rc.5` | 通过 | 当前工作目录，支持切换 worktree |
| `0.2.2-alpha.2` | 通过 | 当前工作目录，支持切换 worktree |

## 开发

```sh
npm install
npm run check
npm pack --dry-run --ignore-scripts
```

`npm run check` 执行类型检查、测试与构建一致性检查。Git 集成测试会创建临时仓库，验证仓库操作与失败恢复场景。

CI 另对上表覆盖的全部 DSH 版本（含此前已验证版本）运行 `npm run test:dsh`。本地复现单个版本：

```sh
npm install --prefix /tmp/lazygit-dsh-check @deepseek-ai/dsh@0.2.1-rc.5
DSH_INSTALL_DIR=/tmp/lazygit-dsh-check npm run test:dsh
```

测试使用临时 DSH_HOME 和 Git 仓库，结束后清理，不读取现有会话或调用模型。

## 许可证

[MIT](LICENSE)
