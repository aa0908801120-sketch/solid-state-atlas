# GitHub Pages 發布與疑難排解

本專案是原生 HTML、CSS、JavaScript 靜態網站，首頁入口位於 Repository 根目錄 `index.html`。

## GitHub Pages 設定

1. 開啟 `Settings → Pages`。
2. 在 `Build and deployment` 選擇 `Deploy from a branch`。
3. Branch 選 `main`、Folder 選 `/(root)`，儲存。
4. 到 `Actions` 確認 Pages build and deployment 工作流程成功。
5. 在 Pages 設定中的 `Visit site` 開啟實際網址。

預期的專案網址：`https://aa0908801120-sketch.github.io/solid-state-atlas/`。此網址必須在 Pages 成功部署後才可使用，不能把網址格式視為已發布的證據。

## 若出現 404

- 檢查 Repository 是否為 Public、`main` 根目錄是否有 `index.html`。
- 檢查 `Settings → Pages` 是否顯示 `Your site is live at...`，以及 `Actions` 是否存在成功的 Pages deployment。
- 若沒有建立工作流程，請在 GitHub 網站手動修改本文件並提交到 `main`，以使用具有儲存庫管理權限的帳號觸發部署。
- 若仍未發布，請確認 GitHub 帳號電子郵件已完成驗證及 Repository 的 Actions 設定允許工作流程運作。
- 網站發布後再使用無痕視窗測試首頁、文章頁、搜尋、收藏、已讀與手機版。

參考：GitHub Docs — Creating a GitHub Pages site；Troubleshooting 404 errors for GitHub Pages sites。
