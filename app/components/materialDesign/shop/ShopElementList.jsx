import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ShopElement from './ShopElement'

import {Responsive, WidthProvider} from 'react-grid-layout';
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const ShopElementList = ({itemList}) => {

  const shopElements = itemList.map((item, key) => {

    // // {lg: layout1, md: layout2, ...}
    // var layouts = getLayoutsFromSomewhere();

    // Set base block size from 'WidthProvider()'
    const itemX = 3; const itemY = 2;

    // For 'lg:12', i.e.: 'itemX * rowCnt % 12 = 0' means reachs the end of a row 
    return (
      <div key={key} _grid={{ x: itemX * key % 12, y: itemY * key, w: itemX, h: itemY }}>
        <ShopElement item={item} />
      </div>
    );
  });

  return (
    <ResponsiveReactGridLayout className="layout" isDraggable={false} isResizable={false}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 9, sm: 6, xs: 3, xxs: 1 }}
      >
      { shopElements }
    </ResponsiveReactGridLayout>
  );
};

ShopElementList.propTypes = {
  itemList: PropTypes.array.isRequired
};

export default ShopElementList;