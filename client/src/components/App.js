import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';

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
} from './index';
// Actions
import { fetchProperty, changeMode } from '../actions/property';
import { authenticateUser } from '../actions/auth';

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
  constructor(props) {
    super(props);
    this.props.dispatch(changeMode('home'));
  }
  componentWillUnmount() {
    console.log('unmount');
  }
  componentDidMount() {
    this.props.dispatch(changeMode('home'));
    this.props.dispatch(fetchProperty());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt_decode(token);

      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
          avatar: user.avatar,
          favourites: user.favourites,
          applied: user.applied,
          contact: user.contact,
        })
      );
    }
  }

  render() {
    const { property, auth } = this.props;
    console.log('PROPS: ', property);

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
