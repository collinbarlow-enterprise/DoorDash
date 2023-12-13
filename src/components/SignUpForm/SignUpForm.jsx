import React, { Component } from 'react'
import { signUp } from '../../utilities/users-service';

export default class SignUpForm extends Component {

  // state is always an object with a property for each "piece" of state
  state = {
    firstName: '',
    lastName: '',
    address: '',
    chaseMember: false,
    email: '',
    password: '',
    confirm: '',
    error: ''
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = {...this.state}
      delete formData.error;
      delete formData.confirm;
      const user = await signUp(formData)
      this.props.setUser(user)
    } catch {
      this.setState({ error: 'Sign Up Failed - Try Again'})
    }
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value, error: '' })
  }

  handleChangeCheckbox = (event) => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  };



  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <div>
        <div className="form-container">
          <form autoComplete="off" onSubmit={this.handleSubmit}>
            <label>First Name</label>
            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} required />
            <label>Last Name</label>
            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} required />
            <label>Address</label>
            <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
            <label>Chase Member?</label>
            <input type="checkbox" name="chaseMember" checked={this.state.chaseMember} onChange={this.handleChangeCheckbox} />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
            <label>Confirm</label>
            <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
            <button type="submit" disabled={disable}>SIGN UP</button>
          </form>
        </div>
        <p className="error-message">&nbsp;{this.state.error}</p>
      </div>
    );
  }

}

