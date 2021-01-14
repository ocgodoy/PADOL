import React, { Component } from 'react';
import { isAuthenticate} from '../auth';
import { deleteComment } from './apiPost';

class DeleteComment extends Component {
  state = {
    comment:{},
    position:0,
    redirect: false,
    postId: {}
  };


  removeComment = () => {
    const token = isAuthenticate().token;
    const postId = this.props.postId;
    const userId = this.props.userId;
    const commentId = { _id: this.props.commentId }
    const comment = this.props.comment
    this.setState({postId : postId})
    deleteComment(postId, token, userId, commentId,comment)
    .then(setTimeout(() => {this.setState({ redirect: true });}, 100))
  };

  deleteComfirmed = () => {
    let answer = window.confirm(
      'Are you sure you want to delete your comment?'
    );
    if (answer) this.removeComment();
  };

  render() {
    const { redirect } = this.state;
    if (redirect) { window.location.reload()};
  
    return (
      <div
        onClick={this.deleteComfirmed}
        className='btn-danger btn'
        style={{ float: 'right', marginTop: '-3%' }}
      >
        Remove
      </div>
    );
  }
}

export default DeleteComment;
