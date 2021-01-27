import React, { Component } from 'react'
import { getAllPost} from './apiPost'
import DefaultAvatar from '../images/avatar.png'
import { Link } from 'react-router-dom'
import { isAuthenticate } from '../auth';

import {Redirect } from 'react-router-dom';

class Posts extends Component {
  constructor () {
    super()
    this.state = {
      posts: [],
      B64photos: {},
      redirectToSignin: false
    }
  }

  componentDidMount () {
    if (!isAuthenticate()) return this.setState({ redirectToSignin: true });
    getAllPost().then(data => {
      if (data.err) console.log(data.err)
      else this.setState({ posts: data })
    })
  } 

 
  renderPost (posts) {
    return (
      <div className='row'>
        {posts.map(post => {
          const posterId = post.postedBy ? post.postedBy._id : ''
          const posterName = post.postedBy ? post.postedBy.pseudo : 'Unknown'
          const infos = post.content
          const date = post.date.uploadDate
          const expiryDate = post.date.expiryDate
          const views = post.views
          const B64photo = post.content.url
          const photoUrl = 'data:image/jpg;base64,' + B64photo;


          return (
            <div className='card col-md-3 mr-5 mb-5 backPosts'  key={post._id}>
              <div class="categoryWrapper">
              <div>
                <Link to={`/user/${posterId}`}>{posterName} </Link>
              </div>
              <img
                className='card-img-top'
                src={photoUrl}
                onError={i => (i.target.src = `${DefaultAvatar}`)}
                style={{ width: '100%', height: '20vw', objectFit: 'cover' }}
              />

              <div>
              <button>
                <span>
                  <span>
                    
                    <Link   to={`/post/${post._id}`} className='btn'> Read More</Link>
                     
                  </span>
                </span>
              </button>

                <p><center>
                <h2>{infos.title}</h2>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h5>{infos.caption.substring(0, 50)}</h5>
                <h5 className='font-italic'> Vues: {views.viewsNumber}/{views.viewsLimit}</h5>
                </center></p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  render () {
    if (this.state.redirectToSignin) return <Redirect to='/signin' />;
    const { posts } = this.state
    return (
      <div className="container-fluid">
        {!posts.length || posts.length === 'undefined' ? (
          <div className='jumbotron text-center'>
            <h2>Welcome to Social Network</h2>
          </div>
        ) : (
          <h2 className='mt-1 mb-1'>Recent Posts</h2>
        )}

        {this.renderPost(posts)}
      </div>
    )
  }
}

export default Posts
/* <p className='font-italic mark'>
   {new Date(date).toDateString()}
 </p>
 <p className='font-italic mark'>
   Expiration {new Date(expiryDate).toDateString()}
 </p>*/