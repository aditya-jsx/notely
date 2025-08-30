import mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    otp: { type: String, required: false },
    otpExpiry: { type: Date, required: false },
    isVerified: { type: Boolean, default: false, required: true }
});

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
})

export const UserModel = mongoose.model('users', userSchema);
export const NoteModel = mongoose.model('notes', notesSchema);