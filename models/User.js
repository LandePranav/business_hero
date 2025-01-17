const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        required:true, unique:true
    },
    password: {
        type: String, 
        required:true
    },
}, {timestamps: true});

userSchema.pre('save', async (next) => {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})

module.exports = mongoose.model("User", userSchema);