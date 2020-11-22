import React, { Component } from 'react';
import { Filter, PropertyList } from './';

class Home extends Component {
  render() {
    return (
      <div>
        <Filter />
        <PropertyList />
      </div>
    );
  }
}

export default Home;
