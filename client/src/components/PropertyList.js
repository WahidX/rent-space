import React, { Component } from 'react';

class PropertyList extends Component {
  render() {
    const properties = this.props;
    console.log('LIST : ', properties);
    return (
      <div>
        <h1>propertyList</h1>
      </div>
    );
  }
}

export default PropertyList;
