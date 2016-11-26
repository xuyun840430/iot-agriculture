/**
 * Created by pc on 2016/3/28.
 */
import React from 'react'
import {Route, IndexRoute} from 'react-router'

// Application pages
import Application from './pages/Application'
import Layout from './layout/Layout'
import Home from './pages/Home';
import Workspace from './pages/Workspace'

import FarmInfo from './pages/FarmInfo'
import LandblockInfo from './pages/LandblockInfo'
import BotanicBase from './pages/BotanicBase'
import SensorDetailData from './pages/SensorDetailData'

// Test pages for components test and page test
import TestComponents from './pages/TestComponents'

// For server-side rendering
import preRenderMiddleware from './middlewares/preRenderMiddleware';


/**
 * Callback function handling frontend route changes.
 */
// function onUpdate() {
//   // Prevent duplicate fetches when first loaded.
//   // Explanation: On server-side render, we already have __INITIAL_STATE__
//   // So when the client side onUpdate kicks in, we do not need to fetch twice.
//   // We set it to null so that every subsequent client-side navigation will
//   // still trigger a fetch data.
//   // Read more: https://github.com/choonkending/react-webpack-node/pull/203#discussion_r60839356
//   // if (window.__INITIAL_STATE__ !== null) {
//   //   window.__INITIAL_STATE__ = null;
//   //   return;
//   // }

//   const { components, params } = this.state;

//   preRenderMiddleware(store.dispatch, components, params);


// }

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };

  // Application routes: Redux store connection should be placed in bellowing components (container component / pages),
  // e.g. 'Application' as abstract / pure container, and 'home', 'layout' as functional / logic container
  return (
    <Route path="/" component={Application}>
      <IndexRoute component={Home} />

      <Route component={Layout} >
        {/* When login successful, use manualLogin() in 'reducer->user.js'' to define firt route position */}
        <Route path="farmInfo" component={FarmInfo} onEnter={requireAuth} />
        <Route path="landblockInfo" component={LandblockInfo} onEnter={requireAuth} />
        <Route path="botanicBase" component={BotanicBase} onEnter={requireAuth} />
        <Route path="/sensorDetailData" component={SensorDetailData} onEnter={requireAuth} />
        <Route path="/sensorDetailData/:component" component={SensorDetailData} onEnter={requireAuth} />
        <Route path="testComponents" component={TestComponents} onEnter={requireAuth} />
      </Route>
    </Route>
  );
};