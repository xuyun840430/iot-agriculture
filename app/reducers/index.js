import { combineReducers } from 'redux';
import user from '../reducers/user';
import navigation from '../reducers/navigation'
import plugin from '../reducers/plugin'
import process from '../reducers/process'
import generator from '../reducers/generator'
import sensorData from '../reducers/sensorData'
import { routerReducer as routing } from 'react-router-redux';

// Combine reducers with routeReducer which keeps track of
// router state
const rootReducer = combineReducers({
  user,
  navigation,
  plugin,
  process,
  generator,
  sensorData,
  routing
});

export default rootReducer;
