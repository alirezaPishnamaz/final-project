var express = require('express');
var router = express();
var passport = require('passport')
var csrf = require('csurf');
const { getMaxListeners } = require('../models/users');
var csrfProtection = csrf()
router.use(csrfProtection)
router.get('/profile',isLogedIn , (req , res)=>{
    res.render('users/profile')
  })

router.get('/logout',isLogedIn,(req, res)=>{
    req.logOut()
    res.redirect('/')
})

router.use('/', notLogedIn , function(req, res, next){
    next()
})

router.get('/signup',(req , res)=>{
    var messages = req.flash('error')
    res.render('users/signup',{csrfToken : req.csrfToken() , messages , hasError : messages.length > 0 })
  })

  router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect:'/user/signup',
    failureFlash:true
  }),function(req,res,next){
    if(req.session.oldUrl){
      var oldUrl=req.session.oldUrl
      res.redirect(oldUrl)
    }
    else{
      res.redirect('/user/profile')
    }

  }
  )
  
  
  router.get('/signin',(req , res)=>{
    var messages = req.flash('error')
    res.render('users/signin',{csrfToken : req.csrfToken() , messages , hasError : messages.length > 0 })
  })
  
 
  router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect:'/user/signin',
    failureFlash:true
  }),function(req,res,next){
    if(req.body.email==='hamze@gmail.com'){

      res.redirect('/admin')
    }
    else if(req.session.oldUrl){
      var oldUrl=req.session.oldUrl
      res.redirect(oldUrl)
    }
    
    else{
      res.redirect('/user/profile')
    }

  }
  )

 
module.exports = router;

function isLogedIn(req , res , next){

    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}

function notLogedIn(req , res , next){

    if(!req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}