const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealHistorySchema = new Schema({
    meal_name: { type: String, required: true, unique: true },
    meal_plan: [{
        meal_type: { type: String, required: true }, // Example: Pre-workout, Breakfast, Lunch, Dinner
        meals: [{
            name: { type: String, required: true },
            description: { type: String, required: true }
        }]
    }]
});

module.exports = mongoose.model('MealHistory', mealHistorySchema);
