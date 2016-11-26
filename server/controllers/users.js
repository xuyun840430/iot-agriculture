var _ = require('lodash');
var User = require('../models/user');
var passport = require('passport');

/**
 * POST /login
 */
exports.postLogin = function(req, res, next) {
  // Do username and password validation for the server
  // 'function(err, user, info)' ==> 'LocalStrategy(...return done(err, user, info))'
  passport.authenticate('local',
    {badRequestMessage: '请输入用户名和密码'}, // options for 'authenticate()' in 'strategy.js'
    function(err, user, info) {
      if(err) return next(err);
      if(!user) {
        // param 'message' passed from 'LocalStrategy()->message:xxx' in '/config/passport/local.js'
        return res.status(401).json({ message: info.message});
      }
      // Passport exposes a login() function on req (also aliased as
      // logIn()) that can be used to establish a login session
      req.logIn(user, function(err) {
        if(err) return res.status(401).json({message: err});
        return res.status(200).json({
          firstname: user.profile.firstname,
          lastname: user.profile.lastname,
          message: '您已成功登录.'
        });
      });
    })(req, res, next);
};


/**
 * POST /logout
 */
exports.postLogout = function(req, res) {
  // Do username and password validation for the server
  req.logout();
  res.redirect('/');
};

/**
 * POST /signup
 * Create a new local account
 */
exports.postSignUp = function(req, res, next) {
  var user =  new User({
    username: req.body.username,
    password: req.body.password,
    profile: {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      specialty: req.body.specialty
    }
  });

  User.findOne({username: req.body.username}, function(err, existingUser) {
    // Username already existed
    if(existingUser) {
      return res.status(409).json({ message: '用户名已存在'});
    }

    // Username is available 
    user.save(function(err) {
      if(err) return next(err);
      req.logIn(user, function(err) {
        if(err) return res.status(401).json({message: err});
        return res.status(200).json(
          {
            message: '您已成功登录.'
          });
      });
    });
  });

  // Update user profile
  // var query = { id: req.body.username };
  // data = {
  //   profile: {
  //     firstname: req.body.firstname,
  //     lastname: req.body.lastname,
  //     gender: req.body.gender,
  //     specialty: req.body.specialty
  //   }};
  // User.findOneAndUpdate(query, data, function(err, data) {
  //   if(err) {
  //     console.log('Error on save!');
  //     res.status(500).send('We failed to save to due some reason');
  //   }
  //   res.status(200).send('Updated successfully');
  // });
};
