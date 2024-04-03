const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutHistorySchema = new Schema({
    workout_name: { type: String },
    day: { type: String, required: true },
    exercises: [{
        exercise_name: { type: String, required: true },
        description: { type: String, required: true },
        workout_status: { type: String, default: 'pending' }
    }]
});

module.exports = mongoose.model('WorkoutHistory', workoutHistorySchema);
