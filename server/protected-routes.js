// express
// express jwt
// config for key to sign
// quoter is obj....
var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('./config'),
    quoter  = require('./quoter');

// again app is router
var app = module.exports = express.Router();

// now build a jwt with {secret: config.secret}
var jwtCheck = jwt({
  secret: config.secret
});

// root protected
// app.use /api/protected, protected route
// jwtCheck
app.use('/api/protected', jwtCheck);

// app.get this route
// /api/protected/random-quote
app.get('/api/protected/random-quote', function(req, res) {
  // res status 200
  // .send
  // quoter.random_quote
  res.status(200).send(quoter.getRandomOne());
});
