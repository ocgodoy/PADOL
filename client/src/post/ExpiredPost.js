import React, { Component } from 'react';
import { isAuthenticate } from '../auth';
import { Redirect } from 'react-router-dom';
import DefaultAvatar from '../images/post.jpg';
import { createPost } from './apiPost';
import Test from '../images/padol_logo.png';

class ExpiredPost extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      redirectToProfile: false,
      error: ''
    };
  }

  componentDidMount() {
    this.setState({ user: isAuthenticate().user });
  }




  render() {
    const {
      redirectToProfile,
      user,
      error
    } = this.state;
    if (redirectToProfile) return <Redirect to={`/user/${user._id}`} />;
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>This post is not available anymore</h2>
        <div className='card col-md-3 mr-5 mb-5'>
          <h3> Post </h3>
          <img
            className='card-img-top'
            src={Test}
            style={{ width: '100%', height: '10', objectFit: 'cover' }}
            alt='Card image cap'
          />
          <div className='card-body'>
            <h5 className='card-title'>Unreadable</h5>

          </div>
        </div>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
      </div>
    );
  }
}

export default ExpiredPost;
