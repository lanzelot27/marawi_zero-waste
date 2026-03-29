// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    userType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    province: { type: String, required: true },
    city: { type: String, required: true },
    barangay: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    termsAccepted: { type: Boolean, required: true },
    profilePic: { 
        type: String, 
        default: '/uploads/default-avatar.jpg' // Default to an empty string if no profile picture is uploaded
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model('User', userSchema);
