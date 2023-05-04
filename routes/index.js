const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const expense = require('./modules/expense')
const users = require('./modules/user')

router.use('/expenses', expense)
router.use('/users', users)
router.use('/', home)

module.exports = router