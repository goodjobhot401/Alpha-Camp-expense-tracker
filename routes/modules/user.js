const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

// 登入
router.get('/login', (req, res) => {
  res.render('login')
})

// 經過 middleware, 驗證 request 登入狀態
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// 註冊
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      console.log('此信箱已經被註冊過')
      res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/login'))
        .catch(err => console.log(err))
    }
  })
    .catch(err => console.log(err))
})

// 登出

module.exports = router