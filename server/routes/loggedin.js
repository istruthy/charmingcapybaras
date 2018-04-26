var express = require('express');

// added items
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var session = require('express-session');
var mongoose = require('mongoose');
var util = require('./../../helpers/user-status');
var User = require('./../../database/models/user');
var router = express();

router.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
// var userSchema = new mongoose.Schema({
//   username: { type: String },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   resetPasswordToken: String,
//   resetPasswordExpires: Date
// });

// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

// var User = mongoose.model('User', userSchema);

// mongoose.connect('mongodb://localhost/fridayhero');

router.post('/login', function(req, res) {
  console.log('post to /login');

  var email = req.body.email;
  var password = req.body.password;

  User.findOne({ email: email }).then(function(found) {
    console.log('found ==>', found);
    if (!found) {
      //if not found
      console.log('your email is not in the database');
      return res.redirect(301, '/login');
      // var redir = { redirect: '/login' };
      // return res.json(redir);
    } else {
      console.log('found user now check password', password);
      //using bcrypt
      console.log('what is this ', found.get('password'));
      bcrypt.compare(password, found.get('password'), function(err, correct) {
        console.log('correct ', correct);
        if (correct) {
          //set up a session
          util.newSession(req, res, found);
          console.log('go@');
          console.log('found', found);
          var redir = { redirect: '/agenda', _user: found._id };
          return res.json(redir);
          // return res.redirect('/agenda');
        } else {
          console.log('Your password is inccorrect');
          return res.redirect(301, '/login');
          var redir = { redirect: '/login' };
          // return res.json(redir);
        }
      });
    }
  });
});

// logout

router.post('/signup', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log('req.body.email', email);
  new User({
    email: email
  });
  User.findOne({ email: email }).then(function(found) {
    if (!found) {
      bcrypt.hash(password, null, null, function(err, hash) {
        User.create({
          email: email, // 'sampleUser'
          password: hash // 'password'
        })
          .then(function(found) {
            //TODO: create session helper function
            console.log('==> ', found);
            util.newSession(req, res, found);
            //return res.redirect(301, '/');
            res.status(202).json({ id: found._id });
          })
          .catch(err => {
            console.log('error! ', err);
            //var notify = { notify: 'user already exists' };
            res.status(500).json({ alert: 'error' });
          });
      });
    } else {
      //if not found
      //TODO: create
      console.log('User already exists');
      res.status(200).json({ alert: 'User already exists' });
    }
  });
});

module.exports = router;
