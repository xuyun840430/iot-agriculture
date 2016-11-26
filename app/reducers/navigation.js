/**
 * Created by Information on 2016/4/8.
 */

import {
  SET_NAVIGATION_ITEM_ACTIVE,
  SET_NAVIGATION_CONTENT,
  SET_MENUITEM_OPEN_CLOSE
} from '../constants/index';

// Dummy menu item structure, s.a. 'MenuItem' component for detail
var defaultItems = {
  "item": [
    {
      "_id": "root-1",
      "title": "Blank",
      "route": "/home",
      "icon": "fa fa-lg fa-fw fa-home",
      "badge": "",
      "counter": "",
      "parent": "",
      "isOpen": "true",
      "isActive": "true"
    }
  ],
  "items": [
    {
      "_id": "default-1",
      "title": "Blank",
      "route": "/home",
      "icon": "fa fa-lg fa-fw fa-home",
      "badge": "",
      "counter": "",
      "parent": "",
      "isOpen": "true",
      "isActive": "true"
    }
  ]
};

export default function navigation(
  state={
    isActive: false,
    naviContents: defaultItems
  }, action={}) {
  switch (action.type) {
    case SET_NAVIGATION_ITEM_ACTIVE:
      return Object.assign({}, state, {
        isActive: action.isActive
      });
    case SET_NAVIGATION_CONTENT:
      return Object.assign({}, state, {
        naviContents: action.data
      });
    case SET_MENUITEM_OPEN_CLOSE:
      return Object.assign({}, state, {
        naviContents: action.data
      });
    default:
      return state;
  }
}