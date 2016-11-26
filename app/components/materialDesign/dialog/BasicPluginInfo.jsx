import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

// Material-UI formsy
import Formsy from 'formsy-react';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
  FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';

// Material-UI component
import { Avatar, Dialog, FlatButton, TextField, DatePicker }from 'material-ui';
import { SelectField, MenuItem }from 'material-ui';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

// React-grid-layout for layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Icons and color
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { blue400 } from 'material-ui/styles/colors';

// Customized module
import DialogCard from '../Container/DialogCard'
import InputValidation from '../utility/InputValidation'

// Localise date time
let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
import areIntlLocalesSupported from 'intl-locales-supported';
if (areIntlLocalesSupported(['zh'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/zh');
}

var styles = {
  dialogTitle: {
    fontSize: 20,
    // textAlign: 'center',
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  progress: {
    marginLeft: '47%'
  },
}

// Plugin types to select field
const pluginTypes = [
  <MenuItem key={1} value="核心插件" primaryText="核心插件" />,
  <MenuItem key={2} value="显示插件" primaryText="显示插件" />,
  <MenuItem key={3} value="通信插件" primaryText="通信插件" />,
  <MenuItem key={4} value="辅助插件" primaryText="辅助插件" />,
];

/**
 * Inform data/action process progress situation.
 */
class BasicPluginInfo extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    defaultInfo: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      pluginType: null,
      date: new Date(),
      inputFileName: '',
      canSubmit: false,
    };

    // Create input field validation instance
    this.vChnChar = new InputValidation("chineseChr");
    this.vVersion = new InputValidation("version");
    this.vPluginSymbName = new InputValidation("pluginSymbName");
  }

  componentWillReceiveProps() {
    const { defaultInfo } = this.props;
    this.setState({ pluginType: defaultInfo.category });
    this.setState({ inputFileName: defaultInfo.sourcecodeName });
  }

  handlePluginTypeChange = (event, index, value) => {
    this.setState({ pluginType: value });
  }

  handleFileChange = (event) => {
    let file = event.target.files[0];
    if (file !== undefined)
      this.setState({ inputFileName: file.name });
    else {
      this.setState({ inputFileName: "" });
    }
  }

  handleDateChange = (event, date) => {
    this.setState({
      date: date,
    });
  }

  openFileDialog = () => {
    let fileUploadDom = ReactDOM.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
  }

  processSubmitData = () => {
    const { onSubmit } = this.props;

    // Set submit data to callback function
    onSubmit({
      pluginname: this.refs.pluginName.getValue(),
      symbolicname: this.refs.pluginSymblicName.getValue(),
      category: this.state.pluginType,
      version: this.refs.pluginVersion.getValue(),
      date: this.state.date,
      inputfile: this.refs.fileUpload.files[0],
      description: this.refs.pluginDescription.getValue()
    });
  }

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

  render() {

    const {
      title,
      open,
      onCancel,
      defaultInfo
    } = this.props;

    const errMsg = {
      wordsError: "请用中文填写",
      numericError: "请用数字填写",
      urlError: "Please provide a valid URL",
    }

    const actions = [
      <FlatButton
        label="取消"
        primary={true}
        onTouchTap={onCancel}
        />,
      <FlatButton
        label="提交"
        primary={true}
        tooltip="SVG Icon"
        disabled={!this.state.canSubmit}
        onTouchTap={this.processSubmitData}
        />
    ];

    return (
      <DialogCard
        title={title}
        titleStyle={{ fontSize: 20, color: blue400 }}
        avatar={ <Avatar icon={<FileFolder />}/> }
        subtitle="请填写插件信息"
        actions={actions}
        isModal={true}
        open={open}
        >
        <Formsy.Form
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onValidSubmit={this.submitForm}
          onInvalidSubmit={this.notifyFormError}
          >

          <ResponsiveReactGridLayout className="layout" isDraggable={false} isResizable={false}
            rowHeight={60}
            breakpoints={{ lg: 400, md: 332, sm: 256, xs: 160, xxs: 0 }}
            cols={{ lg: 2, md: 1, sm: 1, xs: 1, xxs: 1 }}
            >
            <div key="bpi-1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
              <FormsyText
                ref="pluginName"
                name="pluginName"
                defaultValue={defaultInfo.pluginname}
                hintText="三维显示"
                floatingLabelText="名称"
                validations="chineseChr"
                validationError={this.vChnChar.getMsg()}
                required
                />
            </div>

            <div key="bpi-2" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
              <FormsyText
                ref="pluginSymblicName"
                name="pluginSymblicName"
                defaultValue={defaultInfo.symbolicname}
                hintText="com.plugins.Radar3D"
                floatingLabelText="标识"
                validations="pluginSymbName"
                validationError={this.vPluginSymbName.getMsg()}
                required
                />
            </div>

            <div key="bpi-3" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
              <FormsyText
                ref="pluginVersion"
                name="pluginVersion"
                defaultValue={defaultInfo.version}
                hintText="1.0.0"
                floatingLabelText="版本号"
                validations="version"
                validationError={this.vVersion.getMsg()}
                required
                />
            </div>

            <div key="bpi-4" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
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

            <div key="bpi-5" _grid={{ x: 0, y: 2, w: 1, h: 1 }}>
              <FormsyDate
                name="date"
                ref="date"
                defaultDate={new Date(defaultInfo.date)}
                floatingLabelText="创建日期"
                autoOk={true}
                DateTimeFormat={DateTimeFormat}
                locale="zh"
                okLabel="确定"
                cancelLabel="取消"
                onChange={this.handleDateChange}
                required
                />
            </div>

            <div key="bpi-6" _grid={{ x: 2, y: 2, w: 1, h: 1 }}>
              <FormsyText
                name="uploadFiled"
                floatingLabelText="选择文件"
                value={this.state.inputFileName}
                onTouchTap={this.openFileDialog}
                required
                />
              <input ref="fileUpload" type="file" style={{ display: "none" }} onChange={this.handleFileChange}/>
            </div>

            <div key="bpi-7" _grid={{ x: 0, y: 3, w: 2, h: 2 }}>
              <TextField
                ref="pluginDescription"
                defaultValue={defaultInfo.description}
                fullWidth={true}
                floatingLabelText="简介"
                multiLine={true}
                rows={2}
                rowsMax={4}
                />
            </div>
          </ResponsiveReactGridLayout>
        </Formsy.Form>
      </DialogCard>
    );
  }
}

export default BasicPluginInfo;






// <Dialog
//   // title={title}
//   // titleStyle={styles.dialogTitle}
//   actions={actions}
//   modal={true}
//   open={open}
//   onRequestClose={this.handleClose}
//   >
//   <Card>
//     <CardHeader
//       title={title}
//       titleStyle={{ fontSize: 20, color: blue400 }}
//       avatar={ <Avatar icon={<FileFolder />}/> }
//       subtitle="请填写插件信息"
//       />
//     <CardText>

//     </CardText>
// </Card>/
// </Dialog >