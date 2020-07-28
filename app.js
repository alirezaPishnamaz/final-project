var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars')
var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var productRouter=require('./routes/add-product')
var sellerRouter=require('./routes/seller')
var mongoose = require('mongoose')
var session = require('express-session')
var app = express();
var passport = require('passport')
var validator = require('express-validator')
var flash = require('connect-flash')
var mongoStore = require('connect-mongo')(session)
// var mongoose = require('mongoose')
 
mongoose.connect('mongodb://127.0.0.1:27017/shopping', { useNewUrlParser: true,useCreateIndex:true });
require('./config/passport')
// view engine setup
app.engine('.hbs' , expressHbs({defaultLayout: 'layout', extname: '.hbs'}))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret:'mySuperSecret' ,
  resave:false ,
  saveUninitialized : false,
  store:new mongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge:120*60*1000}
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated()
  res.locals.session = req.session
  next()
})

app.use('/user', userRouter);
app.use('/bazzar', indexRouter);
app.use('/shop', productRouter);
app.use('/seller', sellerRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;