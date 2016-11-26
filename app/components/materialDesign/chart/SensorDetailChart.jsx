import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { round, last } from "lodash";
import { VictoryAxis, VictoryChart, VictoryScatter, VictoryArea, VictoryLine } from "victory";
import Flyout from './Flyout'

const leftPad = (str, len, ch) => {
  str = String(str);
  let i = -1;
  if (!ch && ch !== 0) {
    ch = " ";
  }
  len -= str.length;
  while (++i < len) {
    str = ch + str;
  }
  return str;
};

const start = Date.now();

const makeDate = (period, count) => {
  const date = new Date(start + count * period);
  // const date = new Date(currDate);
  const hours = leftPad(date.getHours(), 2, 0);
  const minutes = leftPad(date.getMinutes(), 2, 0);
  const seconds = leftPad(date.getSeconds(), 2, 0);
  return `${hours}:${minutes}:${seconds}`;
};

class SensorDetailChart extends Component {

  static propTypes = {
    data: PropTypes.array,
    period: PropTypes.number,
    domain: PropTypes.array,
  };

  getStyles() {
    return {
      parent: {
        boxSizing: "border-box",
        display: "block",
        width: "100%",
        height: "100%",
        padding: 50,
      },
      line: {
        data: {
          // fill: "teal",
          stroke: "teal",
          strokeWidth: 2,
          fillOpacity: 0.4
        }
      },
      scatter: {
        data: {
          stroke: "teal",
          fill: "white",
          strokeWidth: 2
        },
        labels: {
          fill: "white",
          padding: 18,
          fontSize: 7,
        }
      },
      axis: {
        axis: { stroke: "none" },
        ticks: { stroke: "none" },
        grid: { stroke: "teal", opacity: 0.2 },
        tickLabels: { fill: "teal" }
      }
    };
  }

  render() {
    const styles = this.getStyles();
    const axis_X_points = 3;
    const {
      data,
      period,
      domain,
      label_Y,
    } = this.props;

    const labelTip = [];
    _.forEach(data, function (elem) {
      labelTip.push(round(elem.y, 2));
    });

    let dateAxis = [];
    if (data.length > 0) {

      _.forEach(data, function (d) {
        let date = new Date(d.x);
        let hours = leftPad(date.getHours(), 2, 0);
        let minutes = leftPad(date.getMinutes(), 2, 0);
        let seconds = leftPad(date.getSeconds(), 2, 0);

        dateAxis.push(`${hours}:${minutes}:${seconds}`);
      });
    }

    return (
      <div style={{ marginTop: -50, marginLeft: -50, width: '100%', height: '100%' }}>
        <VictoryChart
          animate={{ duration: 1000 }}
          style={styles.parent}
          >
          <VictoryAxis
            // tickFormat={makeDate.bind(null, period)}
            tickFormat={
              _.drop(dateAxis, dateAxis.length - axis_X_points)
            }
            tickCount={axis_X_points}
            style={{
              ticks: { stroke: "black", strokeWidth: 3 },
              tickLabels: { fontSize: 10, padding: 5 }
            }}
            />
          <VictoryAxis dependentAxis
            label={label_Y}
            tickCount={4}
            tickFormat={(y) => y>1000 ? (`${y / 1000}k`) : y}
            domain={domain}
            style={{
              axisLabel: {
                padding: 30,
                fontSize: 10,
                fontFamily: 'Roboto, Microsoft YaHei',
              },
              ticks: { stroke: "black", strokeWidth: 3, },
              tickLabels: { fontSize: 10, padding: 5 }
            }}
            />
          <VictoryLine
            data={data}
            interpolation="monotoneX"
            style={styles.line}
            />
          <VictoryScatter
            style={styles.scatter}
            data={data}
            size={1}
            labels={labelTip}
            labelComponent={<Flyout />}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onMouseOver: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => {
                          return { active: true };
                        }
                      }, {
                        mutation: (props) => {
                          return {
                            style:
                            Object.assign({}, props.style, { fill: "teal" })
                          };
                        }
                      }
                    ];
                  },
                  onMouseOut: () => {
                    return [
                      {
                        target: "labels",
                        mutation: () => {
                          return { active: false };
                        }
                      }, {
                        mutation: (props) => {
                          return {
                            style:
                            Object.assign({}, props.style, { fill: "white" })
                          };
                        }
                      }
                    ];
                  }
                }
              }
            ]}
            />
        </VictoryChart>
      </div>
    );
  }
}

export default SensorDetailChart;