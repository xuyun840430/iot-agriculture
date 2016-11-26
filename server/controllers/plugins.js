/**
 * Created by Information on 2016/4/20.
 */
var mongoose = require('mongoose');
var _ = require('lodash');
var Plugin = mongoose.model('Plugin');

/**
 * List all plugins
 */
exports.all = function(req, res) {
  Plugin.find({}).exec(function(err, plugins) {
    if(!err) {
      res.json(plugins);
    }else {
      console.log('Error in first query');
    }
  });
};
/**
 * Add a plugin
 */
exports.add = function(req, res) {
  Plugin.create(req.body, function (err) {
    if (err) {
      console.log(err);
      res.status(400).send(err);
      // res.status(200).json({ fileid: mongoId });
    }
    res.status(200).send('OK');
  });
};

/**
 * Update a plugin
 */
exports.update = function(req, res) {
  var query = { id: req.params.id };
  var omitKeys = ['_id', '__v'];
  var data = _.omit(req.body, omitKeys);

  Plugin.findOneAndUpdate(query, data, function(err, data) {
    if(err) {
      console.log('Error on save!');
      // Not sure if server status is the correct status to return
      res.status(500).send('We failed to save to due some reason');
    }
    res.status(200).send('Updated successfully');
  });

};

/**
 * Remove a plugin
 */
exports.remove = function(req, res) {
  var query = { id: req.params.id };
  Plugin.findOneAndRemove(query, function(err, data) {
    if(err) console.log('Error on delete');
    res.status(200).send('Removed Successfully');
  });
};