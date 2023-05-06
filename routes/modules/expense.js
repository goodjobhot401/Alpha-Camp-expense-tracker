const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

// 新增頁
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const expenseData = req.body
  const userId = req.user._id

  Category.findOne({ name: expenseData.category })
    .then(category => {
      Expense.create({ ...expenseData, categoryId: category._id, userId })
        .then(() => res.redirect('/'))
    })
    .catch(err => res.render('errorPage', { error: err.message }))
})


// 編輯頁
router.get('/edit/:id', (req, res) => {
  const _id = req.params.id
  // const userId = req.user._id
  Expense.findById(_id)
    .lean()
    .then(record => {
      record.date = record.date.toISOString().substring(0, 10)
      Category.findById(record.categoryId)
        .then(category => {
          record.categoryId = category.name
          res.render('edit', { expensesData: record })
        })
        .catch(err => res.render('errorPage', { error: err.message }))
    })
})

router.put('/edit/:id', (req, res) => {
  const _id = req.params.id
  const record = req.body
  Category.findOne({ name: record.category })
    .then(category => {
      record.categoryId = category._id
      return Expense.findByIdAndUpdate(_id, { ...record })
    })
    .then(() => res.redirect('/'))
    .catch(err => res.render('errorPage', { error: err.message }))
  // return Expense.findOneAndUpdate({ _id }, req.body)
  //   .then(() => res.redirect('/'))
  //   .catch(err => res.render('errorPage', { error: err.message }))
})


// 刪除頁
router.delete('/delete/:id', (req, res) => {
  const _id = req.params.id
  return Expense.findOneAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(err => res.render('errorPage', { error: err.message }))
})


module.exports = router