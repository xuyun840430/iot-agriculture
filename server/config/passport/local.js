/*
 Configuring local strategy to authenticate strategies
 Code modified from : https://github.com/madhums/node-express-mongoose-demo/blob/master/config/passport/local.js
 */

var mongoose = require('mongoose');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

/*
 By default, LocalStrategy expects to find credentials in parameters named username and password.
 If your site prefers to name these fields differently, options are available to change the defaults.
 */
module.exports = new LocalStrategy({
  usernameField : 'username'
}, function(username, password, done) {
  User.findOne({ username: username}, function(err, user) {
    if(!user)
      return done(null, false, { message: '用户名不存在 ' + username + '.'});
      
      user.comparePassword(password, function(err, isMatch) {
        if(isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: '用户名或密码不正确'});
        }
      });
  });
});