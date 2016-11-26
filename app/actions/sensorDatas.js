/**
 * Created by pc on 2016/4/18.
 * This file contains all plugin control actions.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import moment from 'moment'
import md5 from 'spark-md5';
import _ from 'lodash';
import axios from 'axios';
import * as types from '../constants';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * Note: this function relies on an external variable `API_ENDPOINT`
 *        and isn't a pure function
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint
 * @return Promise
 */
// function makeSensorDataRequest(method, id, data, api = '/sensorDetailData') {
//   return request[method](api + (id ? ('/' + id) : ''), data);
// }

// function makeSensorDataRequest(method, data, params, api='/sensorDetailData') {
//   return request({
//     url: api + (params ? ('/' + params) : ''),
//     method: method,
//     data: data,
//     withCredentials: true
//   });
// }


/*
 Create sensor data functions
 */
function createSensorDataRequest() {
  return {
    type: types.CREATE_SENSORDATA_REQUEST
  };
}
function createSensorDataSuccess(data) {
  return {
    type: types.CREATE_SENSORDATA_SUCCESS,
    data: data
  };
}
function createSensorDataFailure(data) {
  return {
    type: types.CREATE_SENSORDATA_FAILURE,
    id: data.id,
    error: data.error
  };
}

/**
 * createSensorData()
 * @param data
 * @returns {function()}
 */
export function createSensorData(data) {
  return (dispatch, getState) => {
    // If the creating plugin name is empty
    // TODO: Add validation of all fileds
    if (_.trim(data.site).length <= 0) return;

    // Calculate plugin and uploading file md5 identifier
    const identifier = getMd5Identifier(data.site);
    data.id = identifier; // store md5 id in database, id is used to update plugin info

    // First dispatch an optimistic update
    dispatch(createSensorDataRequest());

    // Upload file to mongoDB GridFS
    return axios.post('/sensorDetailData', data)
      .then(res => {
        if (res.status === 200) {
          return dispatch(createSensorDataSuccess(data));
        }
      })
      .catch(ex => {
        return dispatch(createSensorDataFailure({ identifier, error: 'Plugin creation failed on storing plugin info!' }));
      });
  };
}

function getMd5Identifier(field) {
  return md5.hash(field + moment(new Date()).format('YYYY-MM-DD HH:mm:ss'));
}

/**
 * Fetch sensor data with specific datetime point
 * @returns {function()}
 */
export function fetchSensorData(datetime) {

  return {
    type: types.GET_SENSORDATA,
    promise: axios.get('/sensorDetailData/' + datetime)
  };
}

/**
 * Fetch all sensor data
 * @returns {function()}
 */
export function fetchSensorDataAll() {
  return {
    type: types.GET_SENSORDATA_ALL,
    promise: axios.get('/sensorDetailData')
  };
}