# Alpha-Camp-expense-tracker

使用 Node.js + Express + MongoDB 製作的記帳 app

可點擊此連結開始使用： [https://mysterious-plateau-54856.herokuapp.com/](https://mysterious-plateau-54856.herokuapp.com/)

## Feature 使用功能
- 使用者註冊帳號後即可使用
- 使用者能查閱、新增、修改、刪除自己建立的支出項目
- 使用者可改使用下拉式選單，查看該類別的記帳總額

## Setting 環境設置
- Node.js
- nodemon
- Express@4.16.4
- MongoDB

## Installation 
1. 開啟 Terminal, Clone 此專案至本機

```
git clone https://github.com/goodjobhot401/Alpha-Camp-expense-tracker.git
```

2. 開啟終端機, 進入檔案夾

```
cd Alpha-Camp-expense-tracker
```

3. 安裝所需套件, 請見 package.json

```
npm i [各種套件及版本]
```

4. 設置 .env 檔

請修改 `.env.example` 成 .env, 並將其中的內容調整成自己的資訊

5. 匯入種子檔案, 當終端機顯示 `recordSeeder is done!` `CategorySeeder is done !` 即表示種子檔案建立完成

```
npm run seed
```

6. 啟動伺服器, 當終端機顯示 `website is listened on http://localhost:3000` `MongoDB connected!` 即表示啟動完成

```
npm run dev
```
