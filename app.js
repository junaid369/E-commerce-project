var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
 var hbs = require('express-handlebars')
 var session = require('express-session')
var logger = require('morgan');
var db = require('./config/connection')
var fileupload=require('express-fileupload')
const paypal=require('paypal-rest-sdk')
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'AQN2bn3AGCn7xlNEF_i6tO2AfOmx5ydxNK99wQv6-Fg95tiCoJDAwP02AQ0gd3h1omS41DQx-XlMSw5w',
  'client_secret': 'EHFU9HOYzn9y5HHUwVK4-TcAXTT73S0gtxdPry_HEgkpXf7R3CMQY9cQU8jheEKVrmywTuwWNs2i3jDQ'
});


db.connect((err)=>{
  if(err)
  console.log("Connection error"+err);
  else
  console.log("Database connected");
})

var userRouter = require('./routes/users');
var adminRouter = require('./routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"Key",cookie:{maxAge:500000}}))
app.use(fileupload())
app.use('/', userRouter);
app.use('/admin', adminRouter);

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
