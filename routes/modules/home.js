const express = require('express')
const router = express.Router()
const Expense = require('../../models/expense')

router.get('/', (req, res) => {
  Promise.all([
    Expense.find()
      .lean()
      .then(data => {
        const expenseData = data.map(record => ({
          ...record,
          date: record.date.toISOString().split('T')[0]
        }))
        // console.log(expenseData)
        const totalAmount = expenseData.reduce((total, record) => total + record.amount, 0)
        res.render('index', { expensesRecord: expenseData, totalAmount })
      })
      .catch(err => console.log(err))
  ])
  // , [
  //   Category.find().lean()
  //     .then()
  //   .then(categories => {
  //     Expense.find().lean()
  //       .then(datas => {
  //         return Promise.all(
  //           datas.map(data => {
  //             const icon = categories.find(category => category._id.toString() === data.categoryId.toString()).icon
  //           })
  //         )
  //       })
  //   })
  // ]
})


module.exports = router