import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,
//         required:true, 
//     },
//     uid:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     role:{
//         type:Number,
//         default: 0,
//     }
// },{timestamps:true})

// export default mongoose.model('users',userSchema);


// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uid: { type: String, required: true, unique: true },
    rollNumber: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    year: { type: String, required: true },
    division: { type: String, required: true },
    gender: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
