# 2026 公司員工旅遊

活動報名網站與 Google Apps Script 報名資料儲存服務。

## 網站

GitHub Pages：https://joannahcj7.github.io/2026_company_trip/

## 部署

1. `index.html` 與 `2026員工旅遊測試.jpg` 由 GitHub Pages 提供；`Code.gs` 與 `appsscript.json` 則部署至獨立的 Google Apps Script 專案。
2. 安裝 clasp 並登入 Google：`npm install -g @google/clasp`、`clasp login`。首次使用請在 Google Apps Script 使用者設定啟用 Apps Script API。
3. 建立 Apps Script 專案，並只推送 `Code.gs` 與 `appsscript.json`。首次執行 `doGet` 會在部署者的雲端硬碟建立試算表。
4. 部署為網頁應用程式：執行身分選「我」，存取權選「所有人」。完成 Google 授權後，將網頁應用程式 `/exec` 網址填入 `index.html` 的 `SCRIPT_URL`，再推送 GitHub 更新。
5. 以瀏覽器完成兩筆測試報名，確認試算表標題列、資料內容與電話文字格式。

Apps Script 首次開啟時會在部署者的 Google 雲端硬碟建立 `2026_company_trip` 試算表及 `報名資料` 工作表。公開的網頁應用程式網址可供網站訪客提交資料；請只提供給預期的活動參加者。

## 本機預覽

可直接以瀏覽器開啟 `index.html` 檢視頁面；報名功能需先完成 Apps Script 部署並設定 `SCRIPT_URL`。
