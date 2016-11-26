import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import MarkdownIt from 'markdown-it';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

// React-grid-layout for layout
import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

// Material-UI components


// Customized components
// import BlockContainer from '../Container/BlockContainer';
import PaperContainer from '../Container/PaperContainer';

// Icons
import {red500, blue800, blue400, blue500, grey900, grey400, darkBlack, transparent} from 'material-ui/styles/colors';
import ActionBookmark from 'material-ui/svg-icons/action/bookmark';
import ActionBookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';

/**
 * Styles for React component
 */
var styles = {
	textArea: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    padding: '0 10px',
  },

}

// Safe use of Dangerously Set innerHTML function
function createMarkdown(source) { return { __html: source }; };

// Using markdown-it as markdown render by impl. 'dangerouslySetInnerHTML'
var md = new MarkdownIt();

class MarkdownPaper extends Component {

	static propTypes = {
    markdownSrc: PropTypes.string.isRequired,
		markdownOption: PropTypes.object,
		style: PropTypes.object,
		isSwitchActive: PropTypes.bool,
  };

	constructor(props) {
		super(props);

		// Initialize variables


		// Initialize react state variables
    this.state = {
      markdownSource: this.props.markdownSrc,
			isHTMLFormat: false
    };
	}

	componentDidMount() {

	}

	// Deconstructor
	componentWillUnmount() {

	}

	handleMarkdownChange = (event) => {
    this.setState({
      markdownSource: event.target.value,
    });
  };

	handleCkeckboxToggle = (event, isInputChecked) => {
    this.setState({
      isHTMLFormat: !this.state.isHTMLFormat,
    });
  };

	render() {

		const {
			style,
      markdownSrc,
			markdownOption,
			isSwitchActive
    } = this.props;

    // Using markdown-it as markdown render by impl. 'dangerouslySetInnerHTML'
    // var md = new MarkdownIt();
    // var result = md.render(this.state.markdownSource);

		return (
			<div>
				<PaperContainer style={style}>
					{
						isSwitchActive === true ?
							<Checkbox style={{ marginLeft: -5 }} label={this.state.isHTMLFormat ? 'HTML' : 'Markdown'} onCheck={this.handleCkeckboxToggle}
								checkedIcon={<RemoveRedEye color={red500}/>} uncheckedIcon={<RemoveRedEye/>} /> :
							<div></div>
					}
					{
						this.state.isHTMLFormat === true ?
							<div>
								<TextField id='markdownHTML' style={styles.textArea} multiLine={true}
									fullWidth={true}
									underlineShow={false}
									rows={2} rowsMax={20}
									value={ this.state.markdownSource } onChange={this.handleMarkdownChange} />
							</div> :
							<div dangerouslySetInnerHTML={ createMarkdown(md.render(this.state.markdownSource)) } />
          }
				</PaperContainer>
			</div>
		)
	}
}
export default MarkdownPaper;

/************** Backup code ******************/
// <div id="content">
// 	<div>
// 		<ResponsiveReactGridLayout className="layout" //isDraggable={false} isResizable={false}
// 			// rowHeight={100}
// 			breakpoints={{ lg: 900, md: 747, sm: 576, xs: 360, xxs: 0 }}
// 			cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 1 }}
// 			>
// 			<div key="mdp-1" _grid={{ x: 0, y: 0, w: 8, h: 3 }}>
// 				<PaperContainer>
// 					<ReactMarkdown skipHtml={true} source={ markdownSrc } />
// 				</PaperContainer>
// 			</div>

// 			{/*<div key="mdp-2" _grid={{ x: 8, y: 0, w: 4, h: 3 }}></div>*/}
// 		</ResponsiveReactGridLayout>
// 	</div>
// </div>

// {
// 	renderAsHTML === true ?
// 		<div>
// 			<TextField id='markdownHTML' style={styles.textArea} multiLine={true} fullWidth={true}
// 				underlineShow={false} rows={2} rowsMax={15} value={ markdownSrc }/>
// 		</div> :
// 		<div dangerouslySetInnerHTML={createMarkdown(result) } />
// }

//<div dangerouslySetInnerHTML={{ __html: markdownSrc }} />