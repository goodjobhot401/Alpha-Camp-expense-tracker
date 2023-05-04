const express = require('express')
const router = express.Router()

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {

})

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

// router.post('/register', (req, res) => {
//   res.render
// })

// 登出

module.exports = router