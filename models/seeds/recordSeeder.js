const mongoose = require('mongoose')
const Expense = require('../expense')
const SEED_RECORD = require('./record.json')
const db = mongoose.connection

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })


db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', () => {
  console.log('mongoose connected!')
  Promise.all([
    Expense.create(SEED_RECORD)
      .then(() => {
        console.log('SeedRecord is created!')
        process.exit()
      })
      .catch(err => console.log(err))
  ])
})