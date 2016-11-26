/**
 * Created by Information on 2016/11/19.
 */
import {
  CREATE_SENSORDATA_REQUEST,
  CREATE_SENSORDATA_SUCCESS,
  CREATE_SENSORDATA_FAILURE,
  GET_SENSORDATA_REQUEST,
  GET_SENSORDATA_SUCCESS,
  GET_SENSORDATA_FAILURE,
  GET_SENSORDATA_ALL_REQUEST,
  GET_SENSORDATA_ALL_SUCCESS,
  GET_SENSORDATA_ALL_FAILURE,
} from '../constants/index';


// TODO: try to use redux middleware to make the action logic simple!
export default function sensorData(
  state = {
    isFetched: false,
    isProcessing: false,
    isCreated: false,
    currData: [],
    fetchedData: [],
    allData:[],
  }, action = {}) {

  switch (action.type) {
    /* Create sensor data functions */
    case CREATE_SENSORDATA_REQUEST:
      return Object.assign({}, state, {
        isCreated: false,
        isProcessing: true
      });
    case CREATE_SENSORDATA_SUCCESS:
      return Object.assign({}, state, {
        // plugins: [...state.plugins, action.data],
        currData: action.data,
        isFetched: true,
        isCreated: true,
        isProcessing: false
      });
    case CREATE_SENSORDATA_FAILURE:
      return Object.assign({}, state, {
        currData: [],
        isFetched: true,
        isCreated: false,
        isProcessing: false
      });

    /* Get sensor data functions */
    case GET_SENSORDATA_REQUEST:
      return Object.assign({}, state, {
        isFetched: true,
        isProcessing: true
      });
    case GET_SENSORDATA_SUCCESS:
      return Object.assign({}, state, {
        fetchedData: action.res.data, // Save data with promise 
        isFetched: false,
        isProcessing: false
      });
    case GET_SENSORDATA_FAILURE:
      return Object.assign({}, state, {
        isFetched: false,
        isProcessing: false
      });

    /* Get sensor data functions */
    case GET_SENSORDATA_ALL_REQUEST:
      return Object.assign({}, state, {
        isFetched: true,
        isProcessing: true
      });
    case GET_SENSORDATA_ALL_SUCCESS:
      return Object.assign({}, state, {
        allData: action.res.data, // Save data with promise 
        isFetched: false,
        isProcessing: false
      });
    case GET_SENSORDATA_ALL_FAILURE:
      return Object.assign({}, state, {
        isFetched: false,
        isProcessing: false
      });
    default:
      return state;
  }
}