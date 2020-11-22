import React, { Component } from 'react';

class SignupForm extends Component {
  render() {
    return (
      <div>
        <form>
          <label>Name</label>
          <input type="text" name="name"></input>
          <br></br>

          <label>Email</label>
          <input type="text" name="email"></input>
          <br></br>

          <label>Password</label>
          <input type="password" name="password"></input>
          <br></br>

          <label>Confirm Password</label>
          <input type="password" name="confirm_password"></input>
          <br></br>

          <label>Contact Number</label>
          <input type="number" name="contact"></input>
          <br></br>

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default SignupForm;
