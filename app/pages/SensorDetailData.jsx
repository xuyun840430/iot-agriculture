import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash'
import { last, mean, random } from "lodash";
import { connect } from 'react-redux';


// React-grid-layout for layout
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI components
import Title from 'react-title-component';

// Customized components
import BlockContainer from '../components/materialDesign/Container/BlockContainer';
import ChartContainer from '../components/materialDesign/Container/ChartContainer';
import SensorDetailChart from '../components/materialDesign/chart/SensorDetailChart';

// Redux components
import { createSensorData, fetchSensorData, fetchSensorDataAll } from '../actions/sensorDatas';

// Icons and Colors


/**
 * Styles for React component
 */
var styles = {
	default: {

	},
}

/* Dummy date counter */
// var gl_dateSeed = 0;

const sensDataMapping = [
	{ "name": "土壤温度", index: "soiltemperature", "max": 60.0, "min": 0.0, "unit": "C" }, // NEW index
	{ "name": "土壤湿度", index: "soilhumidity", "max": 100.0, "min": 0.0, "unit": "%RH" },
	{ "name": "大气温度", index: "atmostemperature", "max": 60.0, "min": 0.0, "unit": "C" },
	{ "name": "空气湿度", index: "atmoshumidity", "max": 100.0, "min": 0.0, "unit": "%RH" },
	{ "name": "光照强度", index: "illuminance", "max": 200000.0, "min": 0.0, "unit": "lux" },
	{ "name": "CO2浓度", index: "co2concentration", "max": 2000.0, "min": 0.0, "unit": "ppm" },
];

class SensorDetailData extends Component {

	static need = [
		fetchSensorDataAll
	]

	static propTypes = {
		// generators: PropTypes.object,
		// dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		// Initialize variables
		this.period = 1000;
		this.domain = [0, 60];
		this.maxPoints = 30;
		this.initialized = false;

		// Initialize react state variables
		this.state = {
			// data: this.getInitialData(),
			liveSensData: [
				// {x: 0, y: 0},
				// {x: 1, y: 0},
			],
			// liveSensorData: [
			// 	{
			// 		"site": "1#连栋温室",
			// 		"index": "1", // NEW
			// 		"timestamp": "2016-11-12T12:00:00+8:00",
			// 		"next_time": "2016-11-12T12:10:00+8:00",
			// 		"data": [
			// 			{ "name": "土壤温度", index: "soiltemperature", "value": 23.1, "max": 60.0, "min": 0.0, "unit": "C", "state": true }, // NEW index
			// 			{ "name": "土壤湿度", index: "soilhumidity", "value": 12.2, "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
			// 			{ "name": "大气温度", index: "atmostemperature", "value": 25.0, "max": 60.0, "min": 0.0, "unit": "C", "state": true },
			// 			{ "name": "空气湿度", index: "atmoshumidity", "value": 86.8, "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
			// 			{ "name": "光照强度", index: "illuminance", "value": 10365.0, "max": 200000.0, "min": 0.0, "unit": "lux", "state": true },
			// 			{ "name": "CO2浓度", index: "co2concentration", "value": 418.0, "max": 2000.0, "min": 0.0, "unit": "ppm", "state": true }
			// 		]
			// 	},
			// 	{
			// 		"site": "2#连栋温室",
			// 		"index": "2", // NEW
			// 		"timestamp": "2016-11-12T12:00:00+8:00",
			// 		"next_time": "2016-11-12T12:10:00+8:00",
			// 		"data": [
			// 			{ "name": "土壤温度", index: "soiltemperature", "value": 23.1 + 5, "max": 60.0, "min": 0.0, "unit": "C", "state": true }, // NEW index
			// 			{ "name": "土壤湿度", index: "soilhumidity", "value": 12.2 - 2, "max": 100.0, "min": 0.0, "unit": "%RH", "state": false },
			// 			{ "name": "大气温度", index: "atmostemperature", "value": 25.0 - 3, "max": 60.0, "min": 0.0, "unit": "C", "state": true },
			// 			{ "name": "空气湿度", index: "atmoshumidity", "value": 86.8 + 5, "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
			// 			{ "name": "光照强度", index: "illuminance", "value": 10365.0 + 2352, "max": 200000.0, "min": 0.0, "unit": "lux", "state": false },
			// 			{ "name": "CO2浓度", index: "co2concentration", "value": 418.0 + 52, "max": 2000.0, "min": 0.0, "unit": "ppm", "state": true }
			// 		]
			// 	},
			// ]
		};
	}

		componentDidMount() {
		// Write dummy sensor data to DB with period time
		this.setStateInterval_wr = setInterval(() => {
			const { dispatch } = this.props;
			var unixTimestamp = Date.now();
			var today = new Date(unixTimestamp);

			// Save dummy data for site 1
			let dummySensData = {
				"site": 1 + "#连栋温室",
				"index": 1, // NEW
				"timestamp": unixTimestamp,
				"next_time": unixTimestamp + 10000, // 10s
				"data": [
					{ "name": "土壤温度", index: "soiltemperature", "value": random(0, 60, true), "max": 60.0, "min": 0.0, "unit": "C", "state": true }, // NEW index
					{ "name": "土壤湿度", index: "soilhumidity", "value": random(0, 100, true), "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
					{ "name": "大气温度", index: "atmostemperature", "value": random(0, 60, true), "max": 60.0, "min": 0.0, "unit": "C", "state": true },
					{ "name": "空气湿度", index: "atmoshumidity", "value": random(0, 100, true), "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
					{ "name": "光照强度", index: "illuminance", "value": random(0, 200000, true), "max": 200000.0, "min": 0.0, "unit": "lux", "state": true },
					{ "name": "CO2浓度", index: "co2concentration", "value": random(0, 2000, true), "max": 2000.0, "min": 0.0, "unit": "ppm", "state": true }
				]
			};
			dispatch(createSensorData(dummySensData));

			// Save dummy data for site 2
			dummySensData = {
				"site": 2 + "#连栋温室",
				"index": 2, // NEW
				"timestamp": unixTimestamp,
				"next_time": unixTimestamp + 10000, // 10s
				"data": [
					{ "name": "土壤温度", index: "soiltemperature", "value": random(0, 60, true), "max": 60.0, "min": 0.0, "unit": "C", "state": true }, // NEW index
					{ "name": "土壤湿度", index: "soilhumidity", "value": random(0, 100, true), "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
					{ "name": "大气温度", index: "atmostemperature", "value": random(0, 60, true), "max": 60.0, "min": 0.0, "unit": "C", "state": true },
					{ "name": "空气湿度", index: "atmoshumidity", "value": random(0, 100, true), "max": 100.0, "min": 0.0, "unit": "%RH", "state": true },
					{ "name": "光照强度", index: "illuminance", "value": random(0, 200000, true), "max": 200000.0, "min": 0.0, "unit": "lux", "state": true },
					{ "name": "CO2浓度", index: "co2concentration", "value": random(0, 2000, true), "max": 2000.0, "min": 0.0, "unit": "ppm", "state": true }
				]
			};
			dispatch(createSensorData(dummySensData));

		}, this.period * 5);

		// Read sensor data from DB with period time
		this.setStateInterval_rd = setInterval(() => {
			this.setState({
				liveSensData: this.getNewData()
			});
		}, this.period * 5);
	}

	// Deconstructor
	componentWillUnmount() {
		clearInterval(this.setStateInterval_wr);
		clearInterval(this.setStateInterval_rd);
	}

	 nextPoint(previous = null) {
		const [low, high] = this.domain;
		const newPoint = low + Math.random() * (high - low);
		return previous ? mean([previous, newPoint]) : newPoint;
	}

	getInitialData() {
		return [
			{ x: 0, y: this.domain[0] },
			{ x: 1, y: this.domain[0] }
		];
	}

	getNewData() {

		const { dispatch } = this.props;

		/* Fetch sensor data from a specific time point */
		// TODO: fetch data from sepcific time point (current time minus 5s)
		// At the same time point site 1 and site 2 will be written into DB
		const timePoint = Date.now() - 5000;
		dispatch(fetchSensorData(timePoint));


		// Read fetched data out
		const { allData, fetchedData } = this.props.sensorData;
		const activeSensor = this.props.params.component ? this.props.params.component : "";
		const roomIndex = _.split(activeSensor, '_', 2)[0];
		const sensIndex = _.split(activeSensor, '_', 2)[1];

		const data = this.state.liveSensData;

		// Get initial point from the last two point of all sensor data
		// const roomNumber = 2; // we have only 2 rooms now
		// const lastNPoint = 2; // last 2 data point to create a line in chart 
		// if (this.initialized === false && allData.length > 0) {
		// 	let lastData = _.drop(allData, allData.length - lastNPoint * roomNumber);

		// 	_.forEach(lastData, function (site) {
		// 		// const sensData = _.find(site.data, { 'index': sensIndex });
		// 		if (roomIndex === site.index) {
		// 			data.push({
		// 				x: new Date(site.timestamp).getTime(),
		// 				y: _.find(site.data, { 'index': sensIndex }).value
		// 			});
		// 		}
		// 	});
		// 	this.initialized = true;
		// }

		_.forEach(fetchedData, function (site) {
			// Find the specific room
			if (roomIndex === site.index) {
				// const sensData = _.find(site.data, { 'index': sensIndex });

				data.push({
					x: new Date(site.timestamp).getTime(),
					y: _.find(site.data, { 'index': sensIndex }).value
				});
			}
		});

		return data;

		// const data = this.state.data;
		// if (data.length !== this.maxPoints) {
		// 	// add one
		// 	const lastPoint = last(data);
		// 	data.push(
		// 		{ y: this.nextPoint(lastPoint.y), x: lastPoint.x + 1 }
		// 	);
		// 	return data;
		// } else {
		// 	return this.getInitialData();
		// }
	}



	render() {

		// Create content header
		const activeSensor = this.props.params.component ? this.props.params.component : "";
		const roomIndex = _.split(activeSensor, '_', 2)[0];
		const sensIndex = _.split(activeSensor, '_', 2)[1];
		let sensName = undefined;
		let chartLabel_Y = undefined;
		if (sensIndex !== undefined ) {
			const sensor = _.find(sensDataMapping, { 'index': sensIndex });
			sensName = roomIndex + "#" + sensor.name;
			chartLabel_Y = sensor.name + " (" + sensor.unit + ")";
		}



		return (
			<div id="content">
				{
					sensIndex !== undefined ?
					<BlockContainer title={sensName} >
						<ChartContainer style={{ width: '80%', height: '60%', marginLeft: 200 }} zDepth={0}>
							<SensorDetailChart
								data={this.state.liveSensData}
								period={this.period}
								domain={this.domain}
								label_Y={chartLabel_Y}
								/>
						</ChartContainer>
					</BlockContainer> : <div></div>
				}
			</div>
		)
	}
}

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
	return {
		sensorData: state.sensorData
	};
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(SensorDetailData);


/************** Backup code ******************/
