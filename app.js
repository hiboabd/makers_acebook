var createError = require('http-errors');
var express = require('express');
// connects to express
var path = require('path');
var cookieParser = require('cookie-parser');
// additional part of the express framework. To be used with express.
var logger = require('morgan');
// additional parts of the Node package.
console.log(1);
var homeRouter = require('./routes/home');
var postsRouter = require('./routes/posts');
var testRouter = require('./routes/test');
// variables made that require the files in the route folder.

var app = express();
// app is an instance of express - used to connect to the server.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// hbs is the type of folder - sets the time of files that will be inside the views directory.
// think of hbs as the html files. - think erb.

app.use(logger('dev'));
app.use(express.json());
// enable us to use json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// enables us to access Cookies
app.use(express.static(path.join(__dirname, 'public')));
// enables us to access files inside public - css, frontend javascript and images.

// route setup
app.use('/', homeRouter);
app.use('/posts', postsRouter);
app.use('/test', testRouter);

// calls homeRouter and postRouter variables (referenced above) and visits those files to implement the setup.
console.log(4);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
