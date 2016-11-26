import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ShopElementGroup from './ShopElementGroup'

class ShopWindow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { itemCollection } = this.props;

    <div>
      <ShopElementGroup itemCollection={itemCollection} />
    </div>
  }
}

ShopElementGroup.propTypes = {
  itemCollection: PropTypes.array.isRequired
};

export default ShopElementGroup;