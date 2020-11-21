import React from 'react';
import { connect } from 'react-redux';
import property from '../reducers/property';

import { Header, Filter, PropertyList, Footer } from './index';

import { fetchProperty } from '../actions/property';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProperty());
  }

  render() {
    const { property } = this.props;
    console.log('PROPS: ', property);

    return (
      <div>
        <Header />
        <div>this is App</div>
        <Filter />
        <PropertyList properties={property} />
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    property: state.property,
  };
}

export default connect(mapStateToProps)(App);
