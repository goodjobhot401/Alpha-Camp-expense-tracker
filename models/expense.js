const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expenseSchema = new Schema({
  name: {
    type: String,
    require: true
  },

  date: {
    type: Date,
    required: true,
    default: function () {
      const today = new Date();
      // 將日期轉換為本地日期字符串格式，並解析回日期對象
      const localDate = new Date(today.toLocaleDateString());
      return localDate;
    }
  },

  category: {
    type: String,
    require: true
  },

  amount: {
    type: Number,
    require: true
  },

  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    index: true,
    require: true
  }
})

module.exports = mongoose.model('Expense', expenseSchema)

