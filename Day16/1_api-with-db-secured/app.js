require('dotenv').config();
const mongoose = require('mongoose');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

require('./config/passport-config')(passport);

var indexRouter = require('./routes/index');
var employeesRouter = require('./routes/employees');
var employeesApiRouter = require('./routes/employees-api');
var accountRouter = require('./routes/account')(passport);

mongoose.set('strictQuery', false);
mongoose.connect(process.env.mongoUri)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: process.env.SESSION_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/employees', employeesRouter);
app.use('/account', accountRouter);
app.use('/api/employees', employeesApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${process.env.mongoUri}`);
});

mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

module.exports = app;
