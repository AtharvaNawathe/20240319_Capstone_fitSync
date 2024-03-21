const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String,required:true},
    name: { type: String, required: true },
    height: { type: Number },
    weight: { type: Number },
    gender: { type: String},
    goal: { type: String},
    veg: { type: String },
    workout_loc: { type: String },
    meal_plan: { type: String },
    token:{type:String, default:''}
});

userSchema.methods.getProfileDetails = function () {
    return {
        username: this.username,
        email: this.email,
        name: this.name,
        height: this.height,
        weight: this.weight,
        gender: this.gender,
        goal: this.goal,
        veg: this.veg,
        workout_plan: this.workout_plan,
        meal_plan: this.meal_plan
    };
};

module.exports = mongoose.model('User', userSchema);
