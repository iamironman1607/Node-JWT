const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const handleErrors = (error) => {
    console.log(error.message, error.code);
    let errors = { email: '', password: '' };


    //duplicate error code
    if(error.code ===11000){
        errors.email='Email is already registered.'
        return errors;
    }

    //Validation Errors
    if (error.message.includes('user validation failed')) {
        Object.values(error.errors).forEach(({ properties }) => {

            errors[properties.path] = properties.message
        });
    }
    return errors;
}

const maxaAge= 2*24*60*60;
const createToken = (id)=>{


    return jwt_sign({id},'This secret key must be saved into a ENV variable', {
        expireIn:maxaAge
    });
}

exports.getHomepage = async (req, res, next) => {
    res.render('index');
}

exports.getSignup = async (req, res, next) => {

    res.render('signup');
}

exports.postSignup = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token , {httpOnly:true, maxaAge:maxaAge*100});

    } catch (error) {

       let err= handleErrors(error);
        res.status(429).json(err)

    }

}

exports.getSignin = async (req, res, next) => {

    res.render('signin');

}

exports.postSignin = async (req, res, next) => {

    try {
        const { email, password } = req.body;
        console.log(req.body);
        res.status(200).json(req.body);
    } catch (error) {
        handleErrors(error);
    }
}

