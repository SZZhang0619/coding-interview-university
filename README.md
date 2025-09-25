# Coding Interview University - 程式面試大學

> 基於 [jwasham/coding-interview-university](https://github.com/jwasham/coding-interview-university) 的現代化網頁版本

## 🎯 專案簡介

這是一個互動式的程式面試學習網站，將原本的 README-tw.md 轉換成美觀易懂的網頁介面，提供完整的學習路線和進度追蹤功能。

## ✨ 主要功能

- 📊 **視覺化進度追蹤** - 環形進度圖、類別統計、完成率分析
- 📚 **完整學習內容** - 12 個主要類別，73 個具體學習項目
- 🎯 **互動式體驗** - 可點擊的 checkbox 系統，即時進度更新
- 🌙 **深色模式** - 支援淺色/深色主題切換
- 📱 **響應式設計** - 完美適配桌面、平板和手機
- 💾 **進度匯出** - 支援 JSON 和 Markdown 格式匯出
- 🔄 **GitHub 同步** - 計劃支援與 GitHub repository 同步
- 🗺️ **學習路線** - 提供建議的學習順序和規劃

## 🚀 線上體驗

- **主頁面**: [https://szzhang0619.github.io/coding-interview-university/](https://szzhang0619.github.io/coding-interview-university/)
- **完整版**: [https://szzhang0619.github.io/coding-interview-university/complete.html](https://szzhang0619.github.io/coding-interview-university/complete.html)
- **演示版**: [https://szzhang0619.github.io/coding-interview-university/demo.html](https://szzhang0619.github.io/coding-interview-university/demo.html)

## 📋 學習內容

### 基礎知識
- 📊 演算法複雜度 / Big-O / 漸進分析
- 🏗️ 資料結構 (陣列、Linked List、Stack、Queue、Hash Table)
- 🌳 樹狀結構 (Binary Tree、BST、Heap、AVL、Red-Black Tree)

### 演算法技巧
- 🔄 排序演算法 (泡沫、選擇、插入、合併、快速、堆積等)
- 🔍 搜尋演算法 (二分搜尋、三元搜尋、插值搜尋)
- 🕸️ 圖論 (BFS、DFS、最短路徑、最小生成樹)
- 🧩 動態規劃 (經典 DP、背包問題、LCS)

### 進階主題
- 📝 字串演算法 (KMP、Rabin-Karp)
- 🔢 數學與位元運算
- 🏛️ 系統設計基礎
- 🎯 面試準備技巧
- 📚 學習資源推薦

## 🛠️ 技術實作

### 前端技術
- **HTML5** - 語義化標籤和現代化結構
- **CSS3** - CSS Variables、Flexbox、Grid、動畫效果
- **JavaScript** - ES6+、LocalStorage、模組化設計
- **響應式設計** - Mobile-first 設計原則

### 功能特色
- **狀態管理** - 使用 LocalStorage 持久化進度
- **主題系統** - CSS Variables 實現深色模式
- **進度計算** - 即時統計和視覺化呈現
- **匯出功能** - 支援多種格式的進度匯出
- **動畫效果** - 流暢的過渡和互動動畫

## 📁 專案結構

```
coding-interview-university/
├── public/
│   ├── index.html          # 主頁面 (歡迎頁)
│   ├── complete.html       # 完整學習網站
│   └── demo.html          # 演示版本
├── dist/                  # 建構輸出目錄
├── src/                   # React 原始碼 (備用)
├── assets/               # 靜態資源
└── README.md             # 專案說明
```

## 🎨 設計特色

### 視覺設計
- **現代化介面** - 簡潔美觀的卡片式設計
- **色彩系統** - 一致的色彩搭配和語義化顏色
- **圖示系統** - 豐富的 Emoji 圖示增強視覺效果
- **排版設計** - 清晰的層次結構和閱讀體驗

### 互動體驗
- **微互動** - 按鈕懸停、點擊回饋效果
- **進度動畫** - 流暢的進度條和環形圖動畫
- **狀態回饋** - 即時的視覺狀態更新
- **響應式互動** - 適配不同裝置的互動方式

## 🔧 本地開發

### 環境需求
- Node.js 16+
- pnpm (推薦) 或 npm

### 安裝步驟
```bash
# 複製專案
git clone https://github.com/SZZhang0619/coding-interview-university.git
cd coding-interview-university

# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm run dev

# 建構生產版本
pnpm run build
```

### 開發指令
```bash
pnpm run dev      # 啟動開發伺服器
pnpm run build    # 建構生產版本
pnpm run preview  # 預覽建構結果
```

## 📈 進度追蹤功能

### 統計資訊
- **整體進度** - 完成項目數量和百分比
- **類別進度** - 各學習類別的詳細進度
- **視覺化圖表** - 環形進度圖和進度條
- **學習統計** - 已完成、待完成、類別數量等

### 資料持久化
- 使用 `localStorage` 儲存進度資料
- 支援匯出 JSON 和 Markdown 格式
- 計劃支援 GitHub 同步功能

## 🌟 未來規劃

### 功能擴展
- [ ] GitHub API 整合，實現真正的同步功能
- [ ] 學習時間追蹤和統計
- [ ] 學習筆記和標籤系統
- [ ] 社群功能和進度分享
- [ ] 多語言支援

### 技術優化
- [ ] PWA 支援，離線使用
- [ ] 效能優化和快取策略
- [ ] 無障礙設計改進
- [ ] 單元測試和 E2E 測試

## 🤝 貢獻指南

歡迎提交 Issue 和 Pull Request！

### 貢獻方式
1. Fork 本專案
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交變更 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

## 📄 授權條款

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

## 🙏 致謝

- 感謝 [John Washam](https://github.com/jwasham) 建立了原始的 Coding Interview University
- 感謝所有為繁體中文翻譯做出貢獻的開發者
- 感謝開源社群提供的各種工具和資源

## 📞 聯絡資訊

如有任何問題或建議，歡迎透過以下方式聯絡：

- GitHub Issues: [提交問題](https://github.com/SZZhang0619/coding-interview-university/issues)
- Email: [聯絡信箱]

---

⭐ 如果這個專案對你有幫助，請給個 Star 支持一下！
