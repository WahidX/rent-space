import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

// Components
import { Header, Home, Footer, SigninForm, SignupForm, Page404 } from './index';
// Actions
import { fetchProperty } from '../actions/property';
import { authenticateUser } from '../actions/auth';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchProperty());

    const token = localStorage.getItem('token');

    if (token) {
      const user = jwt_decode(token);

      console.log('user::: ', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { property } = this.props;
    console.log('PROPS: ', property);

    return (
      <div>
        <Router>
          <Header />

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
