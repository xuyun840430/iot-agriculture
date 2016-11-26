var express = require('express');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var secrets = require('./config/secrets');
var webpack = require('webpack');
var app = express();

// Find the appropriate database to connect to, default to localhost if not found.
var mongoConn = function() {
  mongoose.connect(secrets.db, function(err, res) {
    if(err) {
      console.log('Error connecting to: ' + secrets.db + '. ' + err);
    }else {
      console.log('Succeeded connected to: ' + secrets.db);
    }
  });
};
mongoConn();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', mongoConn);

// Load models
fs.readdirSync(__dirname + '/models').forEach(function(file) {
  if(~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

var isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  var config = require('../webpack/webpack.config.dev-client.js');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}


// Application passport config
require('./config/passport')(app, passport);

// Application settings
require('./config/express')(app, passport);

// Application routes
require('./config/routes')(app, passport);

// Application file manager (handling file upload/download processes)
require('./config/fileManager')(app, mongoose.connection);

app.listen(app.get('port'));
