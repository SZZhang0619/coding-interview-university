# 🚀 GitHub Pages 部署指南

## 📦 部署檔案

您已獲得完整的 Angular 20 專案，包含：
- **完整原始碼** - 所有 Angular 組件和服務
- **生產版本** - 已建構的靜態檔案
- **自動部署** - GitHub Actions 工作流程
- **Git 歷史** - 完整的版本控制

## 🎯 部署步驟

### 1. 上傳到 GitHub Repository

#### 方法一：使用 Git 命令 (推薦)
```bash
# 解壓縮專案
unzip coding-interview-university-angular-deploy.zip
cd coding-interview-university-angular

# 推送到 GitHub (需要認證)
git push -u origin main
```

#### 方法二：手動上傳
1. 解壓縮 `coding-interview-university-angular-deploy.zip`
2. 前往 https://github.com/SZZhang0619/coding-interview-university
3. 刪除現有檔案 (如果有)
4. 上傳所有解壓縮的檔案
5. 提交變更

### 2. 設定 GitHub Pages

1. **前往 Repository Settings**
   - 訪問 https://github.com/SZZhang0619/coding-interview-university
   - 點擊 "Settings" 標籤

2. **設定 Pages**
   - 左側選單找到 "Pages"
   - Source 選擇 "GitHub Actions"
   - 儲存設定

3. **啟用 Actions**
   - 前往 "Actions" 標籤
   - 如果需要，點擊 "I understand my workflows, go ahead and enable them"

### 3. 觸發自動部署

推送程式碼後，GitHub Actions 會自動：
1. 安裝 Node.js 和 pnpm
2. 安裝專案依賴
3. 建構 Angular 應用程式
4. 部署到 GitHub Pages

## 🌐 部署後的網址

部署完成後，您的網站將可在以下網址訪問：
- **主網站**: https://szzhang0619.github.io/coding-interview-university/

## 📊 部署狀態檢查

### 檢查 Actions 狀態
1. 前往 GitHub repository
2. 點擊 "Actions" 標籤
3. 查看最新的工作流程執行狀態
4. 綠色勾號表示部署成功

### 檢查 Pages 設定
1. 前往 Settings → Pages
2. 確認顯示綠色的部署網址
3. 點擊網址測試是否正常運作

## 🔧 故障排除

### 常見問題

#### 1. Actions 執行失敗
**解決方案**:
- 檢查 `.github/workflows/deploy.yml` 檔案是否正確
- 確認 `package.json` 中的腳本命令正確
- 查看 Actions 日誌中的錯誤訊息

#### 2. 頁面顯示 404
**解決方案**:
- 確認 Pages 設定為 "GitHub Actions"
- 檢查 `base-href` 設定是否正確
- 等待幾分鐘讓 DNS 更新

#### 3. 樣式或功能異常
**解決方案**:
- 檢查瀏覽器開發者工具的錯誤訊息
- 確認所有資源路徑正確
- 清除瀏覽器快取重新載入

### 手動部署 (備用方案)

如果自動部署失敗，可以手動部署：

```bash
# 1. 建構專案
pnpm run build

# 2. 使用 gh-pages 套件部署
npx angular-cli-ghpages --dir=dist/coding-interview-university-angular
```

## 🎨 自訂設定

### 修改網站標題
編輯 `src/index.html`:
```html
<title>您的自訂標題</title>
```

### 修改 base-href
編輯 `angular.json`:
```json
"build": {
  "options": {
    "baseHref": "/your-repo-name/"
  }
}
```

### 修改部署分支
編輯 `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches: [ main, master, your-branch ]
```

## 📈 效能監控

### 建構分析
```bash
# 分析 bundle 大小
pnpm run build --stats-json
npx webpack-bundle-analyzer dist/coding-interview-university-angular/stats.json
```

### Lighthouse 測試
1. 開啟部署後的網站
2. 按 F12 開啟開發者工具
3. 前往 "Lighthouse" 標籤
4. 執行效能測試

## 🔄 持續部署

### 自動部署觸發條件
- 推送到 `main` 分支
- 建立 Pull Request 到 `main` 分支
- 手動觸發 (在 Actions 頁面)

### 部署流程
1. **建構階段** (約 2-3 分鐘)
   - 安裝依賴
   - TypeScript 編譯
   - Angular 建構

2. **部署階段** (約 1 分鐘)
   - 上傳到 GitHub Pages
   - DNS 更新

3. **總時間**: 約 3-5 分鐘

## 🎯 最佳實踐

### 開發工作流程
1. 本地開發和測試
2. 提交到功能分支
3. 建立 Pull Request
4. 合併到 main 分支
5. 自動部署到 GitHub Pages

### 版本管理
- 使用語義化版本號 (Semantic Versioning)
- 為重要版本建立 Git tags
- 維護 CHANGELOG.md

### 效能優化
- 定期更新依賴套件
- 監控 bundle 大小
- 使用 Lighthouse 測試效能

## 🎉 部署完成檢查清單

- [ ] 程式碼已推送到 GitHub
- [ ] GitHub Pages 已啟用
- [ ] Actions 工作流程執行成功
- [ ] 網站可正常訪問
- [ ] 所有功能正常運作
- [ ] 響應式設計在不同裝置上正常
- [ ] 深色模式切換正常
- [ ] 進度追蹤功能正常

完成以上步驟後，您的 Angular 20 版本 Coding Interview University 就成功部署到 GitHub Pages 了！🚀