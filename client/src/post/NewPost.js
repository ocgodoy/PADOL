import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import { isAuthenticate } from '../auth';
import { Redirect } from 'react-router-dom';
import { createPost } from './apiPost';

import "react-datepicker/dist/react-datepicker.css";

class NewPost extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      caption: '',
      viewsLimit:'',
      expiryDate:'',
      photo: '',
      user: {},
      redirectToProfile: false,
      error: '',
      loading: false,
      fileSize: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  componentDidMount() {
    this.postData = new FormData();
    this.setState({ user: isAuthenticate().user });
  }
  
  handleChange = name => e => {
    let value = name === 'photo' ? e.target.files[0] : e.target.value;
    let fileSize = name === 'photo' ? e.target.files[0].size : 0;
    this.postData.set(name, value);
    this.setState({ [name]: value, error: '', fileSize });
    console.log("affichage state",this.state)
    console.log(value);
  };

  handleDateChange = date => {
    console.log(date);
    this.postData.set('expiryDate', date);
    this.setState({
      expiryDate: date,
    })
  }
  
  clickSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ loading: true });
      const { user } = this.state;
      const token = isAuthenticate().token;
      this.postData.set("userId", user._id);
      createPost(user._id, token, this.postData).then(res => {
        if (res.error) console.log(res.error);
        else {
          setTimeout(() => {
            this.setState({ redirectToProfile: true });
          }, 100)
        }
      });
    };
  };

  isValid = () => {
    const { title, caption, photo, fileSize, viewsLimit, expiryDate } = this.state;
    if (fileSize > 300000) {
      this.setState({ error: 'File size should be less than 300kb ' });
      return false;
    } else if (title.length === 0 || caption === 0 || photo.size === undefined) {
      this.setState({ error: 'Please fill in the required fields' });
      return false;
    }
    return true;
  };
  
  newPostForm = (title, caption, viewsLimit, expiryDate) => (
    <form>
    <left>
    <div className='form-group'>

    
    

    <label className='text-muted'>Picture</label>

    <input
    
    onChange={this.handleChange('photo')}
    type='file'
    accept='images/*'
    className='form-control'
    />
    
    </div>
    </left>
    
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
    <label className='text-muted'>Caption</label>
    <input
    onChange={this.handleChange('caption')}
    value={caption}
    type='text'
    className='form-control'
    />
    </div>
    <div className='form-group'>
    <label className='text-muted'>
    Views Limit :
    </label>
    <div>
    <select value={viewsLimit} onChange={this.handleChange('viewsLimit')}>
    <option value="1000">Aucune</option>
    <option value="5">5 vues</option>
    <option value="15">15 vues</option>
    <option value="50">50 vues</option>
    <option value="200">200 vues</option>
    </select>
    </div>
    </div>
    <div className='form-groupe'>
      <label className='text-muted'>
        Expires on : 
      </label>
      <DatePicker
        value={expiryDate}
        onChange={this.handleDateChange} //only when value has changed
        selected={expiryDate}
        adjustDateOnChange
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="d MMMM yyyy h:mm aa"
        timeInputLabel="No date selected"
      />

    </div>
    
    <button onClick={this.clickSubmit} className='btn btn-raised btn-primary'>
    Create
    </button>
    </form>
    );
    
    render() {
      const {
        title,
        caption,
        redirectToProfile,
        viewsLimit,
        expiryDate,
        error,
        loading
      } = this.state;
      if (redirectToProfile) return <Redirect to={`/`} />;
      return (
        <div className='container'>
        <h2 className='mt-5 mb-5'>Create Post</h2>
        <div
        className='alert alert-danger'
        style={{ display: error ? '' : 'none' }}
        >
        {error}
        </div>
        {loading ? (
          <div className='jumbotron text-center'>
          <h2>Loading...</h2>
          </div>
          ) : (
            ''
            )}
            
            
            {this.newPostForm(title, caption, viewsLimit, expiryDate)}
            </div>
            );
          }
        }
        
        export default NewPost;
        