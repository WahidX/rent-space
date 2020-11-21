import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header id="header-container">
        <div>LOGO</div>
        <div id="tabs-container">
          <a href="#">
            <div>Search</div>
          </a>
          <a href="#">
            <div>Favourrite</div>
          </a>
          <a href="#">
            <div>Applied</div>
          </a>
        </div>
        <div id="profile">
          <a href="#">
            <div>dp</div>
          </a>
          <a href="#">
            <div>resetPassword</div>
          </a>
          <a href="#">
            <div>signout</div>
          </a>
        </div>
      </header>
    );
  }
}

export default Header;
