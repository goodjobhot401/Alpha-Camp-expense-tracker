const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Expense = require('./models/expense')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


// view template
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))



// 主頁面
app.get('/', (req, res) => {
  Promise.all([
    Expense.find()
      .lean()
      .then(data => {
        const expenseData = data.map(record => ({
          ...record,
          date: record.date.toISOString().split('T')[0]
        }))
        console.log(expenseData)
        const totalAmount = expenseData.reduce((total, record) => total + record.amount, 0)
        res.render('index', { expensesRecord: expenseData, totalAmount })
      })
      .catch(err => console.log(err))
  ])
})


// 新增頁
app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/expenses/new', (req, res) => {
  const expenseData = req.body

  // 接住 打包的資料
  // 將資料新增到資料庫
  // render index 新的資料
  Expense.create(expenseData)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// 編輯頁
app.get('/expense/edit/:id', (req, res) => {
  res.render('edit')
})




app.listen(port, () => {
  console.log(`website is listened on http://localhost:${port}`)
})