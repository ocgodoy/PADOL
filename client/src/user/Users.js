import React, { Component } from 'react';
import { getAllUser } from './apiUser';
import DefaultAvatar from '../images/avatar.png';
import { Link } from 'react-router-dom';
import { isAuthenticate } from '../auth';
import {Redirect } from 'react-router-dom';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }

  componentDidMount() {
    if (!isAuthenticate()) return this.setState({ redirectToSignin: true });
    getAllUser().then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ users: data });
      }
    });
  }

  renderUsers = users => (
    <div className='row'>
      {users.map((user, i) => (
        <div className='card col-md-4' key={i}>
          <img
            style={{ height: 'auto', width: '30vw' }}
            className='img-thumbnail'
            src={user.about.photo ? 'data:image/jpg;base64,' +  user.about.photo.data : DefaultAvatar}
            onError={i => (i.target.src = `${DefaultAvatar}`)}
            alt={user.pseudo}
          />
          <div className='card-body'>
            <h5 className='card-title'>{user.pseudo}</h5>
            <p className='card-text'>{user.auth.email}</p>
            <Link
              to={`/user/${user._id}`}
              className='btn btn-raised btn-primary btn-sm'
            >
              View Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );

  render() {
    if (this.state.redirectToSignin) return <Redirect to='/signin' />;
    const { users } = this.state;
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Users</h2>

        {this.renderUsers(users)}
      </div>
    );
  }
}

export default Users;
