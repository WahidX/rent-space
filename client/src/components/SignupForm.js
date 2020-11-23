import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup, clearAuthState } from '../actions/auth';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
      contact: '',
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuthState());
  }

  handleInputChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirm_password, name, contact } = this.state;
    if (email && password && confirm_password && name && contact) {
      this.props.dispatch(
        signup(name, email, password, confirm_password, contact)
      );
    }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;

    if (isLoggedin) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <form className="form-container">
          <div className="form-title">Sign Up</div>

          {error && <span className="form-error">{error}</span>}

          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => this.handleInputChange('name', e.target.value)}
          ></input>
          <br></br>

          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => this.handleInputChange('email', e.target.value)}
          ></input>
          <br></br>

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => this.handleInputChange('password', e.target.value)}
          ></input>
          <br></br>

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={(e) =>
              this.handleInputChange('confirm_password', e.target.value)
            }
          ></input>
          <br></br>

          <input
            type="number"
            name="contact"
            placeholder="Contact"
            onChange={(e) => this.handleInputChange('contact', e.target.value)}
          ></input>
          <br></br>

          {inProgress ? (
            <button
              type="submit"
              onClick={this.handleFormSubmit}
              disabled={inProgress}
            >
              Signing up...
            </button>
          ) : (
            <button
              type="submit"
              onClick={this.handleFormSubmit}
              disabled={inProgress}
            >
              Sign Up
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

export default connect(mapStateToProps)(SignupForm);
