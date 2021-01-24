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
      posts: [],
      photo: {},
      userId : {},
      myUserId :{},
      firstName: {},
      lastname: {},
      pseudo: {},
      date :null,
      friendRequests :{},
      friendPending : {},
      friendGroups : {},
      email: {},
      password: {}, 
    };
  }

  componentDidMount() {
    if (!isAuthenticate()) return this.setState({ redirectToSignin: true });
    const token = isAuthenticate().token;
    const myUserId = isAuthenticate().user._id;
    const userId = this.props.match.params.userId;
    console.log("this.state", myUserId, userId)
    getUser(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
        this.setState({error: data.error})
      }
      else{
          const photo = data.about.photo ? data.about.photo.data : DefaultAvatar 
          this.setState({
            myUserId : myUserId,
            userId: userId,
            firstName: data.about.firstName,
            lastname: data.about.lastanme,
            pseudo: data.about.pseudo,
            date : data.location.date,
            friendRequests : data.friends.friendRequests,
            friendPending : data.friends.friendPending,
            friendGroups : data.friends.friendGroups,
            email: data.auth.email,
            password: data.auth.password,
            photo : photo
          });
        }
    });
  }




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

/*  componentDidMount() {
    console.log('user id from route params: ', this.props.match.params.userId);
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  // another lifecycle that grabs props from react-dom; fires up when props changes
  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }*/

  render() {
    const { 
      redirectToSignin,
      user,
      posts,
      auth, 
      location, 
      pseudo, 
      email, 
      date, 
      photo, 
      myUserId, 
      userId,
    } = this.state;
    console.log("this.state", this.state)
    console.log("this.state", myUserId, userId)
    
    if (redirectToSignin) return <Redirect to='/signin' />;
    return (
      
      <div className='container'>
        <h2 className='mt-5 mb-5'>Profile</h2>
        <div className='row'>
          <div className='col-md-6'>
            <img
              style={{ height: '200px', width: 'auto' }}
              className='img-thumbnail'
              src={'data:image/jpg;base64,' + photo}
              onError={i => (i.target.src = `${DefaultAvatar}`)}
              alt={user.name}
            />
          </div>

          <div className='col-md-6'>
            <div className='lead mt-2'>
              <p>{`Hello ${pseudo}`}</p>
              <p>{`email: ${email}`}</p>
              <p>{`Joined ${new Date(date).toDateString()}`}</p>
            </div>

            {myUserId === userId ? (
              <div className='d-line-block'>
                <Link 
                className='btn btn-raised btn-success mr-5'
                to={`/user/edit/${userId}`} userId={userId} >
                 Edit Profile
                </Link> 

                <DeleteProfile userId={userId} />
              </div>
            ) : (
              <FollowProfileButton userId={userId}

              />
            )}
          </div>
        </div>
        <div className='row'>
          <div className='col md-12 mt-5 mb-5'>
            <hr />
            <p className='lead'>About</p>

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