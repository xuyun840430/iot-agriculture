import React, { PropTypes } from 'react';

/*
 * React-router's <Router> component renders <Route>'s
 * and replaces `this.props.children` with the proper React Component.
 *
 * Please refer to `routes.jsx` for the route config.
 *
 * A better explanation of react-router is available here:
 * https://github.com/rackt/react-router/blob/latest/docs/Introduction.md
 */
const Application = ({children}) => {
  return (
    <div>
        {children}
    </div>
  );
};

Application.propTypes = {
  children: PropTypes.object
};

export default Application;
