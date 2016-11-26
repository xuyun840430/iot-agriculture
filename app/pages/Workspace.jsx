import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import classnames from 'classnames'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import ShopWindow from '../components/materialDesign/shop/ShopWindow'
import { fetchPlugins } from '../actions/plugins';

class Workspace extends Component {

  //Data that needs to be called before rendering the component (i.e. calling render() method)
  //This is used for server side rending via the preRenderMiddleware() method in '/middlewares'
  static need = [  // eslint-disable-line
    fetchPlugins
  ]

  constructor(props) {
    super(props);

    // Binding functions 
    this.processItems = this.processItems.bind(this);
  }

  componentDidMount() {

  }

  // Deconstructor
  componentWillUnmount() {
  }

  processItems(items) {
    // Initialize variables
    var itemCollection = [];


    // Remove private plugins, only the public plugins can be selected as depended plugin
    _.remove(items, function (n) {
      return n.isprivate === true;
    });

    // Reformat data from server to fill dependencies select box
    for (let i = 0; i < items.length; i++) {

      let isNewCategory = false;

      // Process date format
      items[i].date = _.split(items[i].date, 'T')[0];

      // Initialize itemCollection 
      if (itemCollection.length === 0) {
        itemCollection.push({
          category: items[i].category,
          children: [items[i]]
        });
      } else {
        // Check if the plugin is in same category 
        for (let j = 0; j < itemCollection.length; j++) {
          if (itemCollection[j].category === items[i].category) {
            itemCollection[j].children.push(items[i]);
            isNewCategory = false;
            break;
          } else {
            isNewCategory = true;
          }
        }

        // When the plugin is belong to new category, add it after check all element in itemCollection
        if (isNewCategory === true) {
          itemCollection.push({
            category: items[i].category,
            children: [items[i]]
          });
        }
      }
    }

    return itemCollection;
  }

  render() {
    const { plugins } = this.props.plugin;

    return (
      <div id="content" className="ng-scope faster fadeInUp">
        <ShopWindow itemCollection={this.processItems(plugins) } />
      </div>
    )
  }
}

Workspace.propTypes = {
  plugin: PropTypes.object,
  dispatch: PropTypes.func
};

// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
function mapStateToProps(state) {
  return {
    plugin: state.plugin
  };
}

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(mapStateToProps)(Workspace);


/* Backup code */
// <div className="row">
//   <BigBreadcrumbs items={['主页', '插件市场']} icon="fa fa-fw fa-home" className="col-xs-12 col-sm-7 col-md-7 col-lg-4"/>
// </div>