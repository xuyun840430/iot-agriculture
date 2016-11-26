/**
 * Created by Information on 2016/4/8.
 * This file contains all navigation (menu) control actions.
 */
import { polyfill } from 'es6-promise'
import _ from 'lodash'
import request from 'axios'
import { push } from 'react-router-redux'

import MenuItem from '../components/smartAdmin/layout/navigation/components/MenuItem.js' // TODO: change path
import * as types from '../constants'

polyfill();

let data = {
  item: undefined, // Current selected(activated) navigation item
  items: []        // Items tree including ALL items property
};

function setInitialItem(items) {
  items.forEach(function(item){
    if (item.isHome){
      data.item = item
    }
    if(item.items){
      setInitialItem(item.items)
    }
  })
}

function normalize(items) {
  return _.map(items, function (item) {
    return new MenuItem(item)
  })
}

function setNavigationContent(data) {
  return {
    type: types.SET_NAVIGATION_CONTENT,
    data: data
  };
}

function setMenuItemOpenClose(data) {
  return {
    type: types.SET_MENUITEM_OPEN_CLOSE,
    data: data
  };
}

export function initRawItems(rawItems) {
  data.items = normalize(rawItems);
  setInitialItem(data.items);
  return dispatch => {
    dispatch(setNavigationContent(data));
  }
}

export function setActiveNavigationItem(item) {
  data.item = item;

  return dispatch => {
    if (item.route)
      dispatch(push(item.route)); // redirect to route URL

    dispatch(setNavigationContent(data));
  }
}

export function toggleMenuItemOpenClose(item, isOpen) {
  item.isOpen = isOpen;
  data.item = item;

  return dispatch => {
    dispatch(setMenuItemOpenClose(data));
  }
}

// TODO: not used!
// export function getNavigationItems() {
//   $.getJSON('api/menu-items.json')
//     .success(function (data) {
//       dispatch(setNavigationItems(data));
//     });
// }