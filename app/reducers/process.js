/**
 * Created by Information on 2016/5/17.
 */
import {
  TOGGLE_REPO_WIZARD_EXPAND
} from '../constants/index';


export default function process(
  state={
    isRepoWizardExpand: undefined
  }, action={}) {
  switch (action.type) {
    case TOGGLE_REPO_WIZARD_EXPAND:
      return Object.assign({}, state, {
        isRepoWizardExpand: action.isExpand
      });

    default:
      return state;
  }
}