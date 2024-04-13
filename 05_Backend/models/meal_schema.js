const mongoose = require('mongoose');

const mealPlanSchema = new mongoose.Schema({
  username:{
    type:String
  },
  mealName: {
    type: String,
    required: true,
  },
  mealType: {
    type: String,
    required: true,
  },
  mealTime: {
    hour: {
      type: Number,
      required: true,
    },
    minute: {
      type: Number,
      required: true,
    },
    period: {
      type: String,
      enum: ['AM', 'PM'],
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  foodDescription: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const MealPlan = mongoose.model('MealPlan', mealPlanSchema);

module.exports = MealPlan;
