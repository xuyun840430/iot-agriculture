import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

// import BigBreadcrumbs from '../components/smartAdmin/layout/navigation/components/BigBreadcrumbs.jsx'
// import JarvisWidget from '../components/smartAdmin/layout/widgets/JarvisWidget.jsx'
// import WidgetGrid from '../components/smartAdmin/layout/widgets/WidgetGrid.jsx'
// import UiValidate from '../components/smartAdmin/forms/validation/UiValidate.jsx'
// import Wizard from '../components/smartAdmin/forms/wizards/Wizard.jsx'

// import { generatePluginWithTemplate } from '../../../actions/generators'

// React-grid-layout for layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI components
import { Avatar, Dialog, FlatButton, TextField, DatePicker } from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { SelectField, MenuItem }from 'material-ui';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';

// Icons and colors
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {fullWhite} from 'material-ui/styles/colors';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { blue400 } from 'material-ui/styles/colors';

// Customized module
import DialogCard from '../Container/DialogCard'


// Plugin types to select field
const pluginTypes = [
  <MenuItem key={1} value="核心插件" primaryText="核心插件" />,
  <MenuItem key={2} value="显示插件" primaryText="显示插件" />,
  <MenuItem key={3} value="通信插件" primaryText="通信插件" />,
  <MenuItem key={4} value="辅助插件" primaryText="辅助插件" />,
];

/**
 * Styles for React component
 */
var styles = {
  stepper: {
    // marginTop: 15
  },
  stepperLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subhead: {
    fontSize: 16,
    marginLeft: -10,
    fontWeight: 'bold'
  },
  checkbox: {
    fontSize: 15,
  },
  contentStyle: {
    // position: 'fixed',
    position: 'relative',
    // position: 'absolute',
    width: '100%',
    height: 900,
    maxHeight: 'none',
    maxWidth: 996,
    // marginTop: '-10%',
  },
}

// let validateOptions = {
// 	highlight: function (element) {
// 		$(element).closest('.form-group').removeClass('has-success').addClass('has-error');
// 	},
// 	unhighlight: function (element) {
// 		$(element).closest('.form-group').removeClass('has-error').addClass('has-success');
// 	},
// 	errorElement: 'span',
// 	errorClass: 'help-block'
// };

class CodeGeneratorDialog extends Component {

  // static propTypes = {
  //   generators: PropTypes.object,
  //   dispatch: PropTypes.func
  // };

  constructor(props) {
    super(props);

    // Function called from events (e.g. 'click', 'submit'...) must be bound to 'this' class,
    // Otherwise fields in 'this.props' is NOT avaiable
    // this.onDownloadPlugin = this.onDownloadPlugin.bind(this);
    // this.onChangePluginName = this.onChangePluginName.bind(this);
    // this.onCurruntStepChange = this.onCurruntStepChange.bind(this);

    // Initialize variables
    this.dataToServer = {};

    // Initialize react state variables
    this.state = {
      // pluginname: '',
      pluginName: '',
      pluginType: null,
      loading: false,
      finished: false,
      stepIndex: 0,
    };
  }

  componentDidMount() {

  }

  // Deconstructor
  componentWillUnmount() {

  }

  // onDownloadPlugin(data) {
  // 	// TODO: Download from server

  // 	// const { dispatch } = this.props;
  // 	// dispatch(generatePluginWithTemplate(data));
  // 	// console.log('wizard submit stuff', data);

  // 	let pluginsymblicname = ReactDOM.findDOMNode(this.refs.pluginsymblicname).value;
  // 	let url = '/pluginCodeGenerator/download/' + pluginsymblicname;
  //   window.location = url;
  //   window.open(url, '_self');

  // 	// console.log('/<------ Compress files into zip file ------>/');
  // 	// var JSZip = require("jszip");
  // 	// var zip = new JSZip();
  // 	// zip.file("Hello.txt", "Hello World\n");
  // 	// // var img = zip.folder("images");
  // 	// // img.file("smile.gif", imgData, { base64: true });
  // 	// zip.generateAsync({ type: "blob" })
  // 	// 	.then(function (content) {
  // 	// 		// see FileSaver.js
  // 	// 		saveAs(content, "example.zip");
  // 	// 	});

  // }

  // onCurruntStepChange(step) {
  // 	// this.currentStep = step;
  // 	const { dispatch } = this.props;

  // 	// Before download step, send data to server-side to generate downloadable plugin code
  // 	if (step === 3) {
  // 		dispatch(generatePluginWithTemplate({
  // 			pluginauthor: ReactDOM.findDOMNode(this.refs.pluginauthor).value,
  // 			pluginintrod: ReactDOM.findDOMNode(this.refs.pluginintrod).value,
  // 			pluginname: ReactDOM.findDOMNode(this.refs.pluginname).value,
  // 			pluginsymblicname: ReactDOM.findDOMNode(this.refs.pluginsymblicname).value,
  // 			plugintype: ReactDOM.findDOMNode(this.refs.plugintype).value,
  // 			pluginversion: ReactDOM.findDOMNode(this.refs.pluginversion).value,
  // 			pluginwebsite: ReactDOM.findDOMNode(this.refs.pluginwebsite).value,
  // 		}));
  // 	}
  // }

  // onChangePluginName(event) {
  // 	this.setState({
  // 		pluginname: event.currentTarget.value
  // 	});
  // }

  stepperDataProcess(stepIndex) {
    // const { dispatch } = this.props;
    const { onSubmit } = this.props;

    switch (stepIndex) {
      case 0:
        this.dataToServer = {
          pluginauthor: this.refs.pluginAuthor.getValue(),
          pluginintrod: this.refs.pluginDescription.getValue(),
          pluginname: this.refs.pluginName.getValue(),
          pluginsymblicname: this.refs.pluginSymblicName.getValue(),
          plugintype: this.state.pluginType,
          pluginversion: this.refs.pluginVersion.getValue(),
          pluginwebsite: this.refs.pluginWebsite.getValue(),
        }
        break;

      // Send plugin info to server in 2nd. step to prepare download file 
      case 1:
        // dispatch(generatePluginWithTemplate(this.dataToServer));
        // Set submit data to callback function to send to server
        onSubmit(this.dataToServer);
        break;

      default:
        break;
    }
  }

  dummyAsync = (cb) => {
    this.setState({ loading: true }, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;

    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }

    // Process data in every step 
    this.stepperDataProcess(stepIndex);
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

	 handlePluginTypeChange = (event, index, value) => {
    this.setState({ pluginType: value });
  }

  handlePluginNameChange = (event) => {
    this.setState({ pluginName: event.target.value });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <ResponsiveReactGridLayout className="layout_pcg" isDraggable={false} isResizable={false}
            rowHeight={50}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 2, xs: 1, xxs: 1 }}
            >
            <div key="pcg-1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
              <TextField
                ref="pluginName"
                onChange={this.handlePluginNameChange}
                hintText="Radar3D"
                floatingLabelText="英文名称"
                />
            </div>

            <div key="pcg-2" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
              <TextField
                disabled={true} 
                value={'com.plugins.' + this.state.pluginName}
                // onChange={this.handlePluginSymblicNameChange}
                ref="pluginSymblicName"
                hintText="com.plugins.Radar3D"
                floatingLabelText="标识"
                />
            </div>

            <div key="pcg-3" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
              <TextField
                defaultValue="1.0.0"
                ref="pluginVersion"
                hintText="1.0.0"
                floatingLabelText="版本号"
                />
            </div>

            <div key="pcg-4" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
              <SelectField
                ref="pluginType"
                value={this.state.pluginType}
                onChange={this.handlePluginTypeChange}
                floatingLabelText="类型"
                floatingLabelFixed={true}
                >
                {pluginTypes}
              </SelectField>
            </div>

            <div key="pcg-5" _grid={{ x: 0, y: 2, w: 1, h: 1 }}>
              <TextField
                ref="pluginAuthor"
                hintText="姓名"
                floatingLabelText="作者"
                />
            </div>

            <div key="pcg-6" _grid={{ x: 1, y: 2, w: 1, h: 1 }}>
              <TextField
                defaultValue="http://localhost:3030/"
                ref="pluginWebsite"
                hintText="http://localhost:3030/"
                floatingLabelText="访问地址"
                />
            </div>

            <div key="pcg-7" _grid={{ x: 0, y: 3, w: 3, h: 2 }}>
              <TextField
                ref="pluginDescription"
                fullWidth={true}
                floatingLabelText="简介"
                multiLine={true}
                rows={2}
                rowsMax={4}
                />
            </div>
          </ResponsiveReactGridLayout>

        );
      case 1:
        return (
          <ResponsiveReactGridLayout className="layout_pcg" isDraggable={false} isResizable={false}
            rowHeight={50}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 }}
            >

            <div key="pcg-9" _grid={{ x: 0, y: 0, w: 4, h: 1 }}>
              <Subheader style={styles.subhead}>插件生成设置</Subheader>
              <Divider />
            </div>

            <div key="pcg-10" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="插件框架" />
            </div>

            <div key="pcg-11" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="核心插件" />
            </div>

            <div key="pcg-12" _grid={{ x: 2, y: 1, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="数据通信插件" />
            </div>

            <div key="pcg-13" _grid={{ x: 3, y: 1, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="数据通信插件" />
            </div>

            <div key="pcg-14" _grid={{ x: 0, y: 2, w: 4, h: 1 }}>
              <Subheader style={styles.subhead}>第三方库依赖</Subheader>
              <Divider />
            </div>

            <div key="pcg-15" _grid={{ x: 0, y: 3, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="QWT" />
            </div>

            <div key="pcg-16" _grid={{ x: 1, y: 3, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="Boost" />
            </div>

            <div key="pcg-17" _grid={{ x: 2, y: 3, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="GDAL" />
            </div>

            <div key="pcg-18" _grid={{ x: 3, y: 3, w: 1, h: 1 }}>
              <Checkbox labelStyle={styles.checkbox} label="OpenGL" />
            </div>

          </ResponsiveReactGridLayout>

        );
      case 2:
        return (
          <p style={{ fontSize: 16 }}>
            完成插件代码生成，请点击下载按钮下载插件。
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = { margin: '0 16px', overflow: 'hidden' };

    // Process data to download when finished
    if (finished) {

      let pluginsymblicname = this.dataToServer.pluginsymblicname;
      let url = '/pluginCodeGenerator/download/' + pluginsymblicname;
      window.location = url;
      window.open(url, '_self');

      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({ stepIndex: 0, finished: false });
              } }
              >
              点击这里
            </a> 重置插件生成向导。
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{ this.getStepContent(stepIndex) }</div>

        {/*
        <div style={{ marginTop: 50, marginBottom: 12 }}>
          <FlatButton
            label="上一步"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{ marginRight: 12 }}
            />
          <RaisedButton
            label={stepIndex === 2 ? '下载' : '下一步'}
            primary={true}
            onTouchTap={this.handleNext}
            />
        </div>
        */}
      </div>
    );
  }

  render() {

    const {
      title,
      open,
      onCancel,
      defaultInfo
    } = this.props;

    const {loading, stepIndex} = this.state;
    // const toolBarMenu = (
    //   <ToolbarGroup >
    //     <ToolbarTitle text="操作" />
    //     <FontIcon className="muidocs-icon-custom-sort" />
    //     <ToolbarSeparator />

    //     <IconMenu
    //       iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    //       onChange={this.handleChangeSingle}
    //       value={this.state.valueSingle}
    //       >
    //       <MenuItem value="1" primaryText="Refresh" />
    //       <MenuItem value="2" primaryText="Send feedback" />
    //       <MenuItem value="3" primaryText="Settings" />
    //       <MenuItem value="4" primaryText="Help" />
    //       <MenuItem value="5" primaryText="Sign out" />
    //     </IconMenu>

    //   </ToolbarGroup>);

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label="上一步"
        disabled={stepIndex === 0}
        onTouchTap={this.handlePrev}
        style={{ marginRight: 12 }}
        />,
      <RaisedButton
        label={stepIndex >= 2 ? '下载' : '下一步'}
        primary={true}
        onTouchTap={this.handleNext}
        />
    ];

    return (
      <div id="content">
        <div>
          <DialogCard
            title={title}
            titleStyle={{ fontSize: 20, color: blue400 }}
            dialogContentStyle={styles.contentStyle}
            avatar={ <Avatar icon={<FileFolder />}/> }
            subtitle="请填写插件生成信息"
            actions={actions}
            isModal={true}
            open={open}
            >
            <div style={{ width: '100%', maxWidth: 996, margin: 'auto' }}>
              <Stepper style={styles.stepper} activeStep={stepIndex} >
                <Step>
                  <StepLabel style={styles.stepperLabel}>基本信息</StepLabel>
                </Step>
                <Step>
                  <StepLabel style={styles.stepperLabel}>插件依赖</StepLabel>
                </Step>
                <Step>
                  <StepLabel style={styles.stepperLabel}>插件下载</StepLabel>
                </Step>
              </Stepper>
              <ExpandTransition loading={loading} open={true}>
                {this.renderContent() }
              </ExpandTransition>
            </div>
          </DialogCard>

        </div>
      </div>
    )
		}
}

export default CodeGeneratorDialog;


/************** Backup code ******************/
