import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// Material-UI component
import { Dialog, FlatButton, TextField, DatePicker }from 'material-ui';
import { SelectField, MenuItem }from 'material-ui';

var styles = {
  dialogTitle: {
    fontSize: 20,
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  customContentStyle: {
    width: '100%',
    maxWidth: 'none',
    textAlign: 'center',
    fontSize: 20,
  },
}

/**
 * Confirm Dialog Class
 */
class ConfirmDialog extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    cancelLabel: PropTypes.string.isRequired,
    defaultInfo: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

  }

  componentWillReceiveProps() {

  }

  render() {

    const {
      title,
      open,
      submitLabel,
      cancelLabel,
      onSubmit,
      onCancel,
      defaultInfo
    } = this.props;

    const actions = [
      <FlatButton
        label={cancelLabel}
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label={submitLabel}
        primary={true}
        onTouchTap={onSubmit}
        />
    ];

    return (
      <Dialog
        title={title}
        titleStyle={styles.dialogTitle}
        contentStyle={styles.customContentStyle}
        actions={actions}
        modal={true}
        open={open}
        onRequestClose={this.handleClose}
        >
        { defaultInfo.text } 
      </Dialog>
    );
  }
}

export default ConfirmDialog;