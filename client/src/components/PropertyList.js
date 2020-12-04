import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PropertyCard } from './';

class PropertyList extends Component {
  render() {
    let properties = this.props.property.properties;

    if (this.props.property.mode === 'home') {
      properties = this.props.property.properties;
    } else if (this.props.property.mode === 'favourite') {
      properties = this.props.favourites;
    } else {
      properties = this.props.applied;
    }

    return (
      <div id="property-container">
        {properties.map((property) => (
          <PropertyCard key={property._id} mode="card" property={property} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    property: state.property,
    favourites: state.auth.user.favourites,
    applied: state.auth.user.applied,
  };
}

export default connect(mapStateToProps)(PropertyList);
