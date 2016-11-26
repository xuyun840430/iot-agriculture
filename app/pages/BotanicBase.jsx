import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


// React-grid-layout for layout
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI components
import Title from 'react-title-component';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton';

// Customized components
import BlockContainer from '../components/materialDesign/Container/BlockContainer';
import ChartContainer from '../components/materialDesign/Container/ChartContainer';
import TooltipChart from "../components/materialDesign/chart/TooltipChart";
import DemoLiveChart from "../components/materialDesign/chart/DemoLiveChart";
import SensorDataChart from "../components/materialDesign/chart/SensorDataChart";


// Icons and Colors

// Victory char components
import {
	VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryScatter,
	VictoryLabel, VictoryLine, VictoryArea, VictoryPie, VictorySharedEvents,
} from 'victory';

// Datatable
import { Table, Column, ColumnGroup, Cell } from 'fixed-data-table-2'
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore'
// import { TextCell  } from './helpers/cells'

/**
 * Styles for React component
 */
var styles = {
	default: {

	},
}

class TextCell extends Component {
	render() {
		const {data, rowIndex, columnKey, ...props} = this.props;
		return (
			<Cell {...props}>
				{data.getObjectAt(rowIndex)[columnKey]}
			</Cell>
		);
	}
};

class BotanicBase extends Component {

	static propTypes = {
		// generators: PropTypes.object,
		// dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		// Initialize variables


		// Initialize react state variables
		this.state = {
			tabValue: 'curSensorData',
			tableData: [
				{ name: 'Rylan' },
				{ name: 'Amelia' },
				{ name: 'Estevan' },
				{ name: 'Florence' },
				{ name: 'Tressa' },
			],
			dataList: new FakeObjectDataListStore(500),
		};
	}

	componentDidMount() {

	}

	// Deconstructor
	componentWillUnmount() {

	}

	handleTabValueChange = (value) => {
		this.setState({
			tabValue: value,
		});
	};

	render() {

		const toolBarMenuBase = (
			<ToolbarGroup >
				<RaisedButton
					// style={styles.raisedButton}
					labelStyle={{ fontSize: 16 }}
					label="创建新项目"
					primary={true}
					// icon={<NotificationsIcon />}
					//onTouchTap={this.handleAddPluginDialogOpen}
					/>
				<RaisedButton
					// style={styles.raisedButton}
					labelStyle={{ fontSize: 16 }}
					label="创建新团队"
					primary={true}
					// icon={<NotificationsIcon />}
					//onTouchTap={this.handleAddPluginDialogOpen}
					/>
			</ToolbarGroup>
		);

		var {dataList} = this.state;

		return (
			<div id="content">
				<div>
					<Title render={'航育基地'} />

					<BlockContainer
						title="航育基地"
						// menu={toolBarMenuBase}
						>
						<Tabs
							tabItemContainerStyle={{ width: 400 }}
							value={this.state.tabValue}
							onChange={this.handleTabValueChange}
							>
							<Tab style={{ fontSize: '18px' }} label="传感器当前数据" value="curSensorData">
								<ChartContainer style={{ width: 1200, height: 1200, marginLeft: 50 }} zDepth={0}>
									<SensorDataChart />
								</ChartContainer>
							</Tab>
							<Tab style={{ fontSize: '18px' }} label="农庄传感器数据" value="farmSensorData">
								<div style={{ marginTop: 20, marginLeft: 50 }}>
									<Table
										rowHeight={30}
										groupHeaderHeight={30}
										headerHeight={30}
										rowsCount={dataList.getSize()}
										width={1000}
										height={500}
										{...this.props}>
										<ColumnGroup
											fixed={true}
											header={<Cell>Name</Cell>}>
											<Column
												columnKey="firstName"
												fixed={true}
												header={<Cell>First Name</Cell>}
												cell={<TextCell data={dataList} />}
												width={150}
												/>
											<Column
												columnKey="lastName"
												fixed={true}
												header={<Cell>Last Name</Cell>}
												cell={<TextCell data={dataList} />}
												width={150}
												/>
										</ColumnGroup>
										<ColumnGroup
											header={<Cell>About</Cell>}>
											<Column
												columnKey="companyName"
												header={<Cell>Company</Cell>}
												cell={<TextCell data={dataList} />}
												flexGrow={1}
												width={150}
												/>
											<Column
												columnKey="sentence"
												header={<Cell>Sentence</Cell>}
												cell={<TextCell data={dataList} />}
												flexGrow={1}
												width={150}
												/>
										</ColumnGroup>
									</Table>
								</div>
							</Tab>
						</Tabs>
					</BlockContainer>
				</div>
			</div>
		)
		}
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
	return {
		// generators: state.generators
	};
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(BotanicBase);
