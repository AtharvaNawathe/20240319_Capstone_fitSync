const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealPlanSchema = new Schema({
    meal_name: { type: String, required: true, unique: true },
    username: { type: String },
    goal: { type: String, required: true },
    meal_plan: [{
        meal_type: { type: String, required: true }, // Example: Pre-workout, Breakfast, Lunch, Dinner
        meals: [{
            name: { type: String, required: true },
            description: { type: String, required: true },
            meal_status: { type: String, default: 'pending' }
        }]
    }]
});

module.exports = mongoose.model('MealPlan', mealPlanSchema);