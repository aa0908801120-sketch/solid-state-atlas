# Solid State Atlas ｜半導體概念圖鑑

一個適合半導體物理／固態電子初學者的繁體中文學習網站。將能帶、載子、PN 接面與寬能隙材料拆解成可搜尋、可收藏、可檢核的精簡筆記，並以 `AGENTS.md` 記錄完整的 AI 協作規則，讓專案後續能持續擴充。

## 專案功能

- 9 篇半導體基礎與進階筆記、4 個主題分類、關鍵字搜尋。
- 書籤收藏、完成閱讀標記、閱讀篇數統計；偏好儲存在本機瀏覽器。
- 淺色／深色模式，支援手機、平板、桌機。
- 每篇包含核心觀念、公式及適用條件、常見迷思、自我檢核。
- 每篇筆記有固定 URL，例如 `#/note/pn-junction`，方便分享與繼續擴充。
- 不需登入、後端、npm、資料庫或 API，適合 GitHub Pages。

## 檔案結構

```text
solid-state-atlas/
├── index.html                  # 唯一網頁入口
├── .nojekyll                   # 直接部署靜態資源
├── AGENTS.md                   # AI 工作規則：本作業核心
├── README.md                   # 專案介紹與部署教學
├── assets/
│   ├── app.js                  # 搜尋、收藏、已讀、路由
│   ├── styles.css              # RWD 與雙主題樣式
│   └── favicon.svg             # 網站圖示
├── data/
│   └── notes.js                # 所有筆記的單一資料來源
├── docs/
│   ├── AI_CONTINUATION_EXAMPLE.md
│   └── SUBMISSION_TEMPLATE.md
└── tests/
    └── check_site.py
```

## 本機執行

方式一：使用 Python（推薦）

```bash
python3 -m http.server 8000
```

瀏覽 `http://localhost:8000`。停止時按 `Ctrl+C`。

方式二：直接以瀏覽器開啟 `index.html`；本站是無編譯靜態網站，在一般瀏覽器也能運作。

## 測試

在根目錄執行：

```bash
python3 tests/check_site.py
```

檢查必需檔案、資料欄位、唯一 ID、分類、筆記數量、腳本語法與相對資源路徑。另應以瀏覽器手動確認搜尋／收藏／路由／手機版／雙主題；自動檢查**不能取代**真正的瀏覽器驗證。

## 上傳 GitHub 並啟用 GitHub Pages

1. 登入 GitHub，在右上角 `+` 選 `New repository`。
2. Repository 可命名為 `solid-state-atlas`，選 `Public`，建立儲存庫。
3. 上傳本專案資料夾**內部的全部檔案與資料夾**到 Repository 根目錄；確保 `index.html` 位於儲存庫最外層。
4. 進入 `Settings → Pages`，在 `Build and deployment` 選 `Deploy from a branch`。
5. 指定 `main` 分支及 `/(root)`，按 `Save`。
6. 發布成功後，在 Pages 設定頁面找到 `Visit site`。
7. 用無痕視窗確認首頁、文章路由、搜尋和手機版可用，再繳交連結。

實際網址由 GitHub 帳號和 Repository 名稱決定，通常形式為：

- Repository：`https://github.com/<你的帳號>/solid-state-atlas`
- 網頁：`https://<你的帳號>.github.io/solid-state-atlas/`

請以 Pages 設定中的實際網址為準，不要將範例直接當成已上線的連結。

## 如何讓 AI 繼續完成？

將整個 GitHub Repository 提供給能讀取檔案的 AI 工具，要求它**先讀 `AGENTS.md` 和 `README.md`**，再讓它編輯 `data/notes.js`。新增筆記時，系統會自動顯示新卡片、搜尋結果、文章頁、總篇數與下一篇連結；通常不必修改 HTML/CSS。

完整的 Prompt 和驗收方式請參考 [`docs/AI_CONTINUATION_EXAMPLE.md`](./docs/AI_CONTINUATION_EXAMPLE.md)。

## 使用與限制

- 學習與課程示範用途，不取代教材、實驗量測或專業設計規格。
- 科學公式依其標註的理想條件與近似適用，不應直接套用到所有元件。
- 收藏／已讀不會跨瀏覽器或裝置同步。清除瀏覽器網站資料可能使記錄消失。
- 網站不提供線上編輯功能；新增筆記須修改專案檔案，再推送到 GitHub。

## 開發與協作

網站以一致、正確、可擴充為優先。**任何 AI 或人類貢獻者請先閱讀 [`AGENTS.md`](./AGENTS.md)**。本專案刻意讓知識資料與 UI 程式碼分離，以降低新增內容時破壞既有功能的風險。