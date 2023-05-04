const Category = require('../category')
const db = require('../../config/mongoose')

const categoryIcon = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin-beam",
  聚餐派對: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}


const categories = []

for (let category in Category) {
  categories.push({ name: category, icon: categoryIcon[category] })
}

db.once('open', () => {
  Promise.all(
    categories.map(item => Category.create(item))
  )
    .then(() => console.log(''))
    .catch(err => console.log(err))
})

