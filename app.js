const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const usePassport = require('./config/passport')
const routes = require('./routes')

// mongoose
require("./config/mongoose");
// app setting
const app = express()
const port = process.env.PORT || 3000

// method-override
app.use(methodOverride('_method'))
// view template
app.engine("hbs", exphbs({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {
    match: (a, b) => a === b,
  },
}))
app.set("view engine", "hbs")
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))
//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
// passport
usePassport(app)
// connect-flash
app.use(flash())

// middleware
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user // 使用者資料,交給 res.user 使用
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


// router
app.use(routes)


app.listen(port, () => {
  console.log(`website is listened on http://localhost:${port}`)
})