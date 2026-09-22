# Shiproom(検証評議会)

**「いいアイデアですね」と言わない AI 評議会。**

AI にプロジェクトの評価を求めると、返ってくるのはお世辞ばかり。Shiproom は七つの敵対的な議席 — CTO、CFO、VC、CMO、CEO、あなたのターゲット顧客、そして議長 — で構成され、各議席はまずあなたのプロジェクトが**失敗する**最も強い理由を示し、その後に何があれば考えを変えるかを述べる義務を負います。全議席は投票で締めくくります:`INVEST`(投資)/ `SHIP_AND_SEE`(出して様子を見る)/ `SHELVE`(棚上げ)。加えて「翻意条件」と「次の一手」を必ず提示。出力は後から和らげることを許さない評決書で、インタラクティブな評決ページとして描画されます。

## 30 秒で開始(インストール不要)

[`SHIPROOM.md`](../SHIPROOM.md) を任意の AI チャット(Claude、ChatGPT、Gemini、Cursor、Codex)に貼り付け、プロジェクトの説明を添えるだけ。エージェントは**あなたの言語**で評議会を実行します — プロトコル自体に翻訳は不要です。

## フル版(主要なコーディングエージェントすべてに対応)

スキルとしてインストール:`npx skills add nicobts/shiproom`(Claude Code、Codex、Cursor、Gemini CLI、OpenCode など)、または Claude Code で `/plugin marketplace add nicobts/shiproom`。Claude Code では:`/shiproom scope` → `/shiproom run` → `/shiproom grill`(尋問モード:議席が**あなた**に直接質問。二度はぐらかした質問は「open wound(未回答の傷)」として原文のまま記録)→ `/shiproom docket`(評決の公開)。

## なぜ機能するのか

1. **キル・マンデート** — 各議席はまず失敗のケースを論証。2. **出典付きファクトベース** — 出典なき主張は棄却。3. **強制的な応酬** — 各議席は前の議席に名指しで賛否を表明。4. **事前コミットメント** — 投票・翻意条件・閾値は結果を知る前に確定し、以後編集しない。5. **全会一致アラーム** — 満場一致の称賛は失敗した実行とみなす。

## Docket(評決記録)

公開評決集。第一号は評議会が**自分自身**に下した評決:5–1–1、VC 議席は SHELVE に投票 — 反対票こそがプロダクトが機能している証拠。あなたの評決、特に SHELVE 評決の投稿を歓迎します。

MIT ライセンス · 作者 Nicolas([LinkedIn](https://www.linkedin.com/in/nicolas-bossi-26a326b3/)) · [English](../README.md)
