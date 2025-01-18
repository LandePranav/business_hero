const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const taskSchema = new mongoose.Schema({
    title: {
        type: String, 
        required:true, 
    },
    description: {
        type: String, 
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps: true});

//enum in status limits the input options to specified array

module.exports = mongoose.model("Task", taskSchema);