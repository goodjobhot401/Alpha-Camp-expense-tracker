const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  const userId = req.user._id
  Expense.find({ userId })
    .lean()
    .sort({ date: 'desc' })
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
      Promise.all(promise).then(expenseData => res.render('index', { expensesRecord: expenseData, totalAmount }))
    })
    .catch(err => res.render('errorPage', { error: err.message }))
  // Promise.all([
  //   Expense.find({ userId })
  //     .lean()
  //     .sort({ _id: 'asc' })
  //     .then(data => {
  //       const expenseData = data.map(record => ({
  //         ...record,
  //         date: record.date.toISOString().split('T')[0]
  //       }))
  //       // console.log(expenseData)
  //       const totalAmount = expenseData.reduce((total, record) => total + record.amount, 0)
  //       res.render('index', { expensesRecord: expenseData, totalAmount })
  //     })
  //     .catch(err => res.render('errorPage', { error: err.message }))
  // ])
})


module.exports = router