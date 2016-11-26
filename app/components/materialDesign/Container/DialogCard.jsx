import React, {Component, PropTypes} from 'react';

// Material-UI component
import { Dialog }from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';



/**
 * Inform data/action process progress situation.
 */
class DialogCard extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
    titleStyle: PropTypes.object,
    dialogContentStyle: PropTypes.object,
    avatar: PropTypes.node,
    subtitle: PropTypes.string,
    actions: PropTypes.array.isRequired,
    open: PropTypes.bool.isRequired,
    isModal: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {

    const {
      children,
      isModal,
      title,
      titleStyle,
      dialogContentStyle,
      avatar,
      subtitle,
      open,
      actions,
    } = this.props;

    return (
      <Dialog
        contentStyle={dialogContentStyle}
        actions={actions}
        modal={isModal}
        open={open}
        onRequestClose={this.handleClose}
        >
        <Card>
          <CardHeader
            title={title}
            titleStyle={ titleStyle }
            avatar={ avatar }
            subtitle={subtitle}
            />
          <CardText>
            { children }
          </CardText>
        </Card>
      </Dialog>

    );
  }
}

export default DialogCard;