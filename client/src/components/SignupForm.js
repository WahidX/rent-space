import React, { Component } from 'react';

class SignupForm extends Component {
  render() {
    return (
      <div>
        <form className="form-container">
          <div className="form-title">Sign Up</div>

          <input type="text" name="name" placeholder="Name"></input>
          <br></br>

          <input type="text" name="email" placeholder="Email"></input>
          <br></br>

          <input type="password" name="password" placeholder="Password"></input>
          <br></br>

          <input
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
          ></input>
          <br></br>

          <input type="number" name="contact" placeholder="Contact"></input>
          <br></br>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
