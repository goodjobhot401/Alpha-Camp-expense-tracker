const express = require('express')
const mongoose = require('mongoose')
const db = mongoose.connection


db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', () => {
  console.log('mongoose connected!')
})

module.exports = db