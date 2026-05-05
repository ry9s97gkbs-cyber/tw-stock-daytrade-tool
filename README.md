# 台股零股 / 隔日衝分析工具

一個純前端股票分析工具，輸入台股上市股票代號後，會透過 TWSE 官方日成交資料計算短線指標，輸出隔日衝取向的買進、觀望、風險與出場計畫。

## 功能

- 輸入上市股票代號分析
- 抓取 TWSE 個股日成交資訊
- 計算 MA5 / MA20 / MA60、RSI、MACD、量比、波動
- 產生趨勢、價量、籌碼、基本面、題材、風險分數
- 顯示隔日衝候選清單
- 支援手機與桌面瀏覽

## 部署

### GitHub Pages

1. 到 repository 的 Settings → Pages。
2. Source 選 `Deploy from a branch`。
3. Branch 選 `main`，資料夾選 `/root`。
4. 儲存後等待 GitHub 產生網址。

### Netlify

1. 登入 Netlify。
2. 選 `Add new site` → `Deploy manually`。
3. 把這個 repository 或本資料夾部署上去。
4. 部署完成後會產生公開網址。

## 注意

目前第一版已接 TWSE 上市股票資料。櫃買股票需要再接 TPEx 資料源。分析結果只作為交易輔助，不應替代停損、資金控管與個人判斷。