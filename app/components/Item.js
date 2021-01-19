/*
 * this component display an item of the carousel
 */

import React from 'react';
class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      item,
      itemClass
    } = this.props;

    if(!item) {
      return '';
    }

    return (
      React.cloneElement(item, {className: itemClass})
    );
  };
};

export default Item;
