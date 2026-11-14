# 課程作業繳交資料

**繳交標題**：國立中山大學 [學號] 電機系 [姓名] 半導體概念圖鑑

## 1. 專案簡介
我設計 Solid State Atlas「半導體概念圖鑑」，以繁體中文整理能帶、摻雜、載子傳輸、霍爾效應、PN 接面、崩潰與 SiC/GaN/Ga₂O₃ 等主題。網站有九篇筆記、分類篩選、搜尋、收藏、已讀紀錄、明暗模式和手機響應式設計。每篇文章都提供核心概念、公式及適用條件、常見迷思與自我檢核。

## 2. GitHub Repository
https://github.com/aa0908801120-sketch/solid-state-atlas

## 3. 網頁網址
https://aa0908801120-sketch.github.io/solid-state-atlas/

**注意：只有完成 GitHub Pages 啟用並實測公開網址後，才能確認這個網址真的可開啟。**

## 4. AGENTS.md
https://github.com/aa0908801120-sketch/solid-state-atlas/blob/main/AGENTS.md

## 5. 如果之後新增頁面或內容，規則如何幫 AI 完成？
在 `AGENTS.md` 中，我詳細定義專案目的、檔案分工、資料欄位格式、UI/文字風格、科學正確性要求、測試方法及完成標準。以新增「蕭特基接觸」為例，AI 先閱讀 `AGENTS.md` 和 `README.md`，依照固定資料結構修改 `data/notes.js`，網站就會自動新增卡片與對應文章頁，不需複製一個獨立 HTML。AI 需執行 `python3 tests/check_site.py`，檢查搜尋、收藏、行動版以及上線後的網址，確保未來擴充仍維持一致的品質。完整操作與驗收範例見 `docs/AI_CONTINUATION_EXAMPLE.md`。

提交前請填寫學號姓名，並確認公開 Repository、AGENTS.md 和 GitHub Pages 均可開啟。
