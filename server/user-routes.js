// express
// lodash
// config
// jwt
var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

// export express router
var app = module.exports = express.Router();

// username and password
// XXX: This should be a database of users :).
var users = [{
  id: 1,
  username: 'user',
  password: 'pass'
}];

// create token
// pass an user
function createToken(user) {
  // omit blacklist password
  // sign with config.secret
  // expired
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

// get user scheme
// pass request
function getUserScheme(req) {
  // attrsssss....
  // username
  var username;
  // type....?
  var type;
  // user search ....?
  var userSearch = {};

  // so username or email ..........??????????/
  // The POST contains a username and not an email
  if(req.body.username) {
    username = req.body.username;
    type = 'username';
    userSearch = { username: username };
  }

  // The POST contains an email and not an username
  else if(req.body.email) {
    username = req.body.email;
    type = 'email';
    userSearch = { email: username };
  }

  return {
    username: username,
    type: type,
    userSearch: userSearch
  }
}

// post to /users, singup
app.post('/users', function(req, res) {
  // ........
  var userScheme = getUserScheme(req);
  // both username or password
  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  // users is predefined in the above....
  // if username already there, so exit
  if (_.find(users, userScheme.userSearch)) {
   return res.status(400).send("A user with that username already exists");
  }

  // only pick {password: xxxx} or {extra: xxx} or {username: xxxx} or {email: xxx}
  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  // id..... max
  profile.id = _.max(users, 'id').id + 1;

  // push it....
  users.push(profile);

  // get a token
  res.status(201).send({
    id_token: createToken(profile)
  });
});

// create a token 
app.post('/sessions/create', function(req, res) {

  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user = _.find(users, userScheme.userSearch);

  if (!user) {
    return res.status(401).send({message:"The username or password don't match", user: user});
  }

  if (user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});
