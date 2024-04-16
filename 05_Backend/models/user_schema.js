const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {type: Object},
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String,required:true},
    name: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    birthdate: { type: Date },
    preferredUnits: { type: String, enum: ['kg', 'lbs'] },
    height: { type: Number  },
    waist: { type: Number },
    hips: { type: Number },
    neck: { type: Number },
    token: { type: String, default: '' }
});

module.exports = mongoose.model('User', userSchema);
