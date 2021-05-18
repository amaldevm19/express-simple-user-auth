var db = require("../config/db");
var User = require("../models/user");

const user_controller = {
    signup_page:(req, res, next)=>{
        res.render('user/signup', { title: 'User Signup' });
    },
    login_page:(req, res, next)=>{
        res.locals.message = req.flash('error');
        res.render('user/login', { title: 'User Login' });
    },
    signup_function:(req, res, next)=>{
        const new_user = new User({
            ...req.body
        })
        let error = ""
        if(req.body.password.length <2){
            error = "Password must be provided"
        }else if(req.body.password != req.body.confirm_password){
            error = "Password not matching"
        }
        if(error != ""){
            return  res.render('user/signup', { title: 'User Signup', error});
        }
        new_user.save((err)=>{
            if(!err){
                res.redirect("/users/login");
            }else if (err.name === 'MongoError' && err.code === 11000) {
                error = "User already exist" ;
            }
            res.render('user/signup', { title: 'User Signup', error});
        });  
    },
    login_function:(req,res,next)=>{
        User.findOne({email: req.body.email}, (err, user)=>{
            if(err) throw err;
            user.comparePassword(req.body.password,  (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    req.session.user = {
                        user_name: user.user_name,
                        isAdmin: false,
                    }
                    res.redirect("/users/profile");
                }else{
                    req.flash('error', "Incorrect email or password");
                    res.redirect("/users/login");
                }
            })
        })
        
    },
    logout_function:(req, res, next)=>{
        res.clearCookie('user_id');
        res.redirect('/');
    },
    profile_page : (req,res, next)=>{
        console.log(req.session)
        if(!req.session.user){
            req.flash('error', "Currently you are not loggedin");
            res.redirect("/users/login");
        }else{
            res.locals.user = req.session.user;
            res.render('user/profile', { title: 'My Profile' });
        }
        
    }
}

module.exports = user_controller;