import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header id="header-container">
        <Link className="logo" to="/">
          Home
        </Link>

        <div id="tabs-container">
          <Link to="/favourite">Favourite</Link>
          <Link to="/favourite">Applied</Link>
        </div>

        <div id="profile-links">
          <Link to="/profile">Profile</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </header>
    );
  }
}

export default Header;
