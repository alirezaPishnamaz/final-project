var express = require('express');
var router = express();
var Product = require('../models/product.js')
var Cart = require('../models/cart');



/* GET home page. */
router.get('/', function(req, res) {

  Product.find({}).then((products)=>{
    var productChunks = []
        var chunkSize = 3
        for (var i = 0 ; i < products.length ; i+= chunkSize) {
          productChunks.push(products.slice( i , i + chunkSize))
        }
    res.render('../views/shop/index.hbs',{products:productChunks})
  }).catch((e)=>{}
  )
})
router.get('/admin',(req,res,next)=>{
    res.render('../views/users/admin.hbs')
})
router.get('/add-to-cart/:id',(req, res, next)=>{
  var productId = req.params.id
  var cart = new Cart(req.session.cart ? req.session.cart : { item : {}})
  Product.findById(productId, function(err , product){
    if(err){
      return res.redirect('/')
    }
    cart.add(product, product.id)
    req.session.cart = cart
    console.log(req.session.cart)
    res.redirect('/')
  })
})
router.get('/shopping-cart' , (req , res , next)=>{
  if(!req.session.cart){
    return res.render('shop/shopping-cart.hbs' , {products: null})
  }
  var cart = new Cart(req.session.cart)
  res.render('shop/shopping-cart', {products:cart.generateArray(), totalPrice:cart.totalPrice})
})
router.get('/checkout' ,isLogedIn, (req , res , next)=>{
  if(!req.session.cart){
    return res.redirect('/shopping-cart' )
  }
  var cart = new Cart(req.session.cart)
  res.render('shop/checkout', {total:cart.totalPrice})
})
router.get('/add-products' , (req , res )=>{
  
  res.render('shop/products')
})

module.exports = router;
function isLogedIn(req , res , next){

  if(req.isAuthenticated()){
      return next()
  }
  req.session.oldUrl=req.url
  res.redirect('/user/signin')
}
