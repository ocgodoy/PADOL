import React, { Component } from 'react';
import { isAuthenticate } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import DefaultAvatar from '../images/post.jpg';
import { getPost, editPost, getBase64Photo } from './apiPost';

class EditPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      post: {},
      postId: {},
      user: {},
      B64photo:{},
      redirectToSignin: false,
      redirectToProfile: false,
      error: '',
    };
  }

  componentDidMount() {
    if (!isAuthenticate()) return this.setState({ redirectToSignin: true });
    const token = isAuthenticate().token;
    const postId = this.props.match.params.postId;
    

    getPost(postId, token).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({error: data.error})
      }
      else{
          this.setState({
            post: data.content,
            postedBy: data.postedBy,
            postId: data._id,
            date: data.date,
            views: data.views,
            comments: data.comments
          });
        }
    });

    getBase64Photo(postId, token).then(B64photo => {
      if (B64photo.error) console.log(B64photo.error);
      else{
          this.setState({
            B64photo : B64photo,
          });
        }
    });
  }

  handleChange = name => e => {
    let value = name === 'photo' ? e.target.files[0] : e.target.value;
    this.setState({ [name]: value, error: ''});
    console.log("mes valeurs", name, value)
  };



  clickSubmit = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const token = isAuthenticate().token;
    const postId = this.props.match.params.postId;
    editPost(postId, token, this.state.title, this.state.content).then(
      setTimeout(() => {
        this.setState({ redirectToProfile: true });
      }, 100),
      
    );   
  };

  updateComfirmed = e => {
    let answer = window.confirm(
      'Are you sure you want to update your post?'
    );
    if (answer) {this.clickSubmit(e)}
    else{ this.setState({redirectToProfile:true})}
  };
  /*isValid = () => {
    const { title, content, fileSize } = this.state;
    if (fileSize > 300000) {
      this.setState({ error: 'File size should be less than 300kb ' });
      return false;
    } else if (title.length === 0 || content.length === 0) {
      this.setState({ error: 'All field is required' });
      return false;
    }
    return true;
  };*/

  newPostForm = (title, content) => (
    <form>

      <div className='form-group'>
        <label className='text-muted'>Title</label>
        <input
          onChange={this.handleChange('title')}
          value={title}
          type='text'
          className='form-control'
        />
      </div>
      <div className='form-group'>
        <label className='text-muted'>content</label>
        <input
          onChange={this.handleChange('content')}
          value={content}
          type='text'
          className='form-control'
        />
      </div>
      <div className='d-inline-block'>
        <button onClick={this.clickSubmit} className='btn btn-raised btn-success btn-sm'>
          Update Post
        </button>
        <Link to={`/post/${this.state.postId}`} className='btn btn-raised btn-primary btn-sm mr-5'>
          Back to posts
        </Link>
      </div>
    </form>
  );

  render() {
    const {
      post,
      postId,
      title, 
      content,
      B64photo,
      redirectToProfile,
      error,
    } = this.state;


    let photoUrl = 'data:image/jpg;base64,' + B64photo;
    
    if (redirectToProfile) return <Redirect to={`/post/${postId}`} />;
    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Update Post</h2>
        <div
          className='alert alert-danger'
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {!post.title ? (
          <div className='jumbotron text-center'>
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            <img
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultAvatar}`)}
              style={{ width: '30%', height: '15vw', objectFit: 'cover' }}
              alt={post.title}
            />

            {this.newPostForm(title, content)}
          </>
        )}
      </div>
    );
  }
}

export default EditPost;
