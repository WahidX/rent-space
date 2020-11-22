import React, { Component } from 'react';

class SigninForm extends Component {
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

          <button type="submit">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SigninForm;
