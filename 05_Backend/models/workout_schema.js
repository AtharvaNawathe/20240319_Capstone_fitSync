const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutPlanSchema = new Schema({
    workout_name: { type: String, required: true},
    username: { type: String },
    goal: { type: String, required:true },
    workout_loc: { type: String, required: true},
    schedule: [{
        day: { type: String, required: true },
        exercises: [{
            exercise_name: { type: String, required: true },
            description: { type: String, required: true },
            workout_status: { type: String, default: 'pending' }
        }]
    }]
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
