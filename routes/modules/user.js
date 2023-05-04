const express = require('express')
const router = express.Router()
const User = require('../../models/user')

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