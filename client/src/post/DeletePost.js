import React, { Component } from 'react';
import { isAuthenticate} from '../auth';
import { removePost } from './apiPost';
import { Redirect } from 'react-router-dom';

class DeletePost extends Component {
  state = {
    redirect: false,
    postId:{}
  };

  deletePost = () => {
    const token = isAuthenticate().token;
    const postId = this.props.postId;
    const userId = this.props.userId;
    this.setState({ redirect: true });
    removePost(postId, token, userId)
  };

  deleteComfirmed = () => {
    let answer = window.confirm('Are you sure you want to delete your post?');
    if (answer) this.deletePost();
    
  };

  render() {
    const { redirect } = this.state;
    if (redirect) return  <Redirect to={`/`}></Redirect>;
    return (
      <div onClick={this.deleteComfirmed} className='btn btn-raised btn-danger'>
        Delete Post
      </div>
    );
  }
}

export default DeletePost;
