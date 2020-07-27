var mongoose = require('mongoose')
var Schema = mongoose.Schema

var sellerSchema = new Schema ({
    company:{type:String , required:true},
    address:{type:String , required:true},
    phone:{type:Number , required:true},
    rate:{type: Number ,min:1 ,max:100 , required:true}
})

module.exports = mongoose.model('Seller' , sellerSchema,'sellers')