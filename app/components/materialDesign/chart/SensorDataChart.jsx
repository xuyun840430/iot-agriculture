import React from "react";
import ReactDOM from 'react-dom';
import { VictoryAxis, VictoryChart, VictoryStack, VictoryBar, VictoryLabel, VictoryTheme } from "victory";
import Flyout from './Flyout'

class SensorDataChart extends React.Component {
  getStyles() {
    return {
      view: {
        height: 300,
        width: 500,
      },
    };
  }

  render() {
    const styles = this.getStyles();

    // Sensor data sets
    const sensorData = [
      { x: "1#土壤温度", y: 23 },
      { x: "1#土壤湿度", y: 26 },
      { x: "1#大气温度", y: 25 },
      { x: "1#空气湿度", y: 86 },
      { x: "1#光照强度", y: 10050 },
      { x: "1#二氧化碳", y: 418 },
      { x: "2#土壤温度", y: 29 },
      { x: "2#土壤湿度", y: 50 },
      { x: "2#大气温度", y: 30 },
      { x: "2#空气湿度", y: 81 },
      { x: "2#光照强度", y: 7533 },
      { x: "2#二氧化碳", y: 461 },
    ];

    // const dataB = dataA.map(point => {
    // 	const y = Math.round(point.y + 3 * (Math.random() - 0.5));
    // 	return { ...point, y };  
    // });


    return (
      <svg
        style={{ marginLeft: -50 }}
        viewBox="-40 30 500 300"
        >

        <VictoryStack horizontal
          /* setting a symmetric domain makes it much easier to center the axis */
          domain={{ x: [0, 12000] }}
          /*
            When not using two adjacent Victory components without a wrapper component
            like VictoryChart or VictoryStack width, height and padding padding must be
            set in top level component so that they match up with each other.
          */
          height={styles.view.height}
          width={styles.view.width}
          domainPadding={20}
          standalone={false}
          style={{
            // data: { width: 20 },
            labels: { fontSize: 11 }
          }}
          >
          <VictoryBar
            style={{ data: { fill: "green" } }}
            data={sensorData.reverse() }
            x={"x"}
            y={(data) => (Math.abs(data.y)) }
            labels={(data) => (`${Math.abs(data.y)}`) }
            />
        </VictoryStack>

        <VictoryAxis dependentAxis
          height={styles.view.height}
          width={styles.view.width}
          domainPadding={20}
          style={{
            axis: { stroke: "gray", strokeWidth: 1 },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 11, fill: "black" }
          }}

          tickLabelComponent={
            <VictoryLabel
              x={15} dy={-0.5}
              textAnchor="middle"
              verticalAnchor="start"
              style={{
                // fill: "#000000",
                fontFamily: "Roboto, Microsoft YaHei",
                fontSize: "8px",
                // fontWeight: "bold"
              }}
              />
          }
          standalone={false}
          tickValues={sensorData.map(point => point.x) }
          />

        <VictoryAxis
          style={{
            axis: { stroke: "transparent", strokeWidth: 1 },
            ticks: { stroke: "transparent" },
            tickLabels: { fontSize: 12, fill: "black" },
            grid: { stroke: "gray", opacity: 1, strokeWidth: 0.5 },
          }}
          domain={{ x: [0, 12000] }}
          // label="当前值"
          axisLabelComponent={
            <VictoryLabel
              text="当前值"
              x={400} dy={0.5}
              style={{
                // fill: "#000000",
                fontFamily: "Roboto, Microsoft YaHei",
                fontSize: "8px",
                // fontWeight: "bold"
              }}
              />}
          standalone={false}
          />
      </svg>
    );
  }
}

export default SensorDataChart;