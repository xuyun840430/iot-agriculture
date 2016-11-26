import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router';

// Material-UI components
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

// Material-UI formsy
import Formsy from 'formsy-react';
import {
  FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
  FormsySelect, FormsyText, FormsyTime, FormsyToggle
} from 'formsy-material-ui/lib';

// React-grid-layout for layout
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Import user defined modules
import InputValidation from '../utility/InputValidation'

// Icons and colors
import { grey100, red500 } from 'material-ui/styles/colors';

// Customize styles 
var styles = {
  h1: {
    fontSize: 24,
    fontFamily: 'Roboto, Microsoft YaHei',
    textAlign: 'center',
  }
}

class RegisterDialog extends Component {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    registerMessage: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    // Initialize react state variables
    this.state = {
      canSubmit: false,
      username: '',
      password: '',
    };

    // Create input field validation instance
    this.vEmail = new InputValidation("email");
    this.vPassword = new InputValidation("password");
  }

  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  /* Form validation control */
  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm = (data) => {
    alert(JSON.stringify(data, null, 4));
  }

  notifyFormError = (data) => {
    console.error('Form error:', data);
  }

  processSubmitData = () => {
    const { onSubmit } = this.props;

    // Set submit data to callback function
    onSubmit({
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
    });
  }

  render() {
    const {
      open,
      onCancel,
      registerMessage,
    } = this.props;

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label="登录"
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.canSubmit}
        onTouchTap={this.processSubmitData}
        />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.handleClose}
          >
          <h1 style={styles.h1}>用户注册</h1>

          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.submitForm}
            onInvalidSubmit={this.notifyFormError}
            >
            <ResponsiveReactGridLayout className="layout" isDraggable={false} isResizable={false}
              rowHeight={30}
              breakpoints={{ lg: 400, md: 332, sm: 256, xs: 160, xxs: 0 }}
              cols={{ lg: 3, md: 1, sm: 1, xs: 1, xxs: 1 }}
              >
              <div key="home-1" _grid={{ x: 1, y: 0, w: 1, h: 2 }}>
                <FormsyText
                  ref="username"
                  name="username"
                  hintText="Email地址"
                  floatingLabelText="用户名"
                  value={this.state.username}
                  onChange={this.handleUsernameChange}
                  validations="email"
                  validationError={this.vEmail.getMsg()}
                  required
                  />
              </div>
              <div key="home-2" _grid={{ x: 1, y: 1, w: 1, h: 2.5 }}>
                <FormsyText
                  ref="password"
                  name="password"
                  type="password"
                  hintText="至少6位密码"
                  floatingLabelText="密码"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  validations="password"
                  validationError={this.vPassword.getMsg()}
                  required
                  />
              </div>

              <div key="home-3" _grid={{ x: 1, y: 2, w: 1, h: 1 }}>
                <p style={{fontSize:14, color: red500}}>
                  {registerMessage}
                </p>
              </div>

              <div key="home-4" _grid={{ x: 1, y: 3, w: 1, h: 1 }}>
                <p>
                  <Link to="/login">忘记密码</Link>
                </p>
              </div>

              <div key="home-5" _grid={{ x: 1, y: 4, w: 1, h: 1 }}>
                <p>
                  <Link to="/login">账号注册</Link>
                </p>
              </div>

            </ResponsiveReactGridLayout>
          </Formsy.Form>

        </Dialog>
      </div>
    );
  }
}

export default RegisterDialog;