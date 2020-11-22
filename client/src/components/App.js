import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// Components
import { Header, Home, Footer, SigninForm, SignupForm, Page404 } from './index';
// Actions
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
        <Router>
          <Header />
          <div>this is App</div>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SigninForm} />
            <Route exact path="/signup" component={SignupForm} />
            <Route component={Page404} />
          </Switch>

          <Footer />
        </Router>
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
