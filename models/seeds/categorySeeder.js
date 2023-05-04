const mongoose = require('mongoose')
const Category = require('../category')
const SEED_CATEGORY = require('./category.json')
const db = require('../../config/mongoose')

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
    Category.create(SEED_CATEGORY)
      .then(() => {
        console.log('Seed category are created!')
        process.exit()
      })
      .catch(err => console.log(err))
  ])
})