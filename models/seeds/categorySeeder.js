if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const db = require('../../config/mongoose')
const Category = require('../category')

const category = [
  { name: "家居物業", icon: "fa-solid fa-house" },
  { name: "交通出行", icon: "fa-solid fa-van-shuttle" },
  { name: "休閒娛樂", icon: "fa-solid fa-face-grin-beam" },
  { name: "聚餐派對", icon: "fa-solid fa-utensils" },
  { name: "其他", icon: "fa-solid fa-pen" }
];

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', () => {
  Category.create(category)
    .then(() => {
      console.log('CategorySeeder is done !')
      process.exit()
    })
    .catch(err => console.log(err))
})