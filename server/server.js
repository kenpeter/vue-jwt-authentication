// morgan is logger
// cors
// http server
// express
// error handler
// cors, again....??
// dotenv....., load .env file
// body parser
var logger          = require('morgan'),
    cors            = require('cors'),
    http            = require('http'),
    express         = require('express'),
    errorhandler    = require('errorhandler'),
    cors            = require('cors'),
    dotenv          = require('dotenv'),
    bodyParser      = require('body-parser');

// express
var app = express();

// .env loadeed
dotenv.load();

// Parsers
// old version of line
// app.use(bodyParser.urlencoded());
// new version of line

// body parser url encoded
app.use(bodyParser.urlencoded({ extended: true }));
// body parser json
app.use(bodyParser.json());
// use cors
app.use(cors());

// app uses
// func, err, req, res, next
app.use(function(err, req, res, next) {
  // err name
  // === statusError
  if (err.name === 'StatusError') {
    // res send
    // err status
    // err msg
    res.send(err.status, err.message);
  } else {
    // then next with error, keep moving
    next(err);
  }
});

// dev ....
// with logger dev
// error handler
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}

// 3 routes
// anonymous-routes
app.use(require('./anonymous-routes'));
// protected-routes
app.use(require('./protected-routes'));
// user-routes
app.use(require('./user-routes'));

// port 3001
var port = process.env.PORT || 3001;

// now create server
http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
