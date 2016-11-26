/**
 * Created by Information on 2016/5/30.
 */
import {
  GENERATE_PLUGIN_SUCCESS,
  GENERATE_PLUGIN_FAILURE
} from '../constants/index';


export default function generator(
  state = {
    isGenerateSuccess: false
  }, action = {}) {
  switch (action.type) {
    /* Generate plugin functions */
    case GENERATE_PLUGIN_SUCCESS:
      return Object.assign({}, state, {
        isGenerateSuccess: true
      });
    case GENERATE_PLUGIN_FAILURE:
      return Object.assign({}, state, {
        isGenerateSuccess: false
      });

    default:
      return state;
  }
}