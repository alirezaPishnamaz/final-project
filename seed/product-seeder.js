var Product = require('../models/product.js')
var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true,useCreateIndex:true });
    var products = [
    new Product({
        imagePath:"https://images-na.ssl-images-amazon.com/images/I/81keqIN-tlL._SL1500_.jpg",
        title:"the good, bad and ugly",
        description:"In the Southwest during the Civil War, a mysterious stranger, Joe (Clint Eastwood), and a Mexican outlaw, Tuco (Eli Wallach), form an uneasy partnership -- Joe turns in the bandit for the reward money, then rescues him just as he is being hanged.",
        price:2
    }),
    new Product({
        imagePath:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBoUo0lPtAJiO0RyEb_C44usrfMq4VhNN_L8zk_wtd8QQuZzSh",
        title:"schindler's list",
        description:"Businessman Oskar Schindler (Liam Neeson) arrives in Krakow in 1939, ready to make his fortune from World War II, which has just started. After joining the Nazi party primarily for political expediency, he staffs his factory with Jewish workers for similarly pragmatic reasons ...",
        price:5
    }),
    new Product({
        imagePath:"https://aimeej21.com/aimeej21_content/uploads/2017/02/The-Shawshank-Redemption_poster_goldposter_com_33.jpg@0o_0l_800w_80q.jpg",
        title:"the shawshang redemption",
        description:"Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison for the murders of his wife and her lover and is sentenced to a tough prison. However, only Andy knows he didn't commit the crimes...",
        price:7
    }),
    new Product({
        imagePath:"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRSFA95uZKTll-AfrEI1yOB7-yPzK_X1DtCF0pRAsOB224-HtAK",
        title:"catch me if you can",
        description:"Notorious con artist Frank Abagnale has duped people worth millions of dollars with his masterful art of deception. With his scams getting bolder, he is soon pursued by FBI agent Carl Hanratty. ....",
        price:6
    }),
    new Product({
        imagePath:"https://www.gstatic.com/tv/thumb/v22vodart/11007878/p11007878_v_v8_aj.jpg",
        title:"the warter diviner",
        description:"Joshua Connor's three sons are presumed dead in the Battle of Gallipoli. After his wife commits suicide, Connor goes to Turkey to find the bodies of his three sons to bury them with their mother. ...",
        price:8
    })
]
var done = 0
console.log('starting')
for(var i = 0 ; i < products.length ; i++){

  products[i].save().then(()=>
  {
        done++ 
        if(done === products.length)
        {
            console.log('finished')
            exit()
        }
    }).catch((error)=>{

        console.log('error')
    })
}
function exit(){
   mongoose.disconnect()
}