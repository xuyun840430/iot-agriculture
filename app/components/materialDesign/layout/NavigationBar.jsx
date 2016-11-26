import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import {List, ListItem, MakeSelectable} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {spacing, typography, zIndex} from 'material-ui/styles';
import {cyan500, lightBlue900} from 'material-ui/styles/colors';

const SelectableList = MakeSelectable(List);

const styles = {
  logo: {
    cursor: 'pointer',
    fontSize: 20,
    color: typography.textFullWhite,
    lineHeight: `${spacing.desktopKeylineIncrement}px`,
    fontWeight: typography.fontWeightLight,
    backgroundColor: lightBlue900,
    paddingLeft: spacing.desktopGutter,
    marginBottom: 8,
  },
  version: {
    paddingLeft: spacing.desktopGutterLess,
    fontSize: 16,
  },
};

class AppNavDrawer extends Component {
  static propTypes = {
    docked: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired,
    onChangeList: PropTypes.func.isRequired,
    onRequestChangeNavDrawer: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
  };

  state = {
    muiVersions: [],
  };

  componentDidMount() {
    // const self = this;
    // const url = '/versions.json';
    // const request = new XMLHttpRequest();

    // request.onreadystatechange = function() {
    //   if (request.readyState === 4 && request.status === 200) {
    //     self.setState({
    //       muiVersions: JSON.parse(request.responseText),
    //       version: JSON.parse(request.responseText)[0],
    //     });
    //   }
    // };

    // request.open('GET', url, true);
    // request.send();
  }

  // firstNonPreReleaseVersion() {
  //   let version;
  //   for (let i = 0; i < this.state.muiVersions.length; i++) {
  //     version = this.state.muiVersions[i];
  //     // If the version doesn't contain '-' and isn't 'HEAD'
  //     if (!/-/.test(version) && version !== 'HEAD') {
  //       break;
  //     }
  //   }
  //   return version;
  // }

  // handleVersionChange = (event, index, value) => {
  //   if (value === this.firstNonPreReleaseVersion()) {
  //     window.location = 'http://www.material-ui.com/';
  //   } else {
  //     window.location = `http://www.material-ui.com/${value}`;
  //   }
  // };

  // currentVersion() {
  //   if (window.location.hostname === 'localhost') return this.state.muiVersions[0];
  //   if (window.location.pathname === '/') {
  //     return this.firstNonPreReleaseVersion();
  //   } else {
  //     return window.location.pathname.replace(/\//g, '');
  //   }
  // }

  // handleRequestChangeLink = (event, value) => {
  //   window.location = value;
  // };

  handleTouchTapHeader = () => {
    // this.context.router.push('/home');
    this.props.onRequestChangeNavDrawer(false);
  };

  render() {
    const {
      location,
      docked,
      onRequestChangeNavDrawer,
      onChangeList,
      open,
      style,
    } = this.props;

    return (
      <Drawer
        style={style}
        docked={docked}
        open={open}
        onRequestChange={onRequestChangeNavDrawer}
        // containerStyle={{ zIndex: zIndex.drawer - 100 }}
        >

        <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
          农业物联网管理平台
        </div>

        <SelectableList value={location.pathname} onChange={onChangeList} >
          <ListItem primaryText="农庄信息" value="/farmInfo" href="/#/farmInfo" />
          <ListItem primaryText="地块信息" value="/landblockInfo" href="/#/landblockInfo" />
          <ListItem
            primaryText="区域监控"
            primaryTogglesNestedList={true}
            nestedItems={[
              <ListItem
                primaryText="航育基地" value="/botanicBase" href="/#/botanicBase"
                primaryTogglesNestedList={true}
                nestedItems={[
                  <ListItem
                    primaryText="1#连栋温室"
                    primaryTogglesNestedList={true}
                    nestedItems={[
                      <ListItem primaryText="1#土壤温度" value="/sensorDetailData" href="/#/sensorDetailData/1_soiltemperature"/>,
                      <ListItem primaryText="1#土壤湿度" value="/sensorDetailData" href="/#/sensorDetailData/1_soilhumidity"/>,
                      <ListItem primaryText="1#大气温度" value="/sensorDetailData" href="/#/sensorDetailData/1_atmostemperature"/>,
                      <ListItem primaryText="1#空气湿度" value="/sensorDetailData" href="/#/sensorDetailData/1_atmoshumidity"/>,
                      <ListItem primaryText="1#光照强度" value="/sensorDetailData" href="/#/sensorDetailData/1_illuminance"/>,
                      <ListItem primaryText="1#二氧化碳" value="/sensorDetailData" href="/#/sensorDetailData/1_co2concentration"/>,
                    ]}/>,
                  <ListItem
                    primaryText="2#连栋温室"
                    primaryTogglesNestedList={true}
                    nestedItems={[
                      <ListItem primaryText="2#土壤温度" value="/sensorDetailData" href="/#/sensorDetailData/2_soiltemperature"/>,
                      <ListItem primaryText="2#土壤湿度" value="/sensorDetailData" href="/#/sensorDetailData/2_soilhumidity"/>,
                      <ListItem primaryText="2#大气温度" value="/sensorDetailData" href="/#/sensorDetailData/2_atmostemperature"/>,
                      <ListItem primaryText="2#空气湿度" value="/sensorDetailData" href="/#/sensorDetailData/2_atmoshumidity"/>,
                      <ListItem primaryText="2#光照强度" value="/sensorDetailData" href="/#/sensorDetailData/2_illuminance"/>,
                      <ListItem primaryText="2#二氧化碳" value="/sensorDetailData" href="/#/sensorDetailData/2_co2concentration"/>,
                    ]}/>,
                ]}
                />,
            ]}
            />
          <ListItem primaryText="自动控制" value="/testComponents" href="/#/testComponents" />
          <ListItem primaryText="控制记录" value="/testComponents" href="/#/testComponents" />
          <ListItem primaryText="设备控制" value="/testComponents" href="/#/testComponents" />
        </SelectableList>
      </Drawer>
    );
  }
}

export default AppNavDrawer;
