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

class LoginDialog extends Component {

  static propTypes = {
    isLoginMode: PropTypes.bool.isRequired,
    open: PropTypes.bool.isRequired,
    onLoginSubmit: PropTypes.func.isRequired,
    onRegisterSubmit: PropTypes.func.isRequired,
    onModeToggle: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
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
    this.vChnChar = new InputValidation("chineseChr");
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

  processLoginSubmitData = () => {
    const { onLoginSubmit } = this.props;

    // Set login submit data to callback function
    onLoginSubmit({
      username: this.refs.username.getValue(),
      password: this.refs.password.getValue(),
    });
  }

  processRegisterSubmitData = () => {
    const { onRegisterSubmit } = this.props;

    // Set register submit data to callback function
    onRegisterSubmit({
      registername: this.refs.registername.getValue(),
      registerpsw: this.refs.registerpsw.getValue(),
      pswconfirm: this.refs.pswconfirm.getValue(),
      lastname: this.refs.lastname.getValue(),
      firstname: this.refs.firstname.getValue(),
    });
  }

  renderAsLoginDialog() {
    const {
      message,
    } = this.props;

    return (
      <div>
        <h1 style={styles.h1}>用户登录</h1>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
          >
          <ResponsiveReactGridLayout className="layout-login" isDraggable={false} isResizable={false}
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
              <p style={{ fontSize: 14, color: red500 }}>
                {message}
              </p>
            </div>

          </ResponsiveReactGridLayout>
        </Formsy.Form>
      </div>
    )
  }

  renderAsRegisterDialog() {
    const {
      message,
    } = this.props;

    return (
      <div>
        <h1 style={styles.h1}>用户注册</h1>
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
          >
          <ResponsiveReactGridLayout className="layout-register" isDraggable={false} isResizable={false}
            rowHeight={30}
            breakpoints={{ lg: 400, md: 332, sm: 256, xs: 160, xxs: 0 }}
            cols={{ lg: 5, md: 3, sm: 2, xs: 2, xxs: 1 }}
            >
            <div key="home-4" _grid={{ x: 0.5, y: 0, w: 1, h: 2 }}>
              <FormsyText
                ref="registername"
                name="registername"
                hintText="Email地址"
                floatingLabelText="用户名"
                validations="email"
                validationError={this.vEmail.getMsg()}
                required
                />
            </div>
            <div key="home-5" _grid={{ x: 0.5, y: 1, w: 1, h: 2 }}>
              <FormsyText
                ref="registerpsw"
                name="registerpsw"
                type="password"
                hintText="至少6位密码"
                floatingLabelText="密码"
                validations="password"
                validationError={this.vPassword.getMsg()}
                required
                />
            </div>
            <div key="home-6" _grid={{ x: 0.5, y: 2, w: 1, h: 2 }}>
              <FormsyText
                ref="pswconfirm"
                name="pswconfirm"
                type="password"
                hintText="至少6位密码"
                floatingLabelText="密码确认"
                validations="password"
                validationError={this.vPassword.getMsg()}
                required
                />
            </div>
            <div key="home-7" _grid={{ x: 2.5, y: 0, w: 1, h: 2 }}>
              <FormsyText
                ref="lastname"
                name="lastname"
                hintText="姓氏"
                floatingLabelText="姓"
                validations="chineseChr"
                validationError={this.vChnChar.getMsg()}
                required
                />
            </div>
            <div key="home-8" _grid={{ x: 2.5, y: 1, w: 1, h: 2 }}>
              <FormsyText
                ref="firstname"
                name="firstname"
                hintText="名字"
                floatingLabelText="名"
                validations="chineseChr"
                validationError={this.vChnChar.getMsg()}
                required
                />
            </div>
             <div key="home-9" _grid={{ x: 2.5, y: 2, w: 1, h: 1 }}>
              <p style={{ fontSize: 14, color: red500 }}>
                {message}
              </p>
            </div>

          </ResponsiveReactGridLayout>
        </Formsy.Form>
      </div>
    )
  }

  render() {
    const {
      isLoginMode,
      open,
      onCancel,
      onModeToggle,
    } = this.props;

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label={isLoginMode === true ? "用户注册" : '用户登录'}  
        primary={true}
        onTouchTap={onModeToggle}
        />,
      <FlatButton
        label={isLoginMode === true ? '登录' : '注册'}
        primary={true}
        keyboardFocused={true}
        disabled={!this.state.canSubmit}
        onTouchTap={isLoginMode === true ? this.processLoginSubmitData : this.processRegisterSubmitData}      
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
          {
            isLoginMode === true ?
            this.renderAsLoginDialog() :
            this.renderAsRegisterDialog()
          }

        </Dialog>
      </div>
    );
  }
}

export default LoginDialog;