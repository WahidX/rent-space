import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PropertyList } from './';
import { changeMode } from '../actions/property';

class Favourite extends Component {
  componentDidMount() {
    this.props.dispatch(changeMode('favourite'));
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
  return {};
}

export default connect(mapStateToProps)(Favourite);
