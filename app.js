const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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
  res.render('index')
})


// 新增頁
app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/expenses/new', (req, res) => {
  const expenseData = req.body
})


// 編輯頁
app.get('/edit', (req, res) => {
  res.render('edit')
})




app.listen(port, () => {
  console.log(`website is listened on http://localhost:${port}`)
})