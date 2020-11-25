import React, { Component } from 'react';
import { isAuthenticate } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { getUser } from './apiUser';
import DefaultAvatar from '../images/avatar.png';
import DeleteProfile from './DeleteProfile';
import FollowProfileButton from './FollowProfileButton';
import ProfileTabs from './ProfileTabs';
import { getPostByUser } from '../post/apiPost';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      auth: {},
      location:{},
      redirectToSignin: false,
      following: false,
      error: '',
      posts: []
    };
  }





  // initialize user's data
  init = userId => {
    const token = isAuthenticate().token;
    getUser(userId, token) // read method must return something
      .then(data => {
        if (data.error) {
          console.log('ERROR');
          this.setState({ redirectToSignin: true });
        } else {
          console.log(data);

          this.setState({ user: data.user });
          this.setState({ auth: data.auth });
          this.setState({ location: data.location });
          //this.loadPosts(data._id);
        }
      });
  };

  loadPosts = userId => {
    const token = isAuthenticate().token;
    getPostByUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ posts: data });
      }
    });
  };

  componentDidMount() {
    console.log('user id from route params: ', this.props.match.params.userId);
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  // another lifecycle that grabs props from react-dom; fires up when props changes
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, user, posts, auth, location} = this.state;
    if (redirectToSignin) return <Redirect to='/signin' />;

    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultAvatar;

    return (
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              style={{ height: '200px', width: 'auto' }}
              className='img-thumbnail'
              src={photoUrl}
              onError={i => (i.target.src = `${DefaultAvatar}`)}
              alt={user.name}
            />
          </div>

          <div className='col-md-6'>
            <div className='lead mt-2'>
              <p>Hello, {user.pseudo}</p>
              <p>Email: {auth.email}</p>
              <p>{`Joined ${new Date(location.date).toDateString()}`}</p>
            </div>

            {isAuthenticate().user && isAuthenticate().user._id === user._id ? (
              <div className='d-line-block'>
                <Link
                  className='btn btn-raised btn-success mr-5'
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>

                <DeleteProfile userId={user._id} />
              </div>
            ) : (
              <FollowProfileButton


              />
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col md-12 mt-5 mb-5'>
            <hr />
            <p className='lead'>user.about</p>

            <hr />
            <ProfileTabs
              posts={posts}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
