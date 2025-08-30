import mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    googleId: { type: String, required: true },
    otp: { type: String, required: true },
    otpExpiry: { type: String, required: true },
});

const notesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
})

export const UserModel = mongoose.model('users', userSchema);
export const NoteModel = mongoose.model('notes', notesSchema);