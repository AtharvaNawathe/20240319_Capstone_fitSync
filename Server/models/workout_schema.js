const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutPlanSchema = new Schema({
    workout_name: { type: String, required: true },
    username: { type: String, required: true },
    description: { type: String, required: true },
    goal: { type: String, required: true }
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
