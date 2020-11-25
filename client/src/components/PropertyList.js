import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropertyCard } from './';

class PropertyList extends Component {
  render() {
    const { properties } = this.props;

    console.log('Inside PropLIST : ', properties);

    return (
      <div id="property-container">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    properties: state.property,
  };
}

export default connect(mapStateToProps)(PropertyList);
