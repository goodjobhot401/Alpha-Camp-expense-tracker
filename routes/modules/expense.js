const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

// 新增頁
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/new', (req, res) => {
  const expenseData = req.body
  Expense.create(expenseData)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// 編輯頁
router.get('/edit/:id', (req, res) => {
  const _id = req.params.id

  return Expense.findOne({ _id })
    .lean()
    .then(expensesData => res.render('edit', { expensesData }))
    .catch(err => console.log(err))
})

router.put('/edit/:id', (req, res) => {
  const _id = req.params.id

  return Expense.findOneAndUpdate({ _id }, req.body)
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


// 刪除頁
router.delete('/delete/:id', (req, res) => {
  const _id = req.params.id

  return Expense.findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})


module.exports = router