import React, { Component } from 'react';
import { PropertyList } from './';
import { connect } from 'react-redux';
import { fetchFavourites } from '../actions/property';

class Favourite extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(fetchFavourites());
  }

  render() {
    return (
      <div>
        <PropertyList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Favourite);
