const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
  username: { type: String },
  activity_name: { type: String, required: true },
  activity: { type: String, required: true },
  activity_description: { type: String },
  date: { type: Date, required: true },
  duration: { type: Number, required: true }, // assuming duration is in minutes
  notes: { type: String },
  status: {
    type:String,
    default: "Pending"
  }
});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;