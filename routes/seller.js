var express = require('express');
var router = express();
//from product.js
var Seller = require('../models/sellers.js')
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true,useCreateIndex:true });
   
router.get('/seller',(req , res)=>{

    res.render('users/seller')
  })


router.post('/seller',(req , res )=>{
    // res.redirect('/')
    Seller.findOne({company:req.body.company},function(err, seller){
  if(err){
      return(err)
  }
  if(seller){
      var messages=[]
      messages.push('company is already in used')
      console.log(messages)
      res.render('users/seller',{ messages , hasError : messages.length > 0 })
  }
  else
  {
    var newseller= new Seller({
      company:req.body.company,
      address:req.body.adress,
      phone:req.body.phone,
      rate:req.body.rate
    })
    console.log('starting')

    newseller.save().then(()=>
      {    exit()
      }).catch((error)=>{
          var messages = []
          
          messages.push(error)
          console.log(error)
          res.render('users/seller',{ messages , hasError : messages.length > 0 })
        })
      

    res.render('users/admin')

    function exit(){
      mongoose.disconnect()
    }
   }
})
   
})

module.exports = router;
