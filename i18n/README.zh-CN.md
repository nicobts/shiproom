# Shiproom（验证议会）

**一个不会说"你的想法真棒"的 AI 议会。**

向 AI 询问项目评估,得到的往往是奉承。验证议会由七个对抗性席位组成——CTO、CFO、VC、CMO、CEO、你的目标用户、以及主席——每个席位的职责是先找出你的项目**失败**的最强理由,然后才说明什么会改变它的看法。每个席位必须以投票结束:`INVEST`(投入)/ `SHIP_AND_SEE`(发布观察)/ `SHELVE`(搁置),并给出翻转条件和一项具体行动。产出是一份不允许事后软化的判决书,渲染为交互式判决页面。

## 30 秒开始(零安装)

把 [`SHIPROOM.md`](../SHIPROOM.md) 粘贴到任何 AI 对话中(Claude、ChatGPT、Gemini、Cursor、Codex 均可),附上你的项目描述即可。你的智能体会用**你的语言**运行议会——协议本身无需翻译。

## 完整版(适配所有主流编码智能体)

以 skill 形式安装:`npx skills add nicobts/shiproom`(Claude Code、Codex、Cursor、Gemini CLI、OpenCode 等),或在 Claude Code 中运行 `/plugin marketplace add nicobts/shiproom`。在 Claude Code 中:`/shiproom scope` → `/shiproom run` → `/shiproom grill`(质询模式:席位直接向**你**提问,回避两次的问题将被原文记录为"未愈之伤")→ `/shiproom docket`(发布判决)。

## 为什么有效

1. **否决使命** — 每个席位必须先论证失败情形。2. **有据事实库** — 无来源的论断一律剔除。3. **强制交锋** — 每个席位必须点名同意或反对前一席位。4. **预先承诺** — 投票、翻转条件与阈值在知道结果前写定,事后永不修改。5. **一致性警报** — 全票欢呼的运行视为失败的运行。

## 判决实录(Docket)

公开判决库,首条是议会对**自身**的判决:5–1–1,VC 席位投了搁置票——异议即产品在正常工作。欢迎提交你的判决,尤其是 SHELVE 判决。

MIT 许可 · 由 Nicolas 构建([LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/)) · [English](../README.md)
