const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator');
const bcrypt=require('bcryptjs');

const userSchema = new Schema({
    email: {
        type: String, required: [true, 'Please enter an email']
        , unique: true, lowecase: true,
        validate:[isEmail, ' Please enter a valid email']
    },

    password: {
        type: String,
        required: [true, 'Password cannot be blank!'],
        minlength: [6, 'Minimum password length is 6 characters']
    }

}, {
    timestamps: true
});

//fire thois before doc save to DB
userSchema.pre('save', async function(next){

    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



const User = mongoose.model("user", userSchema);
module.exports = User;
