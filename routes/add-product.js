var express = require('express');
var router = express();
//from product.js
var Seller = require('../models/sellers.js')
var Product = require('../models/product.js')
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true,useCreateIndex:true });
   
router.get('/products',(req , res)=>{
    var messages = req.flash('error')
    res.render('shop/products',{ messages , hasError : messages.length > 0 })
  })
  router.post('/products',(req , res)=>{
    
    Seller.findOne({company:req.body.company},function(err, seller){
      if(err){
          return(err)
      }
      if(!seller){
          var messages=[]
          messages.push('company is not already registered')
          console.log(messages)
          res.render('shop/products',{ messages , hasError : messages.length > 0 })
      }
      else{
        var product= new Product({
        imagePath:req.body.imagePath,
        title:req.body.title,
        description:req.body.description,
        price:req.body.price,
        company:req.body.company
    })
    // product.imagePath=req.body.imagePath
    // product.description =req.body.discription
    // product.title = req.body.title
    // product.price = req.body.price

   
        
    
      console.log('starting')

        product.save().then(()=>
        {    exit()
              }
          ).catch((error)=>{

              console.log('error')
              var messages = []
                
              messages.push(error)
              console.log(error)
              res.render('users/seller',{ messages , hasError : messages.length > 0 })
                  })
            function exit(){
              mongoose.disconnect()
            }

      }
  
    })
})

module.exports = router;
