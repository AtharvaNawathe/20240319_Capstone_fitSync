const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    meal_name: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String, required: true },
    goal: { type: String, required: true },
    veg: { type: String }
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);
