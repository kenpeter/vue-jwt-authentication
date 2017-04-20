// express
// quoter, an obj....??
var express = require('express'),
    quoter  = require('./quoter');

// var app
// module exports
// express.Router
// so the app is a router
var app = module.exports = express.Router();

// router get
// /api/random-quote
app.get('/api/random-quote', function(req, res) {
  // res status 200
  // send quoter.random_quote
  res.status(200).send(quoter.getRandomOne());
});
