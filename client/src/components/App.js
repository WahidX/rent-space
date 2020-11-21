import React from 'react';
import { connect } from 'react-redux';
import { fetchProperty } from '../actions/property';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProperty());
  }

  render() {
    console.log('PROPS: ', this.props);
    return <div>this is App</div>;
  }
}

function mapStateToProps(state) {
  return {
    property: state.property,
  };
}

export default connect(mapStateToProps)(App);
