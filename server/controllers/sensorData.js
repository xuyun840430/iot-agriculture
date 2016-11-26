/**
 * Created by Information on 2016/11/19.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var SensorData = mongoose.model('SensorData');

/**
 * Get all sensor data
 */
exports.all = function(req, res) {
  SensorData.find({}).exec(function(err, data) {
    if(!err) {
      res.json(data);
    }else {
      console.log('Error in first query');
    }
  });
};

/**
 * Get sensor data with specific datetime
 */
exports.get = function(req, res) {
  SensorData.find({
    timestamp: { $gt: req.params.datetime }
  }).exec(function(err, data) {
    if(!err) {
      res.json(data);
    }else {
      console.log('Error in first query');
    }
  });
};
/**
 * Add a sensor data
 */
exports.add = function(req, res) {
  SensorData.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
    }
    res.status(200).send('OK');
  });
};

