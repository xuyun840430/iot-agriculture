/**
 * Created by Information on 2016/5/17.
 * This file contains all processes (incl. wizards) control actions.
 */
import { polyfill } from 'es6-promise';
import request from 'axios';
import moment from 'moment'
import _ from 'lodash';
import axios from 'axios';
import * as types from '../constants';

polyfill();

export function setRepoWizardExpand(isExpand) {
  return {
    type: types.TOGGLE_REPO_WIZARD_EXPAND,
    isExpand: isExpand
  };
}