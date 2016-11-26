import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';

import * as types from '../constants';

polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api='/login') {
  return request({
    url: api,
    method: method,
    data: data,
    withCredentials: true
  });
}


// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(userFullname, message) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message: message,
    userFullname: userFullname
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message: message  // 'message' routes from '/login --> users.postLogin()' from server
  };
}

// Sign Up Action Creators
function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message: message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message: message
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

// Rest Action Creators
export function userInfoRest() {
    return { type: types.USER_INFO_RESET };
}

export function manualLogin(data) {

  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/login')
      .then(response => {
        if (response.status === 200) {
          let userFullname = response.data.lastname + response.data.firstname;
          dispatch(loginSuccess(userFullname, response.data.message));
          dispatch(push('/testComponents')); // When login successfully, redirect to '/home' URL
        } else {
          dispatch(loginError('User login error'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
      });
  };
}

export function signUp(data, errMsg) {
  // Without same password and confirm password, show the error
  if (errMsg && errMsg.length > 0) {
    return dispatch => {
      dispatch(signUpError(errMsg));
    }
  } else { // With same password and confirm password, do signup process
    return dispatch => {
      dispatch(beginSignUp());

      return makeUserRequest('post', data, '/signup')
        .then(response => {
          if (response.status === 200) {
            dispatch(signUpSuccess(response.data.message));
            dispatch(push('/'));
          } else {
            dispatch(signUpError('User sign up error'));
          }
        })
        .catch(err => {
          dispatch(signUpError(err.data.message));
        });
    };
  }
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());

    return makeUserRequest('post', null, '/logout')
      .then( response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}

