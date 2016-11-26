import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';


// React-grid-layout for layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI components
import Title from 'react-title-component';

// Customized components
import BlockContainer from '../components/materialDesign/Container/BlockContainer';

// Icons and Colors


/**
 * Styles for React component
 */
var styles = {
	default: {

	},
}

class LandblockInfo extends Component {

	static propTypes = {
    // generators: PropTypes.object,
		// dispatch: PropTypes.func
  };

	constructor(props) {
		super(props);

		// Initialize variables


		// Initialize react state variables
    this.state = {
      // pluginname: '',
			// pluginName: '',
			// pluginType: null,
			// loading: false,
			// finished: false,
			// stepIndex: 0,
    };
	}

	componentDidMount() {

	}

	// Deconstructor
	componentWillUnmount() {

	}

	render() {

		return (
			<div id="content">
				<div>
					<Title render={'地块信息'} />

					<BlockContainer title="地块信息" >
						
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
export default connect(mapStateToProps)(LandblockInfo);


/************** Backup code ******************/
