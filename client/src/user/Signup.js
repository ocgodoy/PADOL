import React, { Component } from 'react';
import { signup } from '../auth/index.js';
import { Link } from 'react-router-dom';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      pseudo: '',
      location: '',
      error: '',
      success: false
    };
  }


  handleChange = name => e =>
    this.setState({ [name]: e.target.value, error: '' });

  clickSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, password, pseudo } = this.state;
    const user = { firstName, lastName, pseudo };
    const auth = {email, password};
    const newUser = {user:user,auth:auth};
    signup(newUser).then(res => {
      if (res.err) this.setState({ error: res.err });
      else {
        this.setState({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          pseudo: '',
          error: '',
          success: true
        });
      }
    });
  };

  signUpForm = (firstName, lastName, email, password, pseudo) => (
    <form>
      <div className='form-group'>
        <label className='text-muted'>First Name</label>
        <input
          onChange={this.handleChange('firstName')}
          value={firstName}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Last Name</label>
        <input
          onChange={this.handleChange('lastName')}
          value={lastName}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Email</label>
        <input
          onChange={this.handleChange('email')}
          value={email}
          type='email'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Password</label>
        <input
          onChange={this.handleChange('password')}
          value={password}
          type='password'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>Pseudo</label>
        <input
          onChange={this.handleChange('pseudo')}
          value={pseudo}
          type='text'
          className='form-control'
        />
      </div>
      <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>
        Submit
      </button>
    </form>
  );

  render() {
    const { firstName, lastName, email, password, pseudo, error, success } = this.state;
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Sign up</h2>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        <div
          className='alert alert-success'
          style={{ display: success ? '' : 'none' }}
        >
          New acount is successfully created. Pls{' '}
          <Link to='/signin'>Signin</Link>!!!
        </div>

        {this.signUpForm(firstName, lastName, email, password, pseudo)}
      </div>
    );
  }
}

export default Signup;
