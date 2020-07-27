var passport = require('passport')
var User = require('../models/users')
var LocalStrategy = require('passport-local').Strategy

passport.serializeUser(function(user,done){
     done(null,user.id)
})
passport.deserializeUser(function(id , done){

    User.findById(id,function(err , user){
         done(err , user)
    })
})
passport.use('local.signup' , new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},function(req , email , password , done){
    req.checkBody('email','invalid email').notEmpty().isEmail()
    req.checkBody('password','invalid password').notEmpty().isLength({min:4})
    var errors = req.validationErrors()
    if(errors){
        var messages = []
        errors.forEach(function(error) {
            messages.push(error.msg)
            console.log(error.msg)
        });
        return done(null , false , req.flash('errors' , messages))
    }
    User.findOne({'email':email},function(err, user){
        if(err){
            return done(err)
        }
        if(user){
            return done(null, false, {message:'email is already in used'})
        }
        var newUser = new User()
        newUser.email=email
        newUser.password = newUser.encryptPassword(password)
        newUser.save(function(err, result){
            if(err){
                return done(err)
            }
            return done(null, newUser)
        })

    })
}))
passport.use('local.signin' , new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
},(req , email , password , done)=>{
    req.checkBody('email','invalid email').notEmpty().isEmail()
    req.checkBody('password','invalid password').notEmpty()
    var errors = req.validationErrors()
    if(errors){
        var messages = []
        errors.forEach((error) => {
            messages.push(error.msg)
            console.log(error.msg)
        });
        return done(null , false , req.flash('errors' , messages))
    }
    User.findOne({'email':email},(err, user)=>{
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false, {message:'no user found'})
        }
        var user_password = user.validPassword(password)
        console.log(!user_password)
        if(!user_password){
            return done(null, false, {message:'wrong password'})
        }
       
        return done(null, user)

    })
}))