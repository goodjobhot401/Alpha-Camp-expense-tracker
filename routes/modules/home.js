const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

// get'/'
router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .sort({ date: 'asc' })
    .then(records => {
      let totalAmount = 0
      const promise = records.map((record) => {
        return Category.findById(record.categoryId)
          .lean()
          .then(category => {
            const categoryIcon = category.icon
            const expenseData = {
              ...record,
              categoryIcon,
              date: new Date(record.date).toLocaleString().substring(0, 9)
            }
            totalAmount += record.amount
            return expenseData
          })
      })
      Promise.all(promise)
        .then(expenseData => {
          Category.find()
            .sort({ _id: 'asc' })
            .lean()
            .then(list => {
              const listName = list
              res.render('index', { expensesRecord: expenseData, totalAmount, categories: listName })
            })
        })
    })
    .catch(err => res.render('errorPage', { error: err.message }))
})


// get "/filter"
router.post('/filter', (req, res) => {
  const userId = req.user._id
  const categoryId = req.body.categoryId

  if (categoryId === 'all') {
    return res.redirect('/')
  }

  let totalAmount = 0
  let categoryName = ''

  // find categoryName
  Category.findById({ _id: categoryId })
    .lean()
    .then(category => {
      categoryName = category.name
    })
    .catch(err => res.render('errorPage', { error: err.message }))

  // list items and calculate
  Expense.find({ categoryId, userId })
    .lean()
    .then(records => {
      Promise.all(records.map(record => {
        return Category.findById({ _id: record.categoryId })
          .lean()
          .then(category => {
            record.categoryIcon = category.icon
            record.date = record.date.toISOString().slice(0, 10)
            totalAmount += record.amount
            return record
          })
          .catch(err => res.render('errorPage', { error: err.message }))
      }))
        .then(() => {
          Category.find()
            .sort({ _id: 'asc' })
            .lean()
            .then(category => res.render('index', { expensesRecord: records, totalAmount, categoryId, categories: category, categoryName }))
            .catch(err => res.render('errorPage', { error: err.message }))
        })
        .catch(err => res.render('errorPage', { error: err.message }))
    })
    .catch(err => res.render('errorPage', { error: err.message }))
})


module.exports = router