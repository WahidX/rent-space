import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/auth';

class Header extends Component {
  logOut = () => {
    localStorage.removeItem('token');
    this.props.dispatch(logoutUser());
  };

  render() {
    const { auth } = this.props;

    return (
      <header id="header-container">
        <Link className="logo" to="/">
          Home
        </Link>

        <div id="tabs-container">
          <Link to="/favourite">Favourite</Link>
          <Link to="/applied">Applied</Link>
        </div>

        {auth.isLoggedin ? (
          <div id="profile-links">
            <Link to="/profile">
              <img src={this.props.auth.user.avatar} alt="user" />
              <small> {auth.user.name}</small>
            </Link>
            <button onClick={this.logOut}>Logout</button>
          </div>
        ) : (
          <div id="profile-links">
            <Link to="/signin">Sign in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )}
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Header);
