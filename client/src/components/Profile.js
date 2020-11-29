import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clearAuthState, updateProfileAPI } from '../actions/auth';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.auth.user.name,
      email: this.props.auth.user.email,
      contact: this.props.auth.user.contact,
      avatar: null,
      imageSrc: this.props.auth.user.avatar,
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
    console.log('STATE: ', this.state);
    const { email, name, contact, avatar } = this.state;
    const fd = new FormData();
    if (avatar !== null) {
      fd.append('avatar', avatar, avatar.name);
    }
    fd.append('name', name);
    fd.append('email', email);
    fd.append('contact', contact);
    this.props.dispatch(updateProfileAPI(this.props.auth.user._id, fd));

    // if (email && name && contact) {
    //   this.props.dispatch(signup(name, email, contact));
    // }
  };

  render() {
    const { error, inProgress, isLoggedin } = this.props.auth;

    if (!isLoggedin) {
      return <Redirect to="/" />;
    }

    return (
      <div id="profile-container">
        <form className="form-container">
          <img src={this.props.auth.user.avatar} alt="user" />

          {error && <span className="form-error">{error}</span>}

          <input
            type="file"
            name="avatar"
            onChange={(e) =>
              this.handleInputChange('avatar', e.target.files[0])
            }
          ></input>
          <br></br>

          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={(e) => this.handleInputChange('name', e.target.value)}
          ></input>
          <br></br>

          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleInputChange('email', e.target.value)}
          ></input>
          <br></br>

          <input
            type="number"
            name="contact"
            value={this.state.contact}
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
              Update
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

export default connect(mapStateToProps)(Profile);
