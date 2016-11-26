import React, {Component, PropTypes} from 'react';
// import {parse} from 'react-docgen';
import Block from './Block';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';

class BlockContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    // code: PropTypes.string.isRequired,
    component: PropTypes.bool,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
  };

  static defaultProps = {
    component: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  render() {
    const {
      children,
      code,
      component,
      customizeBlockStyle,
      layoutSideBySide,
    } = this.props;

    const palette = this.context.muiTheme.rawTheme.palette;
    const canvasColor = palette.canvasColor;

    const styles = {
      root: {
        backgroundColor: canvasColor,
        marginBottom: 32,
        marginLeft: 40,
      },
      blockStyle: {
        borderRadius: '0 0 2px 0',
        padding: '14px 24px 24px',
        margin: 0,
        width: layoutSideBySide ? '45%' : null,
        float: layoutSideBySide ? 'right' : null,
      },
    };

    // const docs = component ? parse(code) : {};

    return (
      <Paper style={styles.root}>
        <Block title={this.props.title} menu={this.props.menu}>
          {/*code*/}
        </Block>
        <ClearFix style={Object.assign(styles.blockStyle, customizeBlockStyle)}>{children}</ClearFix>
      </Paper>
    );
  }
}

export default BlockContainer;
