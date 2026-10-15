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

![DSH LazyGit Plugin 变更视图与 Git 快捷操作](./assets/preview.png)

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

需要 Git、Node.js `^22.19.0 || >=24.0.0` 和 DeepSeek Harness Web。

如果之前安装过 `dsh-easygit-plugin`，请先停止 Harness 后端，执行 `dsh plugin --profile web remove dsh-easygit-plugin`，再按下方命令安装新包。已有助手会话关联和提议记录会自动导入一次，保留旧存储，也不覆盖新名称下已有的记录；手动挂载的用户还需将旧挂载替换为 [lazygit.cordis.yml](lazygit.cordis.yml) 中的 `lazygit` 条目。重启后刷新浏览器即可。

```sh
npm install -g @deepseek-ai/dsh@0.2.1-alpha.3
dsh plugin --profile web add dsh-lazygit-plugin@0.5.1
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

### 审阅变更并生成提交说明

在 **变更** 页的已暂存或未暂存目录树中选择文件，查看对应 Diff。暂存本次要提交的改动后，手动填写说明或点击 **AI 生成**。手动说明支持标题与多行正文。

AI 生成使用主会话当前选择的模型，未选择时使用默认模型。它会将暂存差异及限量项目背景（已跟踪文件名、近期提交标题、暂存版本的 README 与包元数据）发送给该模型，生成一行中文约定式提交说明，供你检查后提交。使用前需配置模型并暂存改动；差异过大时需分批暂存。生成期间暂存区发生变化时，需要重新生成。

### 使用 Git 助手处理复杂操作

打开 **建议 → 展开 Git 助手聊天**。助手初次继承主会话背景与模型选择，后续增量同步对话背景，模型设置可独立调整；仅同步背景不会自动启动助手对话。

描述目标后，先审阅建议中的命令与风险，再在工作台点击执行。助手可以读取仓库状态、Diff 和登记提议，修改仓库需要你点击执行。多步提议按顺序执行，任一步失败即停止；高风险提议还需勾选风险确认。仓库或会话工作目录变化后，待执行的旧提议会失效。

也可复制命令后手动执行，再点击 **重新检测** 检查受支持的预期结果。仅检测到仓库变化不代表命令成功；已经完成或失败的提议不能重复执行，重试需生成新提议。

操作失败时，工作台保留命令输出和仓库诊断。可识别的情况会提供修正提议，需要助手分析的失败会自动交给 Git 助手处理；你可以取消、重新分析，或展开聊天补充信息。修复命令仍需你确认后执行。

### 修改、撤销与 Revert 提交

在 **变更 → 提交撤销与修正** 中操作最近提交，或在 **提交记录** 中点击具体提交。

- **修改最近提交说明**：只修改说明，保留暂存区与工作区改动。
- **补充最近提交**：将全部已暂存改动加入最近提交，保留原说明。
- **撤销最近提交但保留修改**：通过 `reset --soft` 退回第一父提交；根提交不支持此操作。
- **Revert 此提交**：创建反向提交，要求工作区与暂存区干净。合并提交需选择主线父提交；发生冲突后可在“冲突解决”中继续、中止或跳过。

这些操作均需确认。修改与撤销最近提交会改写本地历史，可能影响已推送提交；插件不会自动强制推送。分支、HEAD 或暂存区在读取后变化时，需刷新后重新确认。

### 预览并合并分支

打开 **合并分支**，选择本地或已获取的远程分支，先预览待引入提交与文件改动，再选择普通合并、仅快进或压缩合并。压缩合并先生成暂存结果，再由你完成为一个提交。

合并要求工作区干净。远程源使用本地已获取的引用，需要最新数据时先获取更新。预览展示源分支相对共同祖先的改动，不预判冲突，也不等于最终合并结果；分支变化后需重新预览。尚未完成的普通或压缩合并可以中止，已完成的合并不能通过中止撤销。

### 可视化解决冲突

在 **冲突解决** 中对照当前方、传入方与可编辑结果，结合行号和提交引用逐块选择一方、保留双方或手动修改，然后 **保存 → 标记解决 → 继续**。Merge、Rebase、Cherry-pick 与 Revert 共用这一流程；中止与支持的跳过操作需确认。

Rebase 中，当前方是目标分支及已重放提交，传入方是正在重放的提交。未清除的冲突标记会阻止解决，文件变化会使旧快照失效。二进制冲突支持整方选择；文本编辑每个版本最多支持 48 KiB。更大文件、符号链接与子模块请使用外部工具处理。未保存草稿仅在当前页面保留，刷新后不会恢复。

### 用 Stash 暂存手头工作

在 **贮藏** 页选择全部或指定文件，按需包含未跟踪文件；按文件贮藏会保留其他文件的改动。恢复前可以先审阅内容：**应用** 保留贮藏，**弹出** 仅在恢复成功后删除贮藏。发生冲突时保留贮藏并提供冲突解决入口。从贮藏创建分支要求工作区干净，新分支从贮藏原始提交开始。

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
| `0.2.0-rc.1` | 通过 | 原有会话目录 |
| `0.2.0-rc.2` | 通过 | 原有会话目录 |
| `0.2.1-alpha.1` | 通过 | 原有会话目录 |
| `0.2.1-alpha.2` | 通过 | 当前工作目录，支持切换 worktree |
| `0.2.1-alpha.3` | 通过 | 当前工作目录，支持切换 worktree |

## 开发

```sh
npm install
npm run check
npm pack --dry-run --ignore-scripts
```

`npm run check` 执行类型检查、测试与构建一致性检查。Git 集成测试会创建临时仓库，验证仓库操作与失败恢复场景。

CI 另对上表全部 DSH 版本运行 `npm run test:dsh`。本地复现单个版本：

```sh
npm install --prefix /tmp/lazygit-dsh-check @deepseek-ai/dsh@0.2.1-alpha.3
DSH_INSTALL_DIR=/tmp/lazygit-dsh-check npm run test:dsh
```

测试使用临时 DSH_HOME 和 Git 仓库，结束后清理，不读取现有会话或调用模型。

## 许可证

[MIT](LICENSE)
