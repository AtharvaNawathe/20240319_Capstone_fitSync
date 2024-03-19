const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutStatusSchema = new Schema({
    workout_name: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('WorkoutStatus', workoutStatusSchema);
