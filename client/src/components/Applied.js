import React, { Component } from 'react';
import { connect } from 'react-redux';

import { PropertyList } from './';
import { changeMode } from '../actions/property';

class Applied extends Component {
  componentDidMount() {
    this.props.dispatch(changeMode('applied'));
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

export default connect(mapStateToProps)(Applied);
