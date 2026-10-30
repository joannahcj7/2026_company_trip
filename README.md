# 2026 公司員工旅遊

活動報名網站與 Google Apps Script 報名資料儲存服務。

## 部署

1. 將 `index.html`、`2026員工旅遊測試.jpg`、`Code.gs` 和 `appsscript.json` 部署至 GitHub Pages。
2. 在 Google Apps Script 建立獨立專案，加入 `Code.gs`，並於專案設定啟用 `appsscript.json` 資訊清單後貼入本專案的 manifest。
3. 儲存專案後，部署為網頁應用程式：執行身分選「我」，存取權選「所有人」。授權後開啟部署網址，確認報名試算表已建立。
4. 將部署網址填入 `index.html` 的 `SCRIPT_URL`，重新推送網站。
5. 以瀏覽器完成兩筆測試報名，確認試算表標題列、資料內容與電話文字格式。

Apps Script 首次開啟時會在部署者的 Google 雲端硬碟建立 `2026_company_trip` 試算表及 `報名資料` 工作表。公開的網頁應用程式網址可供網站訪客提交資料；請只提供給預期的活動參加者。

## 本機預覽

可直接以瀏覽器開啟 `index.html` 檢視頁面；報名功能需先完成 Apps Script 部署並設定 `SCRIPT_URL`。
