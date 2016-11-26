import React from "react";
import { VictoryLabel } from "victory";


class Flyout extends React.Component {
  static propTypes = {
    active: React.PropTypes.bool
  };

  getFlyoutPath(props) {
    const padding = 4;
    const size = 10;
    const y = props.y + padding;
    const x = props.x;
    const height = (size / 2 * Math.sqrt(3));
    return `M ${x - size - 1}, ${y - size + 1}
      A ${size} ${size + 3} 0 0 1 ${x + size}, ${y - size}
      L ${x + size}, ${y - size}
      L ${x}, ${y + height}
      z`;
  }

  render() {
    const path = this.getFlyoutPath(this.props);
    const pathStyle = {stroke: "teal", fill: "teal"};
    const group = (
      <g>
        <path d={path} style={pathStyle}/>
        <VictoryLabel {...this.props}/>
      </g>
    );
    return this.props.active ? group : null;
  }
}

export default Flyout;