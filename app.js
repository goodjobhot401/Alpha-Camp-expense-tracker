const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// app setting
const app = express()
const port = 3000

// method-override
app.use(methodOverride('_method'))
// view template
app.engine("hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
// body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// router
app.use(routes)


app.listen(port, () => {
  console.log(`website is listened on http://localhost:${port}`)
})