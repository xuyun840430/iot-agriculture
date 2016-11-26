import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { DatePicker } from 'material-ui';
import { TextField } from 'material-ui';

import { AppBar, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { Tabs, Tab } from 'material-ui/Tabs';
import { Paper, Divider } from 'material-ui';
import FontIcon from 'material-ui/FontIcon';

import { Avatar, Dialog, FlatButton, RaisedButton } from 'material-ui';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

// List
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

// Icons
import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import ActionInfo from 'material-ui/svg-icons/action/info';
import MapsPersonPin from 'material-ui/svg-icons/maps/person-pin';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

// Colors
import { green300, blue500, grey400, darkBlack, lightBlack, blue400 } from 'material-ui/styles/colors';

// Customized module
import DialogCard from '../Container/DialogCard'

// React-Grid-Layout
// import {Responsive, WidthProvider} from 'react-grid-layout';
// const ResponsiveReactGridLayout = WidthProvider(Responsive);

/**
 * Styles for React component
 */
var styles = {
  textArea: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: '0 10px',
  },
  dialogStyle: {
    position: 'absolute',
    left: '50%',
    top: '5%',
    transform: 'translate(-50%, 0)'
  },
  smallTableIcon: {
    width: 25,
    height: 25,
  },
  raiseButton: {
    width: "30%"
  },
  cardListIcon: {
    width: 20,
    height: 20,
    left: "35px",
  },
  cardListItem: {
    fontSize: 16,
    left: "-30px",
    marginBottom: "-20px"
  },
  tabLabel: {
    fontSize: 16
  }
}


const tableIndex = {
  downloadIcon: 4
}

class ShopElement extends Component {

  constructor(props) {
    super(props);

    // Initialize local storage for class 
    this.state = {
      open: false,
      tableData: []
    };

    // Binding functions to class
    this.onDetailDialogOpen = this.onDetailDialogOpen.bind(this);
    this.onDetailDialogClose = this.onDetailDialogClose.bind(this);
    this.onTableRowClick = this.onTableRowClick.bind(this);
    this.onSoucecodeDownload = this.onSoucecodeDownload.bind(this);

  }

  onDetailDialogOpen() {
    let data = this.processTableData();
    this.setState({
      open: true,
      tableData: data
    });
  }

  onDetailDialogClose() {
    this.setState({
      open: false,
      tableData: []
    });
  }

  onTableRowClick(row, column) {
    // Column for download icon click
    if (column === tableIndex.downloadIcon) {
      let mongoId = this.state.tableData[row].mongoId;
      let url = '/pluginRepository/download/' + mongoId;
      window.location = url;
      window.open(url, '_self');
    }
  }

  onSoucecodeDownload() {
    const { item } = this.props;
    let mongoId = item.filemeta.sourcecode.id;
    let url = '/pluginRepository/download/' + mongoId;
    window.location = url;
    window.open(url, '_self');
  }


  // Process row data from database to table format 
  processTableData() {
    const { item } = this.props;

    // Process dowloadable data to table format
    // let id = 1;
    let downloadFiles = [];

    let sourcecode = item.filemeta.sourcecode;
    let documents = item.filemeta.docs;
    let libraries = item.filemeta.libs;

    // Store files data in array
    downloadFiles.push({
      // id: id++,
      mongoId: sourcecode.id,
      name: sourcecode.name,
      type: '源代码',
      downloadIcon: ''
    }); // sourcecode

    documents.forEach(function (doc) {
      downloadFiles.push({
        // id: id++,
        mongoId: doc.id,
        name: doc.name,
        type: '文档',
        downloadIcon: ''
      });
    }); // documents

    libraries.forEach(function (lib) {
      downloadFiles.push({
        // id: id++,
        mongoId: lib.id,
        name: lib.name,
        type: '库文件',
        downloadIcon: ''
      });
    }); // libraries

    return downloadFiles;
  }

  /* Render file download table */
  renderDownloadTable(item) {
    const { tableData } = this.state;

    return (
      <Table height='300px' onCellClick={this.onTableRowClick}>
        <TableHeader displayRowCheckbox={false} displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: 50 }}>ID</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 200 }}>文件名称</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 100 }}>类型</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 50 }}>下载</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover={true}>
          { tableData.map(function (row, key) {
            if (tableData.length > 0)
              return (
                <TableRow key={key}>
                  <TableRowColumn style={{ width: 50 }}>{ key + 1 }</TableRowColumn>
                  <TableRowColumn style={{ width: 200 }}>{ row.name }</TableRowColumn>
                  <TableRowColumn style={{ width: 100 }}>{ row.type }</TableRowColumn>
                  <TableRowColumn style={{ width: 50 }}>
                    <IconButton iconStyle={styles.smallTableIcon}>
                      <FileCloudDownload />
                    </IconButton>
                  </TableRowColumn>
                </TableRow>
              )
          }) }
        </TableBody>
      </Table>
    );
  }

  /* Render detail dialog */
  renderDetailDialog(item) {
    const actions = [
      <FlatButton
        label="关闭"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onDetailDialogClose}
        />,
    ];

    return (
      <div>
        <DialogCard
          title={item.pluginname}
          titleStyle={{ fontSize: 20, color: blue400 }}
          avatar={ <Avatar icon={<ActionAssignment />}/> }
          subtitle="请查看插件详情"
          actions={actions}
          isModal={false}
          open={this.state.open}
          dialogContentStyle={styles.dialogStyle}
          >
          <Tabs>
            <Tab style={styles.tabLabel} label="插件介绍" >
              <Divider />
              <TextField id='pluginintrod' style={styles.textArea} multiLine={true} fullWidth={true}
                underlineShow={false} rows={2} rowsMax={15} value={ item.pluginintrod }/>
            </Tab>
            <Tab style={styles.tabLabel} label="安装指南" >
              <Divider />
              <TextField id='installmanual' style={styles.textArea} multiLine={true} fullWidth={true}
                underlineShow={false} rows={2} rowsMax={15} value={ item.installmanual }/>
            </Tab>
            <Tab style={styles.tabLabel} label="编译指南" >
              <Divider />
              <TextField id='compilemanual'style={styles.textArea} multiLine={true} fullWidth={true}
                underlineShow={false} rows={2} rowsMax={15} value={ item.compilemanual }/>
            </Tab>
            <Tab style={styles.tabLabel} label="下载" >
              <Divider />
              {this.renderDownloadTable(item) }
            </Tab>
          </Tabs>
        </DialogCard>
      </div>
    );
  }

  renderElementCard(item) {

    return (
      <Card>
        <CardHeader
          title={ item.symbolicname }
          titleStyle={{ fontSize: 18 }}
          subtitle={ item.author }
          avatar="./styles/img/nature+100.jpg"/>
        <CardTitle title={ item.pluginname } />
        <CardText >
          {/*item.description*/}
        </CardText>
        <List>
          <ListItem style={styles.cardListItem} primaryText={"Stable (" + item.version + ")"} disabled={true} leftIcon={<ActionAssignment style={styles.cardListIcon} color={green300}/>} />
          <ListItem style={styles.cardListItem} primaryText={item.date} disabled={true} leftIcon={<ContentDrafts style={styles.cardListIcon} />} />
        </List>
        <Divider style={{ marginTop: "10px" }}/>
        <CardActions style={{ marginLeft: "5%" }}>
          <FlatButton style={styles.raiseButton} label="15" labelPosition="after" icon={<ActionGrade />} />
          <FlatButton style={styles.raiseButton} label="详情" labelStyle={{ fontSize: 16 }} primary={true} onTouchTap={this.onDetailDialogOpen}/>
          <FlatButton style={styles.raiseButton} label="35" labelPosition="after" icon={<FileCloudDownload />} onTouchTap={this.onSoucecodeDownload} />
        </CardActions>
      </Card>
    )
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        { this.renderElementCard(item) }
        <br/>
        { this.renderDetailDialog(item) }
      </div>
    )

  }
}

export default ShopElement;

//  <Dialog
//   title={item.pluginname}
//   actions={actions}
//   modal={false}
//   open={this.state.open}
//   onRequestClose={this.onDetailDialogClose}
//   contentStyle={styles.dialogStyle}>
//  </Dialog>

// onMouseOver={this.onShowDetailClick}

// const { item } = this.state;

// return (
//   <div className="modal fade" id="showDetailModal" tabIndex="-1" role="dialog"
//     aria-labelledby="showDetailModalLabel" aria-hidden="true">
//     <div className="modal-dialog">
//       <div className="modal-content">
//         <div className="modal-header">
//           <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
//             &times;
//           </button>
//           <h2 className="row-seperator-header" id="showDetailModalLabel" style={{ fontWeight: 'bold' }}>
//             <i className="fa fa-puzzle-piece"/> { item.pluginname } </h2>
//         </div>

//         <div className="modal-body">
//           <JarvisWidget colorbutton={false} editbutton={false} togglebutton={false}
//             deletebutton={false} fullscreenbutton={false}
//             custombutton={false} sortable={false}>
//             <header>
//               <span className="widget-icon"> <i className="fa fa-list-alt"/> </span>
//               <h2> 基本信息 </h2>
//             </header>
//             <div>

//               <div className="widget-body">                  
//                 <div className="tabs-left">
//                   <ul className="nav nav-tabs tabs-left" id="demo-pill-nav">
//                     <li className="active">
//                       <a href="#tab-r1" data-toggle="tab"><i className="fa fa-info fa-fw"/> 插件介绍 </a>
//                     </li>
//                     <li>
//                       <a href="#tab-r2" data-toggle="tab"><i className="fa fa-gavel fa-fw"/> 安装指南</a>
//                     </li>
//                     <li>
//                       <a href="#tab-r3" data-toggle="tab"><i className="fa fa-tasks fa-fw"/> 编译指南</a>
//                     </li>
//                   </ul>
//                   <div className="tab-content">
//                     <div className="tab-pane active" id="tab-r1">
//                       { item.pluginintrod }
//                     </div>
//                     <div className="tab-pane" id="tab-r2">
//                       { item.installmanual }
//                     </div>
//                     <div className="tab-pane" id="tab-r3">
//                       { item.compilemanual }
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </JarvisWidget>
//         </div>
//       </div>
//     </div>
//   </div>
// )

//   return (
//     <div className="modal fade" id="showDetailModal" tabIndex="-1" role="dialog"
//       aria-labelledby="showDetailModalLabel" aria-hidden="true">
//       <div className="modal-dialog">
//         <div className="modal-content">
//           <div className="modal-header">
//             <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
//               &times;
//             </button>
//             <h2 className="row-seperator-header" id="showDetailModalLabel" >
//               <i className="fa fa-reorder"/> 编辑插件 </h2>
//           </div>
//           <div className="modal-body">

//             <div>
//               <div className="widget-body no-padding">

//                 <form id="editplugin-form" className="smart-form" noValidate="novalidate">
//                   <fieldset>
//                     <div className="row">
//                       <section className="col col-6">
//                         <label className="input"> <i className="icon-append fa fa-puzzle-piece"/>
//                           <input type="text" name="editpluginname" ref="editpluginname" placeholder="名称" defaultValue={g_item.pluginname}/>
//                         </label>
//                       </section>
//                     </div>
//                   </fieldset>


//                 </form>

//               </div>
//             </div>

//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-default" data-dismiss="modal">
//               取消
//             </button>
//             <button type="button" className="btn btn-primary" data-dismiss="modal"
//               onClick={this.onEditPluginSubmit}>
//               更新插件
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )


// <JarvisWidget colorbutton={false} editbutton={false} togglebutton={false}
// deletebutton={false} fullscreenbutton={false}
// custombutton={false} sortable={false}>
// <header>
//   <span className="widget-icon"> <i className="fa fa-list-alt"/> </span>
//   <h2> 基本信息 </h2>
// </header>
// <div>
//   <div className="widget-body">
//     <div className="tabs-left">
//       <ul className="nav nav-tabs tabs-left" id="demo-pill-nav">
//         <li className="active">
//           <a href="#tab-r1" data-toggle="tab"><i className="fa fa-info fa-fw"/> 插件介绍 </a>
//         </li>
//         <li>
//           <a href="#tab-r2" data-toggle="tab"><i className="fa fa-gavel fa-fw"/> 安装指南</a>
//         </li>
//         <li>
//           <a href="#tab-r3" data-toggle="tab"><i className="fa fa-tasks fa-fw"/> 编译指南</a>
//         </li>
//       </ul>
//       <div className="tab-content">
//         <div className="tab-pane active" id="tab-r1">
//           { item.pluginintrod }
//         </div>
//         <div className="tab-pane" id="tab-r2">
//           { item.installmanual }
//         </div>
//         <div className="tab-pane" id="tab-r3">
//           { item.compilemanual }
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// </JarvisWidget>





// <Modal show={this.state.showModal} onHide={this.onModalClose}>
//   <Modal.Header closeButton>
//     <Modal.Title style={{ fontWeight: 'bold' }} > <i className="fa fa-puzzle-piece"/> { item.pluginname } </Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     {/*
//     <Tab.Container id="left-tabs-example" defaultActiveKey="first">
//       <Row>
//         <Col sm={4}>
//           <Nav bsStyle="pills" stacked>
//             <NavItem eventKey="first">
//               插件介绍
//             </NavItem>
//             <NavItem eventKey="second">
//               安装指南
//             </NavItem>
//             <NavItem eventKey="third">
//               编译指南
//             </NavItem>
//           </Nav>
//         </Col>
//         <Col sm={8}>
//           <Tab.Content animation>
//             <Tab.Pane eventKey="first">
//               <FormControl rows="16" componentClass="textarea" placeholder="textarea" defaultValue={ item.pluginintrod }/>
//             </Tab.Pane>
//             <Tab.Pane eventKey="second">
//               <FormControl rows="16" componentClass="textarea" placeholder="textarea" defaultValue={ item.installmanual }/>
//             </Tab.Pane>
//             <Tab.Pane eventKey="third">
//               <FormControl rows="16" componentClass="textarea" placeholder="textarea" defaultValue={ item.compilemanual }/>
//             </Tab.Pane>
//           </Tab.Content>
//         </Col>
//       </Row>
//     </Tab.Container>
//     */}

//     {/*
//     <Row className="show-grid">
//       <Col xs={12} md={6}>
//         <DatePicker hintText="Landscape Dialog" mode="landscape"></DatePicker>
//       </Col>
//       <Col xs={12} md={6}>
//         <DatePicker hintText="Landscape Dialog" mode="landscape"></DatePicker>
//       </Col>
//     </Row>
//     <Row className="show-grid">
//       <Col xs={12} md={6}>
//         <TextField hintText="Hint text" floatingLabelText="输入文字"></TextField>
//       </Col>
//       <Col xs={12} md={6}>
//         <TextField hintText="Hint text" floatingLabelText="Floating Label Text"></TextField>
//       </Col>
//     </Row>
//     */}

//     {/*
//     <Row className="show-grid">
//       <Col xs={12} md={12}>
//         <AppBar
//           title="Title"
//           iconElementLeft={<IconButton><NavigationClose /></IconButton>}
//           iconElementRight={
//             <IconMenu
//               iconButtonElement={
//                 <IconButton><MoreVertIcon /></IconButton>
//               }
//               targetOrigin={{ horizontal: 'right', vertical: 'top' }}
//               anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
//               >
//               <MenuItem style={{ fontWeight: 'bold' }} primaryText="更新" />
//               <MenuItem primaryText="Help" />
//               <MenuItem primaryText="Sign out" />
//             </IconMenu>
//           }
//           />
//       </Col>
//     </Row>
//     */}

//     <Row className="show-grid">
//       <Col xs={12} md={12}>
//         <Tabs>
//           <Tab label="插件介绍" >
//             <TextField style={styles.textArea} multiLine={true} fullWidth={true} underlineShow={false} rows={2} rowsMax={15} value={ item.pluginintrod }/>
//           </Tab>
//           <Tab label="安装指南" >
//             <TextField style={styles.textArea} multiLine={true} fullWidth={true} underlineShow={false} rows={2} rowsMax={15} value={ item.installmanual }/>
//           </Tab>
//           <Tab label="编译指南" >
//             <TextField style={styles.textArea} multiLine={true} fullWidth={true} underlineShow={false} rows={2} rowsMax={15} value={ item.compilemanual }/>
//           </Tab>
//         </Tabs>
//       </Col>
//     </Row>

//     <Row className="show-grid">
//       <Col xs={12} md={12}>
//         <Tabs>
//           <Tab
//             icon={<FontIcon className="material-icons">phone</FontIcon>}
//             label="RECENTS"
//             />
//           <Tab
//             icon={<FontIcon className="material-icons">favorite</FontIcon>}
//             label="FAVORITES"
//             />
//           <Tab
//             icon={<MapsPersonPin />}
//             label="NEARBY"
//             />
//         </Tabs>
//       </Col>
//     </Row>

//   </Modal.Body>
// </Modal>


// <div className="panel panel-primary pricing-big">
//   <img src="styles/img/ribbon.png" className="ribbon" alt=""/>
//   <div className="panel-heading">
//     <h3 className="panel-title"> { item.pluginname } </h3>
//   </div>
//   <div className="panel-body no-padding text-align-center" style={styles.itemList}>
//     <div className="price-features">
//       <ul className="list-unstyled text-left">
//         <li><i className="fa fa-user"></i> <strong> 开发者： </strong> { item.author } </li>
//         <li><i className="fa fa-file-excel-o"></i> <strong> 最新版本： </strong> { item.version } </li>
//         <li><i className="fa fa-calendar"></i> <strong> 更新日期： </strong> { item.date }  </li>
//         <li><i className="fa fa-download"></i> <strong> 下载次数： </strong> 84 </li>
//         <li><i className="fa fa-star-half-full"></i> <strong> 星级： </strong>
//           <i className="fa fa-star text-primary"></i>
//           <i className="fa fa-star text-primary"></i>
//           <i className="fa fa-star text-primary"></i>
//           <i className="fa fa-star text-primary"></i>
//           <i className="fa fa-star text-muted"></i>
//           <span className="fa font-sm"> (109) 评分 </span>
//         </li>
//       </ul>
//     </div>
//   </div>
//   <div className="panel-footer text-align-center" >
//     <a href-void="" className="btn btn-primary btn-block" role="button" href="#"> 下载 </a>
//     <div> <a className="font-sm" onClick={this.onDetailDialogOpen} > 详情 </a>
//       或 <a className="font-sm" href-void="" href="#"> 评分 </a>
//     </div>
//   </div>
// </div>
