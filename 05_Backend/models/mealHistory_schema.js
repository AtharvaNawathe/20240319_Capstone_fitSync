const mongoose = require('mongoose');


const mealHistorySchema = new mongoose.Schema({
  username: { type: String, required: true, unique:true },
  mealName: { type: String, required: true },
  mealType: { type: String, required: true },
  date: { type: Date, required: true },
  foodDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});


const MealHistory = mongoose.model('MealHistory', mealHistorySchema);

module.exports = MealHistory;
