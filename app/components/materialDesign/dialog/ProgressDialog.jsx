import React, {Component, PropTypes} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


var styles = {
  dialogTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  progress: {
    marginLeft:'47%'
  },
}

/**
 * Inform data/action process progress situation.
 */
class ProgressDialog extends Component {

  render() {

    return (
      <Dialog
        title="正在处理"
        titleStyle={styles.dialogTitle}
        modal={true}
        open={this.props.open}
        >
        <CircularProgress style={styles.progress} size={1.0}/>
      </Dialog>
    );
  }
}

ProgressDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default ProgressDialog;
