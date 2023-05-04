const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/user')
const { authenticator } = require('../middleware/auth')

router.use('/expenses', authenticator, expense)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router