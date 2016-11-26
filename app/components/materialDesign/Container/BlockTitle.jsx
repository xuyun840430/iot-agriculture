import React, {PropTypes} from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

const BlockTitle = (props) => (
  <Toolbar>
    <ToolbarGroup>
      <ToolbarTitle text={props.title || '缺省'} />
    </ToolbarGroup>
    { props.menu }
  </Toolbar>
);

BlockTitle.propTypes = {
  title: PropTypes.string,
};

export default BlockTitle;
