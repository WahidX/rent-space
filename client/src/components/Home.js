import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Filter, PropertyList } from './';
import { changeMode } from '../actions/property';

class Home extends Component {
  componentDidMount() {
    this.props.dispatch(changeMode('home'));
  }

  render() {
    return (
      <div>
        <Filter />
        <PropertyList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Home);
