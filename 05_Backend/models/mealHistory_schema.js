const mongoose = require('mongoose');

// Define MealHistory Schema
const mealHistorySchema = new mongoose.Schema({
  username: { type: String, required: true },
  mealName: { type: String, required: true },
  mealType: { type: String, required: true },
  date: { type: Date, required: true },
  foodDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create MealHistory model
const MealHistory = mongoose.model('MealHistory', mealHistorySchema);

module.exports = MealHistory;
