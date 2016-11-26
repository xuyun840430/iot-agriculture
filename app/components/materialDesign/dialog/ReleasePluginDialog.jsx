import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import _ from "lodash"
import Select from 'react-select';
import fetch from 'isomorphic-fetch';

// React-Grid-Layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI component
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

// Icons and Color
import UploadIcon from 'material-ui/svg-icons/file/cloud-upload';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {fullWhite} from 'material-ui/styles/colors';
import FileFolder from 'material-ui/svg-icons/file/folder';
import { blue400 } from 'material-ui/styles/colors';

// Customized module
import DialogCard from '../Container/DialogCard'

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
    marginLeft: -15,
    fontWeight: 'bold'
  },
  checkbox: {
    fontSize: 15,
  },
  dialogTitle: {
    fontSize: 20,
    fontFamily: 'Roboto, Microsoft YaHei',
  },
  dialogStyle: {
    // marginTop: '-20%',
    // marginLeft: '20%'
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
  fileUploadBtn: {
    marginTop: 30,
    marginLeft: -30,
  },
  fileUpload: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
}

// Plugin types to select field
const fileTypes = [
  <MenuItem key={1} value="库文件" primaryText="库文件" />,
  <MenuItem key={2} value="文档文件" primaryText="文档文件" />,
];

/**
 * Inform data/action process progress situation.
 */
class ReleasePluginDialog extends Component {

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
      fileType: '库文件',
      loading: false,
      finished: false,
      stepIndex: 0,
      filesTable: [],
      selectValue: [],
    };

    // Initialize variables used in class
    this.dependencies = [];
    this.uploadFiles = {
      libs: [],
      docs: []
    };
    this.selectedRows = [];
    this.dataToServer = {
      pluginintrod: '',
      installmanual: '',
      compilemanual: '',
    }; 
  }

  // Process submit data to callback impl. class
  processSubmitData = () => {
    const { onSubmit } = this.props;
    const { selectValue } = this.state;

    // Use 'callbackFunc.bind(this)' to use 'this' in forEach callback
    _(selectValue).forEach((function (value) {
      let plugin = {
        id: value.id,
        name: _.split(value.label, ':')[0],
        version: _.split(value.label, ':')[1]
      }
      this.dependencies.push(plugin);
    }).bind(this));

    // Set submit data to callback function to send to server
    onSubmit({
      pluginintrod: this.dataToServer.pluginintrod,
      installmanual: this.dataToServer.installmanual,
      compilemanual: this.dataToServer.compilemanual,
      dependencies: this.dependencies,
      uploadFiles: this.uploadFiles,
    });

    // Set step index to start index
    this.setState({ stepIndex: 0 });
  }

  stepperDataProcess(stepIndex) {

    switch (stepIndex) {
      // Store text field data to object according to stepper render() impl.
      case 0:
        this.dataToServer = {
          pluginintrod: this.refs.introduction.getValue(),
          installmanual: this.refs.installManual.getValue(),
          compilemanual: this.refs.compileManual.getValue(),
        }
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
        finished: stepIndex >= 3,
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

  handlePluginNameChange = (event) => {
    this.setState({ pluginName: event.target.value });
  }

  handleFileTypeChange = (event, index, value) => {
    this.setState({ fileType: value });
  }

  handleSelectUploadFiles = (event) => {
    let filesName = [];
    let files = [];
    let len = ReactDOM.findDOMNode(this.refs.filesUpload).files.length;
    let fileType = this.state.fileType;
    let tableContent = this.state.filesTable;

    // Store uploaded files name in array based on file type 
    for (let i = 0; i < len; i++) {

      let file = ReactDOM.findDOMNode(this.refs.filesUpload).files[i];

      // Adding files only when not be added to table yet
      if (_.some(tableContent, { 'name': file.name }))
        continue;

      // Push files name in array to display on UI 
      if (fileType === '库文件') { // Plugin libraries
        this.uploadFiles.libs.push(file);
      } else if (fileType === '文档文件') { // Plugin documents
        this.uploadFiles.docs.push(file);
      }

      // Push file type and name to file table content
      tableContent.push({
        type: fileType,
        name: file.name
      });
    }

    // Set files table state to display uploading files in table
    this.setState({ filesTable: tableContent });
  }

  /* Triggered when dependencies select changed (incl. selected / unselected) */
  handleSelectChange = (value) => {
    // console.log('You\'ve selected:', value);
    this.setState({ selectValue: value });
  }

  /* Handle functions for table item selection and delete */
  // SelectAll->'all', SelectNone->'none', Select->{row index}  
  handleRowSelection = (rows) => {
    this.selectedRows = rows;
  }

  handleRowsDelete = (event) => {
    const { filesTable } = this.state;

    let rows = this.selectedRows;

    // If selected "delete all files", remove all element in array 
    if (rows === 'all') {
      this.setState({ filesTable: [] });
      this.uploadFiles = {
        libs: [],
        docs: []
      }
    } else {
      // Find and store deleting file name according to row index
      let deleteNames = [];
      _(rows).forEach(function (row) {
        deleteNames.push(filesTable[row].name);
      });

      // Delete files in table based on deleting file name
      // TODO: handle "all" selected
      let tableTemp = filesTable;
      _(deleteNames).forEach(function (name) {
        // console.log("delete name:", name);
        _.remove(tableTemp, function (n) {
          return n.name === name;
        });
      });
      this.setState({ filesTable: tableTemp });

      // Delete files in upload array
      let files = this.uploadFiles;
      _(deleteNames).forEach(function (name) {
        _.forEach(files, function (value, key) {
          if (value.length > 0) {
            _.remove(value, function (file) {
              return file.name === name;
            });
          }
        });
      });
      this.uploadFiles = files;
    }
  }

  getSelectContent = () => {
    return fetch('/pluginRepository')
      .then((response) => response.json())
      .then((json) => {

        // Process plugin data from server and adapt to react-select UI
        let data = [];

        // Remove private plugins, only the public plugins can be selected as depended plugin
        _.remove(json, function (n) {
          return n.isprivate === true;
        });

        // Store data in "label-value" format according to "labelKey-valueKey" for react-select UI
        _(json).forEach(function (plugin) {
          data.push({
            id: plugin.id,
            label: plugin.symbolicname + ':' + plugin.version,
            value: plugin.symbolicname
          })
        });

        return { options: data };
      });
  }


  getStepContent(stepIndex, data) {
    const { filesTable } = this.state;

    switch (stepIndex) {
      case 0:
        return (
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={70}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 2, md: 2, sm: 1, xs: 1, xxs: 1 }}
            >

            <div key="rpd-1" _grid={{ x: 0, y: 0, w: 2, h: 1 }}>
              <TextField
                ref="introduction"
                defaultValue={this.dataToServer.pluginintrod}
                fullWidth={true}
                floatingLabelText="插件介绍"
                multiLine={true}
                rows={2}
                rowsMax={2}
                />
            </div>

            <div key="rpd-2" _grid={{ x: 0, y: 1, w: 1, h: 4 }}>
              <TextField
                ref="installManual"
                defaultValue={this.dataToServer.installmanual}
                fullWidth={true}
                floatingLabelText="安装指南"
                multiLine={true}
                rows={8}
                rowsMax={10}
                />
            </div>

            <div key="rpd-3" _grid={{ x: 1, y: 1, w: 1, h: 4 }}>
              <TextField
                ref="compileManual"
                defaultValue={this.dataToServer.compilemanual}
                fullWidth={true}
                floatingLabelText="编译指南"
                multiLine={true}
                rows={8}
                rowsMax={10}
                />
            </div>

          </ResponsiveReactGridLayout>

        );
      case 1:
        return (
          <ResponsiveReactGridLayout className="layout_rpd"
            isDraggable={false} isResizable={false}
            rowHeight={70}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
            >

            <div key="rpd-4" _grid={{ x: 0, y: 0, w: 3, h: 1 }}>
              <Subheader style={styles.subhead}>插件信息</Subheader>
              <Divider />
            </div>

            <div key="rpd-5" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
              <TextField
                style={{ marginTop: -30 }}
                ref="pluginName"
                disabled={true}
                defaultValue={data.symbolicname}
                floatingLabelText="插件名"
                />
            </div>

            <div key="rpd-6" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
              <TextField
                style={{ marginTop: -30 }}
                ref="pluginVersion"
                disabled={true}
                value={data.version}
                floatingLabelText="插件版本"
                />
            </div>

            <div key="rpd-7" _grid={{ x: 0, y: 2, w: 3, h: 1 }}>
              <Subheader style={styles.subhead}>插件依赖配置</Subheader>
              <Divider />
            </div>

            <div key="rpd-8" _grid={{ x: 0, y: 3, w: 3, h: 3.5 }}>
              <Select.Async
                multi
                value={this.state.selectValue}
                onChange={this.handleSelectChange}
                // onValueClick={this.gotoUser}
                labelKey="label"
                valueKey="value"
                loadOptions={this.getSelectContent}
                // minimumInput={1}
                backspaceRemoves={true}
                placeholder="请选择依赖的插件"
                />
            </div>
          </ResponsiveReactGridLayout>
        );
      case 2:
        return (
          <ResponsiveReactGridLayout className="layout_rpd" isDraggable={false} isResizable={false}
            rowHeight={70}
            breakpoints={{ lg: 996, md: 768, sm: 480, xs: 240, xxs: 0 }}
            cols={{ lg: 6, md: 3, sm: 2, xs: 1, xxs: 1 }}
            >

            <div key="rpd-9" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
              <SelectField
                ref="fileType"
                value={this.state.fileType}
                onChange={this.handleFileTypeChange}
                floatingLabelText="类型"
                floatingLabelFixed={true}
                >
                {fileTypes}
              </SelectField>
            </div>

            <div key="rpd-10" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
              <RaisedButton style={styles.fileUploadBtn} primary={true} label="添加文件" labelPosition="before">
                <input ref="filesUpload" type="file" multiple="multiple" style={styles.fileUpload} onChange={this.handleSelectUploadFiles} />
              </RaisedButton>
            </div>

            <div key="rpd-11" _grid={{ x: 0, y: 0, w: 3, h: 5 }}>
              <Table height='300px' multiSelectable={true} onRowSelection={this.handleRowSelection} >
                <TableHeader displaySelectAll={true} enableSelectAll={true}>
                  <TableRow>
                    <TableHeaderColumn style={{ width: 50 }}>
                      <IconButton style={{ marginLeft: -50 }} tooltip="删除" onTouchTap={this.handleRowsDelete}>
                        <ActionDeleteForever />
                      </IconButton>
                    </TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 50 }}>ID</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 300 }}>文件名称</TableHeaderColumn>
                    <TableHeaderColumn style={{ width: 100 }}>类型</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={true} showRowHover={true}>
                  { filesTable.map(function (row, index) {
                    if (filesTable.length > 0)
                      return (
                        <TableRow key={index}>
                          <TableRowColumn style={{ width: 50 }}></TableRowColumn>
                          <TableRowColumn style={{ width: 50 }}>{ index + 1 }</TableRowColumn>
                          <TableRowColumn style={{ width: 300 }}>{ row.name }</TableRowColumn>
                          <TableRowColumn style={{ width: 100 }}>{ row.type }</TableRowColumn>
                        </TableRow>
                      )
                  }) }
                </TableBody>
              </Table>
            </div>

          </ResponsiveReactGridLayout >
        );

      case 3:
        return (
          <p style={{ fontSize: 16 }}>
            完成插件发布，请点击保存按钮保存插件发布信息。
          </p>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent(data) {
    const {finished, stepIndex} = this.state;
    const stepperStyle = { margin: '0 16px', overflow: 'hidden' };

    return (
      <div style={stepperStyle}>
        <div>{ this.getStepContent(stepIndex, data) }</div>
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

    const { loading, stepIndex } = this.state;

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
        label={stepIndex === 3 ? '发布' : '下一步'}
        primary={true}
        onTouchTap={stepIndex === 3 ? this.processSubmitData : this.handleNext }
        />
    ];

    return (


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
        <div style={{ width: '100%', height: '100%', maxWidth: 996, margin: 'auto' }}>
          <Stepper style={styles.stepper} activeStep={stepIndex} >
            <Step>
              <StepLabel style={styles.stepperLabel}>基本信息</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepperLabel}>版本依赖</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepperLabel}>附件上传</StepLabel>
            </Step>
            <Step>
              <StepLabel style={styles.stepperLabel}>保存表单</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            { this.renderContent(defaultInfo) }
          </ExpandTransition>
        </div>

      </DialogCard>

    );
  }
}

export default ReleasePluginDialog;



// openFileDialog = () => {
//   let filesUploadDom = ReactDOM.findDOMNode(this.refs.filesUpload);
//   filesUploadDom.click();
// };

// <TextField
//   floatingLabelText="选择文件"
//   onTouchTap={this.openFileDialog}
// />
// <input ref="filesUpload" type="file" multiple="multiple" style={{ display: "none" }} onChange={this.handleSelectUploadFiles}/>
  //  <Dialog
  //       // title={title}
  //       // style={styles.dialogStyle}
  //       titleStyle={styles.dialogTitle}
  //       contentStyle={styles.contentStyle}
  //       actions={actions}
  //       modal={true}
  //       open={open}
  //       onRequestClose={this.handleClose}
  //       // autoScrollBodyContent={true}
  //       // autoDetectWindowHeightt={false}
  //       >
  //       <Card>
  //         <CardHeader
  //           title={title}
  //           titleStyle={{ fontSize: 20, color: blue400 }}
  //           dialogTitleStyle={styles.dialogTitle}
  //           dialogContentStyle={styles.contentStyle}
  //           avatar={ <Avatar icon={<FileFolder />}/> }
  //           subtitle="请填写插件信息"
  //           />
  //         <CardText>

  //                   </CardText>
  //       </Card>
  //     </Dialog>