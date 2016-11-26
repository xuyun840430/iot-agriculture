import React, {Component, PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const ApplicationBar = (props) => (
  <AppBar
    title={props.title}
    style={props.style}
    onLeftIconButtonTouchTap={props.onLeftIconButtonTouchTap}
    showMenuIconButton={props.showMenuIconButton}
    zDepth={0}
    titleStyle={{ fontFamily: 'Roboto, Microsoft YaHei' }}
    iconElementRight={
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
        <MenuItem primaryText="打开" />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="登出" />
      </IconMenu>
    }
    />
);


ApplicationBar.propTypes = {
  style: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  onLeftIconButtonTouchTap: PropTypes.func.isRequired
};
export default ApplicationBar;