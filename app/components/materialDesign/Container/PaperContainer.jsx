import React, {Component, PropTypes} from 'react';
import Block from './Block';
import ClearFix from 'material-ui/internal/ClearFix';
import Paper from 'material-ui/Paper';


/**
 * Pure paper container adjust to project layout with out title and toolbar
 */
class PaperContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    component: PropTypes.bool,
    layoutSideBySide: PropTypes.bool,
    title: PropTypes.string,
    zDepth: PropTypes.number,
    style: PropTypes.object,
    customizeBlockStyle: PropTypes.object,
    toolbarMenu: PropTypes.node,
  };

  static defaultProps = {
    component: true,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  render() {
    const {
      style,
      children,
      code,
      component,
      customizeBlockStyle,
      layoutSideBySide,
      toolbarMenu,
      zDepth,
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

    return (
      <Paper style={Object.assign({}, styles.root, style) } zDepth={zDepth}>
        {toolbarMenu}
        <ClearFix style={Object.assign(styles.blockStyle, customizeBlockStyle) }>{children}</ClearFix>
      </Paper>
    );
  }
}

export default PaperContainer;
