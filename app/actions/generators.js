/**
 * Created by Information on 2016/4/8.
 * This file contains all template based plugin generator control actions.
 */
 
import { polyfill } from 'es6-promise';
import request from 'axios';
import moment from 'moment'
import _ from 'lodash';
import axios from 'axios';
import * as types from '../constants';

polyfill();


/*
  Generate plugin functions
 */
function generatePluginSuccess() {
  return {
    type: types.GENERATE_PLUGIN_SUCCESS
  };
}
function generatePluginFailure() {
  return {
    type: types.GENERATE_PLUGIN_FAILURE
  };
}

export function generatePluginWithTemplate(data) {
  return dispatch => {
    // Check if data is avaiable
    if (_.trim(data).length <= 0) return;
    
    // Send generating plugin based on input data and template on server-side
    axios.post('/pluginCodeGenerator/generatePlugin', data)
      .then(res => {
        // Response from file success stored in GridFS
        if (res.status === 200) {
          return dispatch(generatePluginSuccess());
        }})
      .catch(ex => {
        return dispatch(generatePluginFailure());
      });
  };
}

