import React, { Component } from 'react';
import { isAuthenticate } from '../auth';
import { newComment } from './apiPost';
import DefaultAvatar from '../images/avatar.png';
import { Link } from 'react-router-dom';
import DeleteComment from './DeleteComment';

class Comment extends Component {
  state = {
    text: '',
    error: '',
    redirect : false
  };

  handleChange = e => this.setState({ text: e.target.value });

  isValid = () => {
    const { text } = this.state;
    if (text.length === 0 || text.length > 150) {
      this.setState({
        error: 'Comment should not be empty and less than 150 characters long'
      });
      return false;
    }
    return true;
  };

  addComment = e => {
    e.preventDefault();
    if (this.isValid()) {
      const userId = isAuthenticate().user._id;
      const pseudo = isAuthenticate().user.pseudo;
      const token = isAuthenticate().token;
      const postId = this.props.postId;
      const comment = { text: this.state.text };

      newComment(postId, token, userId, pseudo, comment).then(data => {
        if (data.err) console.log(data.err);
        this.setState({ text: '' });
        setTimeout( () => {this.setState({ redirect: true }) }, 100)
      });
    }
  };

  render() {
    const { text, error } = this.state;
    const { comments } = this.props;
    const { redirect } = this.state;
    if (redirect) {window.location.reload()};
    
    
    return (
      <div>
        <h2 className='mt-5 mb-5'>Leave a comment</h2>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>

        <form onSubmit={this.addComment}>
          <div className='form-group'>
            <input
              onChange={this.handleChange}
              placeholder='My comment...'
              value={text}
              type='text'
              className='form-control'
            />
          </div>
        </form>

        <div>
          <h3 className='text-primary'> Comments</h3>
          <hr />
          {comments &&
            comments.map(comment => (
              <div key={comment._id}>
                <div className='row'>
                  <div>
                    <Link to={`/user/${comment.author}`}>
                      <img
                        style={{
                          borderRadius: '50%',
                          border: '2px solid black'
                        }}
                        className='mr-3'
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.author}`}
                        onError={i => (i.target.src = `${DefaultAvatar}`)}
                        alt={comment.author}
                        height='40px'
                        weight='40px'
                      />

                      <h3 className='lead' style={{ display: 'inline' }}>
                      <Link to={`/user/${comment.author}`}>
                        {comment.pseudo}
                      </Link>:
                      </h3>
                    </Link>
                    <h3> {comment.comment} </h3>
                    <br />
                    <span
                      className='font-italic mark'
                      style={{ paddingRight: '120%' }}
                    >

                      {(new Date(comment.date)).getHours()}:{(new Date(comment.date)).getMinutes()} on {new Date(comment.date).toDateString()}
                      {isAuthenticate().user &&
                      isAuthenticate().user._id === comment.author ? (
                        <DeleteComment
                          userId={comment.author}
                          postId={this.props.postId}
                          commentId={comment._id}
                          comment={comment}
                          //updateComments={this.props.updateComments}
                        />
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </div>
                <hr />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Comment;
