import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <header id="header-container">
        <Link to="/">Home</Link>

        <div id="tabs-container">
          <a href="#">
            <div>Search</div>
          </a>
          <a href="#">
            <div>Favourite</div>
          </a>
          <a href="#">
            <div>Applied</div>
          </a>
        </div>

        <div id="profile">
          <Link to="/profile">Profile</Link>
          <Link to="/signin">Sign in</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </header>
    );
  }
}

export default Header;
