/**
 * Created by Information on 2016/11/19.
 */
/**
 * Schema Definitions
 *
 */
var mongoose = require('mongoose');

var SensorDataSchema = new mongoose.Schema({
  id: String,
  site: String,
  index: String,
  timestamp: { type: Date, default: Date.now },
  next_time: { type: Date, default: Date.now },
  data: Array,
});

// Compiles the schema into a model, opening (or creating, if
//	nonexistent) the 'Topic' collection in the MongoDB database
SensorData = mongoose.model('SensorData', SensorDataSchema);