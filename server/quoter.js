// get all data, it is an array
var quotes = require('./quotes.json');

// export a func
exports.getRandomOne = function() {
  // total quotes num
  var totalAmount = quotes.length;
  // random
  // math.ceil
  // math.random * totalAmount
  var rand = Math.ceil(Math.random() * totalAmount);
  // return with an item 
  return quotes[rand];
}
