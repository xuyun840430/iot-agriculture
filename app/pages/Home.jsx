import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FullWidthSection from '../layout/FullWidthSection';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import { grey100, cyan500, cyan300, grey200, darkWhite, lightWhite, grey900, lightBlue900, transparent } from 'material-ui/styles/colors';

// Material-UI components
import Paper from 'material-ui/Paper';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import withWidth, { LARGE } from 'material-ui/utils/withWidth';

// Import user defined modules
import HomeFeature from './HomeFeature';
import LoginRegisterDialog from '../components/materialDesign/dialog/LoginRegisterDialog'
import RegisterDialog from '../components/materialDesign/dialog/RegisterDialog'
import { manualLogin, toggleLoginMode, signUp, userInfoRest } from '../actions/users';

class HomePage extends Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    width: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    // Initialize react state variables
    this.state = {
      canSubmit: false,
      showLoginRegisterDialog: false,
      // showRegisterDialog: false,
    };

  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  /* Set page mui theme */
  static childContextTypes = {
    muiTheme: PropTypes.object,
  };

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  componentWillMount() {
    // Customized style override
    this.setState({
      muiTheme: getMuiTheme({
        fontFamily: 'Roboto, Microsoft YaHei', // Set global font styles
        tabs: {
          backgroundColor: transparent,
          textColor: grey900,
          selectedTextColor: lightBlue900
        },
        inkBar: {
          backgroundColor: lightBlue900
        },
      }),
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({
      muiTheme: newMuiTheme,
    });
  }

  handleChangeMuiTheme = (muiTheme) => {
    this.setState({
      muiTheme: muiTheme,
    });
  };

  homePageHero() {
    const styles = {
      root: {
        backgroundColor: lightBlue900,
        overflow: 'hidden',
      },
      svgLogo: {
        marginLeft: window.innerWidth * 0.5 - 130,
        width: 420,
        height: 157,
      },
      tagline: {
        margin: '16px auto 0 auto',
        textAlign: 'center',
        maxWidth: 575,
      },
      label: {
        color: lightBaseTheme.palette.primary1Color,
        fontSize: 16,
      },
      githubStyle: {
        margin: '16px 32px 0px 8px',
      },
      buttonStyle: {
        margin: '16px 32px 0px 32px',
      },
      h1: {
        color: darkWhite,
        fontWeight: typography.fontWeightLight,
        fontFamily: 'Roboto, Microsoft YaHei',
      },
      h2: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
      },
      nowrap: {
        whiteSpace: 'nowrap',
      },
      taglineWhenLarge: {
        marginTop: 32,
      },
      h1WhenLarge: {
        fontSize: 56,
      },
      h2WhenLarge: {
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
      },
    };

    styles.h2 = Object.assign({}, styles.h1, styles.h2);

    // if (this.props.width === LARGE) {
    //   styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge);
    //   styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge);
    //   styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge);
    // }


    return (
      <FullWidthSection style={styles.root}>
        <img style={styles.svgLogo} src="styles/img/material-ui-logo.svg" />
        <div style={styles.tagline}>
          <h1 style={styles.h1}>农业物联网管理平台</h1>
          <h2 style={styles.h2}>
            构建一体化的农业物联网管理平台
          </h2>

          <RaisedButton
            className="demo-button"
            label="登录"
            onTouchTap={this.handleLoginRegisterDialogOpen}
            style={styles.buttonStyle}
            labelStyle={styles.label}
            />

        </div>
      </FullWidthSection>
    );
  }

  homePurpose() {
    const styles = {
      root: {
        backgroundColor: grey200,
      },
      content: {
        maxWidth: 700,
        padding: 0,
        margin: '0 auto',
        fontWeight: typography.fontWeightLight,
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        color: typography.textDarkBlack,
      },
    };

    return (
      <FullWidthSection
        style={styles.root}
        useContent={true}
        contentStyle={styles.content}
        contentType="p"
        className="home-purpose"
        >
        插件仓库提供了众多开发框架和系统服务，使您只需关注自己的商业逻辑，以“搭积木”方式来开发软件，加速应用程序的开发部署。
      </FullWidthSection>
    );
  }

  // processSubmitData = () => {
  //   // const { onSubmit } = this.props;

  //   // // Set submit data to callback function
  //   // onSubmit({
  //   //   pluginname: this.refs.pluginName.getValue(),
  //   //   symbolicname: this.refs.pluginSymblicName.getValue(),
  //   //   category: this.state.pluginType,
  //   //   version: this.refs.pluginVersion.getValue(),
  //   //   date: this.state.date,
  //   //   inputfile: this.refs.fileUpload.files[0],
  //   //   description: this.refs.pluginDescription.getValue()
  //   // });
  // }

  homeLogin() {
    const styles = {
      root: {
        backgroundColor: grey200,
        textAlign: 'center',
      },
      h3: {
        margin: 0,
        padding: 0,
        fontWeight: typography.fontWeightLight,
        fontSize: 22,
        fontFamily: 'Roboto, Microsoft YaHei',
      },
      button: {
        marginTop: 32,
      },
      paper: {
        backgroundColor: grey100,
        height: 250,
        width: 400,
        margin: -60,
        textAlign: 'center',
        display: 'inline-block',
      }
    };

    return (
      <FullWidthSection useContent={true} contentStyle={styles.root}>




      </FullWidthSection>
    );
  }

  homeFeatures() {
    const styles = { maxWidth: 906 };

    return (
      <FullWidthSection useContent={true} contentStyle={styles}>
        <HomeFeature
          heading="开始使用"
          route="/login"
          img="styles/img/get-started.svg"
          firstChild={true}
          />
        <HomeFeature
          heading="定制化插件"
          route="/customization"
          img="styles/img/css-framework.svg"
          />
        <HomeFeature
          heading="插件仓库"
          route="/components"
          img="styles/img/components.svg"
          lastChild={true}
          />
      </FullWidthSection>
    );
  }

  homeContribute() {
    const styles = {
      root: {
        backgroundColor: grey200,
        textAlign: 'center',
      },
      h3: {
        margin: 0,
        padding: 0,
        fontWeight: typography.fontWeightLight,
        fontSize: 22,
        fontFamily: 'Roboto, Microsoft YaHei',
      },
      button: {
        marginTop: 32,
      },
    };

    return (
      <FullWidthSection useContent={true} style={styles.root}>
        <h3 style={styles.h3}>
          想要更多地了解插件开发模式和方法？
        </h3>
        <RaisedButton
          label="网站信息"
          primary={true}
          href="https://github.com/callemall/material-ui"
          style={styles.button}
          />
      </FullWidthSection>
    );
  }


  /**************** Event Handler ****************/

  /* User login dialog */
  handleLoginRegisterDialogOpen = () => {
    this.setState({ showLoginRegisterDialog: true });
  }

  handleLoginSubmit = (data) => {
    const { dispatch } = this.props;

    // Get login success (authenticated) or not from user reducer
    const { authenticated } = this.props.user;

    // Load data from LoginRegisterDialog sub module
    const username = data.username;
    const password = data.password;

    // Dispatch login event
    dispatch(manualLogin({
      username: username,
      password: password
    }));

    if (authenticated) {
      // Close user login modal
      this.setState({ showLoginRegisterDialog: false });
    }
  }

  handleRegisterSubmit = (data) => {

    const { dispatch } = this.props;

    var errMsg = '';
    const registername = data.registername;
    const registerpsw = data.registerpsw;
    const pswconfirm = data.pswconfirm;
    const lastname = data.lastname;
    const firstname = data.firstname;
    const gender = "未知";
    const specialty = "未知";

    // Send message to user controller and show the no validation error
    // if (!(username || username.length > 0) ||
    //   !(password || password.length > 0) ||
    //   !(passwordConfirm || passwordConfirm.length > 0)) {
    //   errMsg = '请输入用户名和密码';

    // } else if (!(firstname || firstname.length > 0) ||
    //   !(lastname || lastname.length > 0)) {
    //   errMsg = '请输入用户姓名'
    // }

    if (pswconfirm !== registerpsw) {
      errMsg = '请确定密码一致性'
    }

    dispatch(signUp({
      username: registername,
      password: registerpsw,
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      specialty: specialty
    }, errMsg));
  }

  handleModeToggle = () => {
    // Change login or register mode of LoginRegister dialog
    const { dispatch } = this.props;
    dispatch(toggleLoginMode());
  }

  handleCancel = () => {
    const { dispatch } = this.props;

    // Reset redux store fields and close modal
    dispatch(userInfoRest());
    this.setState({ showLoginRegisterDialog: false });
  }

  /* User register dialog */
  // handleRegisterDialogOpen = () => {
  //   this.setState({ showRegisterDialog: true });
  // }

  // handleRegisterDialogSubmit = (data) => {
  //   // const { dispatch } = this.props;

  //   // // Get login success (authenticated) or not from user reducer
  //   // const { authenticated } = this.props.user;

  //   // // Load data from LoginRegisterDialog sub module
  //   // const username = data.username;
  //   // const password = data.password;

  //   // // Dispatch login event
  //   // dispatch(manualLogin({
  //   //   username: username,
  //   //   password: password
  //   // }));

  //   // if (authenticated) {
  //   //   // Close user login modal
  //   //   this.setState({ showLoginRegisterDialog: false });
  //   // }
  // }

  // handleRegisterDialogCancel = () => {
  //   const { dispatch } = this.props;

  //   // Reset redux store fields and close modal
  //   // dispatch(userInfoRest());
  //   this.setState({ showRegisterDialog: false });
  // }

  render() {
    const style = {
      paddingTop: spacing.desktopKeylineIncrement,
    };

    // Get login message from reducer
    const { message, isLogin } = this.props.user;

    return (
      <div style={style}>
        {this.homePageHero()}
        {/*{this.homePurpose() }*/}
        {/*{this.homeLogin()}*/}
        {this.homeFeatures()}
        {/*{this.homeContribute()}*/}

        <LoginRegisterDialog
          isLoginMode={isLogin}
          open={this.state.showLoginRegisterDialog}
          message={message}
          onLoginSubmit={this.handleLoginSubmit}
          onRegisterSubmit={this.handleRegisterSubmit}
          onModeToggle={this.handleModeToggle}
          onCancel={this.handleCancel}
          />
        {/*
        <RegisterDialog
          open={this.state.showRegisterDialog}
          registerMessage={message}
          onSubmit={this.handleRegisterDialogSubmit}
          onCancel={this.handleRegisterDialogCancel}
          />
        */}
      </div>
    );
  }
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    user: state.user
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(withWidth()(HomePage)); //withWidth()(HomePage)
