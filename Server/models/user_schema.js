const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    gender: { type: String, required: true },
    goal: { type: String, required: true },
    veg: { type: String },
    workout_plan: { type: String },
    meal_plan: { type: String },
    dailyWorkoutStatus: { type: String, default: 'pending' },
    dailyMealStatus: { type: String, default: 'pending' }
});

module.exports = mongoose.model('User', userSchema);
