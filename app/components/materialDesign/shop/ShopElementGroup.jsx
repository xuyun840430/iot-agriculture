import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import ShopElement from './ShopElement'
import ShopElementList from './ShopElementList'

const ShopElementGroup = ({itemCollection}) => {
  const shopElementGroups = itemCollection.map((itemList, key) => {
    return (
      <div key={key}>
        <h1> { itemList.category } <small> 共 { itemList.children.length } 种 </small></h1> <br/>
        <ShopElementList itemList={ itemList.children } />
      </div>
    );
  });

  return (
    <ul>
      { shopElementGroups }
    </ul>
  );
};

ShopElementGroup.propTypes = {
  itemCollection: PropTypes.array.isRequired
};

export default ShopElementGroup;

// <div className="col-sm-12">
// </div>