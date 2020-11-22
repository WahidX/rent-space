import React, { Component } from 'react';

class SigninForm extends Component {
  render() {
    return (
      <div>
        <form className="form-container">
          <div className="form-title">Sign In</div>

          <input type="text" placeholder="Email" name="name"></input>
          <br></br>

          <input type="text" placeholder="Password" name="email"></input>
          <br></br>

          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SigninForm;
