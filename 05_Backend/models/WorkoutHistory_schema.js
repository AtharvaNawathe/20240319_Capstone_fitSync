const mongoose = require('mongoose');


const workoutHistorySchema = new mongoose.Schema({
  username: { type: String, required: true },
  activity_name: { type: String, required: true },
  activity: { type: String, required: true },
  activity_description: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});


const WorkoutHistory = mongoose.model('WorkoutHistory', workoutHistorySchema);

module.exports = WorkoutHistory;