import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signin } from '../actions/auth';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    console.log('SignIN submit ==== ', this.state);
    const { email, password } = this.state;
    if (email && password) {
      this.props.dispatch(signin(email, password));
    }
  };

  render() {
    const { error, inProgress } = this.props.auth;

    return (
      <div>
        <form className="form-container">
          <div className="form-title">Sign In</div>

          {error && <span className="form-error">{error}</span>}

          <input
            type="text"
            onChange={this.handleEmailChange}
            placeholder="Email"
            name="email"
          ></input>
          <br></br>

          <input
            type="password"
            onChange={this.handlePasswordChange}
            placeholder="Password"
            name="password"
          ></input>
          <br></br>

          {inProgress ? (
            <button
              type="submit"
              onClick={this.handleFormSubmit}
              disabled={inProgress}
            >
              Signing in ...
            </button>
          ) : (
            <button
              type="submit"
              onClick={this.handleFormSubmit}
              disabled={inProgress}
            >
              Sign In
            </button>
          )}
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SigninForm);
