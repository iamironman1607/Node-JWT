const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.verifyAuth = async (req, res, next)=>{

    const token = req.cookies.jwt;
    
    

    if(token){
        jwt.verify(token, 'This secret key must be saved into a ENV variable', (error, Decodedtoken)=>{
            if(error){
                res.redirect('/signin');
            }
            else{
                next();
            }
        })
    }
    else{
         res.redirect('/signin');
    }
}

//Checking the currnet logged in user
exports.checkUser = async (req, res, next) =>{

    const token = req.cookies.jwt;
     
    if(token){
            jwt.verify(token, 'This secret key must be saved into a ENV variable', async (error, Decodedtoken)=>{

                if(error){
                    res.locals.loggedUser=null;
                     next();
                }
                else{
                    let user = await User.findById(Decodedtoken.id);
                    res.locals.loggedUser= user.email;
                    next();
                }
            })
    }
    else{
        res.locals.loggedUser= null;
        next();
    }
    
}