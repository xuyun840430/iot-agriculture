import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { range, random, merge } from "lodash";

// React-grid-layout for layout
import { Responsive, WidthProvider } from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Datatable
import { Table, Column, Cell } from 'fixed-data-table-2'

// Material-UI components
import Title from 'react-title-component';

// Customized components
import BlockContainer from '../components/materialDesign/Container/BlockContainer';
import PaperContainer from '../components/materialDesign/Container/PaperContainer';
import DemoLiveChart from "../components/materialDesign/chart/DemoLiveChart";
import TooltipChart from "../components/materialDesign/chart/TooltipChart";


// Icons
// import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
// import Download from 'material-ui/svg-icons/file/file-download';


// Test victory chart components
import {
	VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack, VictoryScatter,
	VictoryLabel, VictoryLine, VictoryArea, VictoryPie, VictorySharedEvents,
} from 'victory';


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
	chartPaper: {
		width: 400,
		height: 400,
	},
	tooltipChart: {
		display: "block",
		boxSizing: "border-box",
		margin: "0 auto",
		padding: 0,
		width: "auto",
		height: "100%",
		maxHeight: "280px"
	}

}

/*********************** Customized class for Chars ***********************/
class Wrapper extends Component {
	render() {
		const { children } = this.props;
		const childProps = Object.assign({}, this.props, children.props);
		return (
			<g transform="translate(20, 40)">
				<VictoryLabel text={"add labels"} x={110} y={30} />
				<VictoryLabel text={"offset data from axes"} x={70} y={150} />
				<VictoryLabel text={"alter props"} x={280} y={150} />
				{React.cloneElement(children, childProps) }
			</g>
		);
	}
}

class CatPoint extends Component {
	render() {
		const {x, y, datum} = this.props;
		const cat = datum.y >= 0 ? "😻" : "😹";
		return (
			<text x={x} y={y} fontSize={30}>
				{cat}
			</text>
		);
	}
}

class TestPage extends Component {

	static propTypes = {
		// generators: PropTypes.object,
		// dispatch: PropTypes.func
	};

	constructor(props) {
		super(props);

		// Initialize variables


		// Initialize react state variables
		this.state = {
			data: this.getData(),
			scatterData: this.getScatterData(),
		};
	}

	componentDidMount() {
		// this.setStateInterval = window.setInterval(() => {
		// 	this.setState({
		// 		data: this.getData(),
		// 		scatterData: this.getScatterData(),
		// 	});
		// }, 3000);
	}

	// Deconstructor
	componentWillUnmount() {
		window.clearInterval(this.setStateInterval);
	}

	renderSimpleChart() {
		// Test victory chart components
		const data = [
			{ quarter: 1, earnings: 13000, label: "A" },
			{ quarter: 2, earnings: 16500, label: "A" },
			{ quarter: 3, earnings: 14250, label: "A" },
			{ quarter: 4, earnings: 19000, label: "A" }
		];

		const data2012 = [
			{ quarter: 1, earnings: 13000 },
			{ quarter: 2, earnings: 16500 },
			{ quarter: 3, earnings: 14250 },
			{ quarter: 4, earnings: 19000 }
		];

		const data2013 = [
			{ quarter: 1, earnings: 15000 },
			{ quarter: 2, earnings: 12500 },
			{ quarter: 3, earnings: 19500 },
			{ quarter: 4, earnings: 13000 }
		];

		const data2014 = [
			{ quarter: 1, earnings: 11500 },
			{ quarter: 2, earnings: 13250 },
			{ quarter: 3, earnings: 20000 },
			{ quarter: 4, earnings: 15500 }
		];

		const data2015 = [
			{ quarter: 1, earnings: 18000 },
			{ quarter: 2, earnings: 13250 },
			{ quarter: 3, earnings: 15000 },
			{ quarter: 4, earnings: 12000 }
		];

		return (
			<VictoryChart
				// adding the material theme provided with Victory
				theme={VictoryTheme.material}
				// domainPadding will add space to each side of VictoryBar to
				// prevent it from overlapping the axis
				domainPadding={20}
				>
				<VictoryAxis
					// tickValues specifies both the number of ticks and where
					// they are placed on the axis
					tickValues={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
					/>
				<VictoryAxis
					dependentAxis
					// tickFormat specifies how ticks should be displayed
					tickFormat={(x) => (`$${x / 1000}k`) }
					/>
				{/*
				<VictoryBar
					data={data}
					// data accessor for x values
					x={"quarter"}
					// data accessor for y values
					y={"earnings"}
					/>
					*/}
				<VictoryStack
					colorScale={"warm"}
					>
					<VictoryBar
						data={data2012}
						x={"quarter"}
						y={"earnings"}
						/>
					<VictoryBar
						data={data2013}
						x={"quarter"}
						y={"earnings"}
						/>
					<VictoryBar
						data={data2014}
						x={"quarter"}
						y={"earnings"}
						/>
					<VictoryBar
						data={data2015}
						x={"quarter"}
						y={"earnings"}
						/>
				</VictoryStack>
			</VictoryChart>
		)
	}

	getData() {
		const bars = random(6, 10);
		return range(bars).map((bar) => {
			return { x: bar + 1, y: random(2, 10) };
		});
	}

	renderAnimationChart() {
		return (
			<VictoryChart
				domainPadding={{ x: 20 }}
				animate={{ duration: 500 }}
				>
				<VictoryBar
					data={this.state.data}
					style={{
						data: { fill: "tomato", width: 12 }
					}}
					animate={{
						onExit: {
							duration: 500,
							before: () => ({
								y: 0,
								fill: "orange",
								label: "BYE"
							})
						}
					}}
					/>
			</VictoryChart>
		)
	}

	getScatterData() {
		const colors = [
			"violet", "cornflowerblue", "gold", "orange",
			"turquoise", "tomato", "greenyellow"
		];
		const symbols = [
			"circle", "star", "square", "triangleUp",
			"triangleDown", "diamond", "plus"
		];
		return range(25).map((index) => {
			const scaledIndex = Math.floor(index % 7);
			return {
				x: random(10, 50),
				y: random(2, 100),
				size: random(8) + 3,
				symbol: symbols[scaledIndex],
				fill: colors[random(0, 6)],
				opacity: 0.6
			};
		});
	}

	renderScatterChart() {
		return (
			<VictoryChart animate={{ duration: 2000, easing: "bounce" }}>
				<VictoryScatter
					data={this.state.scatterData}
					/>
			</VictoryChart>
		)
	 }

	 renderWrapperChart() {
		return (
			<VictoryChart>
				<Wrapper>
					<VictoryScatter
						y={(d) => Math.sin(2 * Math.PI * d.x) }
						samples={15}
						symbol="square"
						size={6}
						style={{ data: { stroke: "tomato", strokeWidth: 3 } }}
						/>
				</Wrapper>
			</VictoryChart>
		)
	 }

	 renderCatPointChart() {
		return (
			<VictoryChart>
				<VictoryScatter
					y={(d) =>
						Math.sin(2 * Math.PI * d.x)
					}
					samples={25}
					dataComponent={<CatPoint />}
					/>
			</VictoryChart>
		)
	 }

	 renderLineChart() {
		return (
			<VictoryChart>
				<VictoryLine
					samples={50}
					style={{
						data:
						{ stroke: "red", strokeWidth: 4 }
					}}
					y={(data) => Math.sin(2 * Math.PI * data.x) }
					/>

				<VictoryLine
					samples={10}
					style={{
						data:
						{ stroke: "blue", strokeWidth: 4 }
					}}
					y={(data) => Math.cos(2 * Math.PI * data.x) }
					/>
			</VictoryChart>
		)
	 }

	 renderEventChart() {
		return (



			<VictoryBar
				data={[
					{ x: 1, y: 2, label: "A" },
					{ x: 2, y: 4, label: "B" },
					{ x: 3, y: 7, label: "C" },
					{ x: 4, y: 3, label: "D" },
					{ x: 5, y: 5, label: "E" },
				]}

				eventKey={(datum) => datum.label}
				events={[
					{
						target: "data",
						eventKey: ["A", "B"],
						eventHandlers: {
							onClick: () => {
								return [
									{
										eventKey: "D",
										mutation: (props) => {
											return {
												style: Object.assign(props.style, { fill: "green" })
											}
										}
									},
									{
										eventKey: "E",
										mutation: (props) => {
											return {
												style: Object.assign(props.style, { fill: "red" })
											}
										}
									}
								];
							}
						}
					},
					{
						target: "data",
						eventKey: ["C"],
						eventHandlers: {
							onClick: () => {
								return [{
									target: "labels",
									mutation: (props) => {
										return props.text === "clicked" ?
											null : { text: "clicked" }
									}
								}];
							}
						}
					},
					{
						target: "data",
						eventKey: ["D"],
						eventHandlers: {
							onClick: (evt) => alert(`(${evt.clientX}, ${evt.clientY})`)
						}
					}
				]}
				/>
		)
	 }

	 renderNestedEventChart() {
		return (
			<VictoryChart
				events={[{
					childName: ["area-1", "area-2"],
					target: "data",
					eventHandlers: {
						onClick: () => {
							return [{
								childName: "area-4",
								mutation: (props) => {
									const fill = props.style.fill;
									return fill === "tomato" ? null : { style: { fill: "tomato" } };
								}
							}];
						}
					}
				}]}
				>
				<VictoryStack>
					<VictoryArea name="area-1"
						data={[
							{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 5 }, { x: "d", y: 4 }
						]}
						/>
					<VictoryArea name="area-2"
						data={[
							{ x: "a", y: 1 }, { x: "b", y: 4 }, { x: "c", y: 5 }, { x: "d", y: 7 }
						]}
						/>
					<VictoryArea name="area-3"
						data={[
							{ x: "a", y: 3 }, { x: "b", y: 2 }, { x: "c", y: 6 }, { x: "d", y: 2 }
						]}
						/>
					<VictoryArea name="area-4"
						data={[
							{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 3 }, { x: "d", y: 4 }
						]}
						/>
				</VictoryStack>
			</VictoryChart>
		)
	 }

	 renderSharedEventChart() {
		return (
			<svg width={800} height={400}>
				<VictorySharedEvents
					events={[{
						childName: ["pie", "bar"],
						target: "data",
						eventHandlers: {
							onClick: () => {
								return [{
									childName: ["pie", "bar"],
									mutation: (props) => {
										const fill = props.style.fill;
										return fill === "tomato" ?
											null :
											{ style: Object.assign({}, props.style, { fill: "tomato" }) }
									}
								}];
							}
						}
					}]}
					>
					<VictoryBar name="bar"
						width={400}
						groupComponent={<g transform={"translate(400, 0)"} />}
						standalone={false}
						style={{ data: { width: 20 } }}
						data={[
							{ x: "a", y: 2 }, { x: "b", y: 3 }, { x: "c", y: 5 }, { x: "d", y: 4 }
						]}
						/>
					<VictoryPie name="pie"
						standalone={false}
						data={[
							{ x: "a", y: 1 }, { x: "b", y: 4 }, { x: "c", y: 5 }, { x: "d", y: 7 }
						]}
						/>
				</VictorySharedEvents>
			</svg>
		)
	 }

	 renderTooltipChart() {
		const lineData = [
			{ x: 1, y: 39 },
			{ x: 2, y: 31 },
			{ x: 3, y: 43 },
			{ x: 4, y: 54 },
			{ x: 5, y: 50 }
		];
		const barData = [
			{ x: 1, y: 12, label: "Jan 2010" },
			{ x: 2, y: 13, label: "Apr 2010" },
			{ x: 3, y: 81, label: "Jul 2010" },
			{ x: 4, y: 49, label: "Oct 2010" },
			{ x: 5, y: 30, label: "Jan 2011" },
			{ x: 6, y: 29, label: "Apr 2011" },
			{ x: 7, y: 13, label: "Jul 2011" },
			{ x: 8, y: 53, label: "Oct 2011" },
			{ x: 9, y: 24, label: "Jan 2012" },
			{ x: 10, y: 68, label: "Apr 2012" },
			{ x: 11, y: 52, label: "Jul 2012" },
			{ x: 12, y: 29, label: "Oct 2012" },
			{ x: 13, y: 27, label: "Jan 2013" },
			{ x: 14, y: 100, label: "Apr 2013" },
			{ x: 15, y: 10, label: "Jul 2013" },
			{ x: 16, y: 77, label: "Oct 2013" },
			{ x: 17, y: 76, label: "Jan 2014" },
			{ x: 18, y: 61, label: "Apr 2014" },
			{ x: 19, y: 48, label: "Jul 2014" },
			{ x: 20, y: 15, label: "Oct 2014" }
		];

		return (
			<svg
				viewBox="0 0 450 350"
				className="fancyBorder"
				style={styles.tooltipChart}
				>
				<VictorySharedEvents
					width={450}
					height={350}
					events={[
						{
							childName: "bar",
							target: "data",
							eventHandlers: {
								onMouseOver: () => {
									return [
										{
											childName: "line",
											mutation: (props) => {
												return { style: merge({}, props.style, { stroke: "blue" }) };
											}
										},
										{
											mutation: (props) => {
												return { style: merge({}, props.style, { fill: "gold" }) };
											}
										},
										{
											target: "labels",
											mutation: (props) => {
												return { style: merge({}, props.style, { fill: "black" }) };
											}
										}
									];
								},
								onMouseOut: () => {
									return [
										{
											childName: "line",
											mutation: (props) => {
												return { style: merge({}, props.style, { stroke: "transparent" }) };
											}
										},
										{
											mutation: (props) => {
												return { style: merge({}, props.style, { fill: "tomato" }) };
											}
										},
										{
											target: "labels",
											mutation: (props) => {
												return { style: merge({}, props.style, { fill: "transparent" }) };
											}
										}
									];
								}
							}
						}
					]}
					>
					<VictoryBar
						name="bar"
						width={450}
						height={350}
						data={barData}
						style={{ data: { fill: "tomato" }, labels: { fill: "transparent" } }}
						standalone={false}
						/>
					<VictoryLine
						name={"line"}
						data={lineData}
						width={450}
						height={350}
						standalone={false}
						domain={{ y: [0, 100] }}
						style={{ data: { stroke: "transparent" } }}
						/>
					<VictoryAxis
						standalone={false}
						width={450}
						label="Year"
						height={350}
						tickValues={["2010", "2011", "2012", "2013", "2014", "2015"]}
						/>
				</VictorySharedEvents>
			</svg>
		);
	 }



	getCustomStyles() {
		const BLUE_COLOR = "#00a3de";
		const RED_COLOR = "#7c270b";

		return {
			parent: {
				boxSizing: "border-box",
				display: "inline",
				padding: 0,
				fontFamily: "'Fira Sans', sans-serif",
				width: "100%",
				height: "auto"
			},
			labelNumber: {
				fill: "#ffffff",
				fontFamily: "inherit",
				fontSize: "14px"
			},
			axisYears: {
				axis: {
					stroke: "black",
					strokeWidth: 1
				},
				ticks: {
					size: (tick) => {
						const tickSize =
							tick.getFullYear() % 5 === 0 ? 10 : 5;
						return tickSize;
					},
					stroke: "black",
					strokeWidth: 1
				},
				tickLabels: {
					fill: "black",
					fontFamily: "inherit",
					fontSize: 16
				}
			},
			// DATA SET ONE
			axisOne: {
				grid: {
					stroke: (tick) =>
						tick === -10 ? "transparent" : "#ffffff",
					strokeWidth: 2
				},
				axis: {
					stroke: BLUE_COLOR,
					strokeWidth: 0
				},
				ticks: {
					strokeWidth: 0
				},
				tickLabels: {
					fill: BLUE_COLOR,
					fontFamily: "inherit",
					fontSize: 16
				}
			},
			labelOne: {
				fill: BLUE_COLOR,
				fontFamily: "inherit",
				fontSize: 12,
				fontStyle: "italic"
			},
			lineOne: {
				data: {
					stroke: BLUE_COLOR,
					strokeWidth: 4.5
				}
			},
			axisOneCustomLabel: {
				fill: BLUE_COLOR,
				fontFamily: "inherit",
				fontWeight: 300,
				fontSize: 21
			},
			// DATA SET TWO
			axisTwo: {
				axis: {
					stroke: RED_COLOR,
					strokeWidth: 0
				},
				ticks: {
					strokeWidth: 0
				},
				tickLabels: {
					fill: RED_COLOR,
					fontFamily: "inherit",
					fontSize: 16
				}
			},
			labelTwo: {
				fill: RED_COLOR,
				fontFamily: "inherit",
				fontSize: 12,
				fontStyle: "italic"
			},
			lineTwo: {
				data: {
					stroke: RED_COLOR,
					strokeWidth: 4.5
				}
			},
			// HORIZONTAL LINE
			lineThree: {
				data: {
					stroke: "#e95f46",
					strokeWidth: 2
				}
			}
		};
	}

	 renderCustomStylesChart() {
		const styles = this.getCustomStyles();
		const data_1 = [
			{ x: new Date(2000, 1, 1), y: 12 },
			{ x: new Date(2000, 6, 1), y: 10 },
			{ x: new Date(2000, 12, 1), y: 11 },
			{ x: new Date(2001, 1, 1), y: 5 },
			{ x: new Date(2002, 1, 1), y: 4 },
			{ x: new Date(2003, 1, 1), y: 6 },
			{ x: new Date(2004, 1, 1), y: 5 },
			{ x: new Date(2005, 1, 1), y: 7 },
			{ x: new Date(2006, 1, 1), y: 8 },
			{ x: new Date(2007, 1, 1), y: 9 },
			{ x: new Date(2008, 1, 1), y: -8.5 },
			{ x: new Date(2009, 1, 1), y: -9 },
			{ x: new Date(2010, 1, 1), y: 5 },
			{ x: new Date(2013, 1, 1), y: 1 },
			{ x: new Date(2014, 1, 1), y: 2 },
			{ x: new Date(2015, 1, 1), y: -5 }
		];
		const data_2 = [
			{ x: new Date(2000, 1, 1), y: 5 },
			{ x: new Date(2003, 1, 1), y: 6 },
			{ x: new Date(2004, 1, 1), y: 4 },
			{ x: new Date(2005, 1, 1), y: 10 },
			{ x: new Date(2006, 1, 1), y: 12 },
			{ x: new Date(2007, 2, 1), y: 48 },
			{ x: new Date(2008, 1, 1), y: 19 },
			{ x: new Date(2009, 1, 1), y: 31 },
			{ x: new Date(2011, 1, 1), y: 49 },
			{ x: new Date(2014, 1, 1), y: 40 },
			{ x: new Date(2015, 1, 1), y: 21 }
		];

		return (
			<svg
				style={styles.parent}
				viewBox="0 0 450 350"
				>
				<rect
					x="0" y="0"
					width="450" height="350"
					fill="#ccdee8"
					/>

				<rect
					x="0"
					y="0"
					width="10"
					height="30"
					fill="#f01616"
					/>

				<rect
					x="420"
					y="10"
					width="20"
					height="20"
					fill="#458ca8"
					/>

				<VictoryLabel
					x={430} y={25}
					textAnchor="middle"
					verticalAnchor="end"
					style={styles.labelNumber}
					>
					{"1"}
				</VictoryLabel>

				<VictoryLabel
					x={25} y={15}
					textAnchor="start"
					verticalAnchor="start"
					lineHeight={1.2}
					style={{
						fill: "#000000",
						fontFamily: "inherit",
						fontSize: "18px",
						fontWeight: "bold"
					}}
					>
					{"An outlook"}
				</VictoryLabel>

				<VictoryLabel
					x={25} y={70}
					verticalAnchor="end"
					lineHeight={1.2}
					style={styles.labelOne}
					>
					{"Economy \n % change on a year earlier"}
				</VictoryLabel>

				<VictoryLabel
					x={425} y={70}
					textAnchor="end"
					verticalAnchor="end"
					lineHeight={1.2}
					style={styles.labelTwo}
					>
					{"Dinosaur exports\n $bn"}
				</VictoryLabel>

				<g transform={"translate(0, 40)"}>
					<VictoryLabel
						x={37} y={161}
						textAnchor="middle"
						verticalAnchor="end"
						style={styles.axisOneCustomLabel}
						>
						{"+"}
					</VictoryLabel>

					<VictoryLabel
						x={37} y={199}
						textAnchor="middle"
						verticalAnchor="end"
						style={styles.axisOneCustomLabel}
						>
						{"-"}
					</VictoryLabel>

					<VictoryAxis dependent
						domain={[-10, 15]}
						offsetX={50}
						orientation="left"
						standalone={false}
						style={styles.axisOne}
						tickFormat={
							(x) => { return Math.abs(x).toString(); }
						}
						/>

					<VictoryAxis dependent
						domain={[0, 50]}
						orientation="right"
						standalone={false}
						style={styles.axisTwo}
						/>

					<VictoryAxis
						scale="time"
						standalone={false}
						style={styles.axisYears}
						tickValues={[
							new Date(1999, 1, 1),
							new Date(2000, 1, 1),
							new Date(2001, 1, 1),
							new Date(2002, 1, 1),
							new Date(2003, 1, 1),
							new Date(2004, 1, 1),
							new Date(2005, 1, 1),
							new Date(2006, 1, 1),
							new Date(2007, 1, 1),
							new Date(2008, 1, 1),
							new Date(2009, 1, 1),
							new Date(2010, 1, 1),
							new Date(2011, 1, 1),
							new Date(2012, 1, 1),
							new Date(2013, 1, 1),
							new Date(2014, 1, 1),
							new Date(2015, 1, 1),
							new Date(2016, 1, 1)
						]}
						tickFormat={
							(x) => {
								if (x.getFullYear() === 2000) {
									return x.getFullYear();
								}
								if (x.getFullYear() % 5 === 0) {
									return x.getFullYear().toString().slice(2);
								}
							}
						}
						/>

					<VictoryLine
						data={[
							{ x: new Date(1999, 1, 1), y: 0 },
							{ x: new Date(2014, 6, 1), y: 0 }
						]}
						domain={{
							x: [new Date(1999, 1, 1), new Date(2016, 1, 1)],
							y: [-10, 15]
						}}
						scale={{ x: "time", y: "linear" }}
						standalone={false}
						style={styles.lineThree}
						/>

					<VictoryLine
						data={data_1}
						domain={{
							x: [new Date(1999, 1, 1), new Date(2016, 1, 1)],
							y: [-10, 15]
						}}
						interpolation="monotoneX"
						scale={{ x: "time", y: "linear" }}
						standalone={false}
						style={styles.lineOne}
						/>

					<VictoryLine
						data={data_2}
						domain={{
							x: [new Date(1999, 1, 1), new Date(2016, 1, 1)],
							y: [0, 50]
						}}
						interpolation="monotoneX"
						scale={{ x: "time", y: "linear" }}
						standalone={false}
						style={styles.lineTwo}
						/>
				</g>
			</svg>
		);
	 }

	 renderCentralAxisChart() {
		// Data sets
		const dataA = [
			{ x: "Personal Drones", y: 57 },
			{ x: "Smart Thermostat", y: 40 },
			{ x: "Television", y: 38 },
			{ x: "Smartwatch", y: 37 },
			{ x: "Fitness Monitor", y: 25 },
			{ x: "Tablet", y: 19 },
			{ x: "Camera", y: 15 },
			{ x: "Laptop", y: 13 },
			{ x: "Phone", y: 12 }
		];
		// const dataB = dataA.map(point => {
		// 	const y = Math.round(point.y + 3 * (Math.random() - 0.5));
		// 	return { ...point, y };  
		// });

		const dataB = [
			{ x: "Personal Drones", y: 57 },
			{ x: "Smart Thermostat", y: 40 },
			{ x: "Television", y: 38 },
			{ x: "Smartwatch", y: 37 },
			{ x: "Fitness Monitor", y: 28 },
			{ x: "Tablet", y: 19 },
			{ x: "Camera", y: 17 },
			{ x: "Laptop", y: 13 },
			{ x: "Phone", y: 13 }
		];
		return (
      <svg style={{ width: "100%", height: "auto", marginTop: -50 }} viewBox="0 0 500 300">

        <VictoryStack horizontal
          /* setting a symmetric domain makes it much easier to center the axis */
          domain={{ x: [-60, 60] }}
          /*
            When not using two adjacent Victory components without a wrapper component
            like VictoryChart or VictoryStack width, height and padding padding must be
            set in top level component so that they match up with each other.
          */
          height={300}
          width={500}
          standalone={false}
          style={{
            data: { width: 20 },
            labels: { fontSize: 11 }
          }}
					>
          <VictoryBar
            style={{ data: { fill: "tomato" } }}
            data={dataA}
            x={"x"}
            y={(data) => (-Math.abs(data.y)) }
            labels={(data) => (`${Math.abs(data.y)}%`) }
						/>
          <VictoryBar
            style={{ data: { fill: "orange" } }}
            data={dataB}
            labels={(data) => (`${Math.abs(data.y)}%`) }
						/>
        </VictoryStack>

        <VictoryAxis dependentAxis
          height={300}
          width={500}
          style={{
            axis: { stroke: "transparent" },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 11, fill: "black" }
          }}
          /*
            Use a custom tickLabelComponent with an absolutely positioned x value
            to position your tick labels in the center of the chart. The correct
            y values are still provided by VictoryAxis for each tick
          */
          tickLabelComponent={
            <VictoryLabel x={245} dy={-0.5} textAnchor="middle" verticalAnchor="start"/>
          }
          standalone={false}
          tickValues={dataA.map(point => point.x).reverse() }
					/>
      </svg>
    );
	 }

	render() {
		return (
			<div id="content">
				<div>
					<Title render={'测试组件'} />
					<ResponsiveReactGridLayout className="layout" isDraggable={false} isResizable={false}
						rowHeight={styles.chartPaper.height}
						breakpoints={{ lg: 1000, md: 996, sm: 332, xs: 160, xxs: 0 }}
						cols={{ lg: 4, md: 2, sm: 1, xs: 1, xxs: 1 }}
						>
						<div key="tcs-1" _grid={{ x: 0, y: 0, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderSimpleChart() }
							</PaperContainer>
						</div>

						<div key="tcs-2" _grid={{ x: 1, y: 0, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderAnimationChart() }
							</PaperContainer>
						</div>

						<div key="tcs-3" _grid={{ x: 2, y: 0, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderScatterChart() }
							</PaperContainer>
						</div>

						<div key="tcs-4" _grid={{ x: 3, y: 1, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderWrapperChart() }
							</PaperContainer>
						</div>

						<div key="tcs-5" _grid={{ x: 0, y: 1, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderCatPointChart() }
							</PaperContainer>
						</div>

						<div key="tcs-6" _grid={{ x: 1, y: 1, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderLineChart() }
							</PaperContainer>
						</div>

						<div key="tcs-7" _grid={{ x: 2, y: 1, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderEventChart() }
							</PaperContainer>
						</div>

						<div key="tcs-8" _grid={{ x: 3, y: 1, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderNestedEventChart() }
							</PaperContainer>
						</div>

						<div key="tcs-9" _grid={{ x: 0, y: 2, w: 2, h: 1 }}>
							<PaperContainer style={{ width: styles.chartPaper.width * 2, height: styles.chartPaper.height }}>
								{this.renderSharedEventChart() }
							</PaperContainer>
						</div>

						<div key="tcs-10" _grid={{ x: 2, y: 2, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderTooltipChart() }
							</PaperContainer>
						</div>

						<div key="tcs-11" _grid={{ x: 3, y: 2, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								{this.renderCustomStylesChart() }
							</PaperContainer>
						</div>


						<div key="tcs-12" _grid={{ x: 0, y: 3, w: 2, h: 1 }}>
							<PaperContainer style={{ width: styles.chartPaper.width * 2, height: styles.chartPaper.height }}>
								{this.renderCentralAxisChart() }
							</PaperContainer>
						</div>

						<div key="tcs-13" _grid={{ x: 2, y: 3, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								<DemoLiveChart/>
							</PaperContainer>
						</div>
						
						<div key="tcs-14" _grid={{ x: 3, y: 3, w: 1, h: 1 }}>
							<PaperContainer style={styles.chartPaper}>
								<TooltipChart/>
							</PaperContainer>
						</div>
						



					</ResponsiveReactGridLayout>
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
export default connect(mapStateToProps)(TestPage);


/************** Backup code ******************/
