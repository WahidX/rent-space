import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

// Components
import {
  Header,
  Home,
  Footer,
  SigninForm,
  SignupForm,
  Page404,
  Favourite,
  Applied,
  Profile,
  PropertyPage,
} from './index';
// Actions
import { fetchProperty, changeMode } from '../actions/property';
import { fetchUser } from '../actions/auth';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedin ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentWillUnmount() {
    console.log('unmount');
  }
  componentDidMount() {
    this.props.dispatch(changeMode('home'));
    this.props.dispatch(fetchProperty());
    this.props.dispatch(fetchUser());
  }

  render() {
    const { property, auth } = this.props;

    return (
      <div>
        <Router>
          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <PrivateRoute
              exact
              path="/profile"
              component={Profile}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              exact
              path="/favourite"
              component={Favourite}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              exact
              path="/applied"
              component={Applied}
              isLoggedin={auth.isLoggedin}
            />
            <PrivateRoute
              exact
              path="/property"
              component={PropertyPage}
              isLoggedin={auth.isLoggedin}
            />

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
    property: state.property.property,
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
