import React, { Component } from 'react';
import { isAuthenticate } from '../auth';
import { Redirect } from 'react-router-dom';
import DefaultAvatar from '../images/post.jpg';
import { getAllRequests } from './apiFriend'
import { addFriend } from './apiFriend'
import { getAllFriends } from './apiFriend'
import { Link } from 'react-router-dom';

import Test from '../images/padol_logo.png';

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      redirectToProfile: false,
      token: isAuthenticate().token,
      //friends: [{ userId:"Nico"}, { userId:"Vic"}, {userId:"Loulou"}, {userId:"Dimi"}],
      requests: [{userId: "Toto", status:false, date: new Date(Date.now())},
                {userId: "Boubou", status:true, date: new Date(Date.now())},
                {userId: "Rami", status:false, date: new Date(Date.now())}
                      ],
      test: [],
      friends: [],
      error: ''
    };
  }


  componentDidMount() {
    this.setState({ user: isAuthenticate().user });
    getAllRequests(isAuthenticate().user._id).then(requests => {
      this.setState({test: requests}, console.log("requests vaut " + JSON.stringify(requests)));
      })
    getAllFriends(isAuthenticate().user._id).then(friends => {
      this.setState({friends: friends}, console.log("friends vaut " + JSON.stringify(friends)));
      })
  }

  renderFriends(friends){
    return(
      <div className='row'>
        {friends.map(friend => {
          return (
            <div className='card col-md-3 mr-5 mb-5' key={friend.userId}>
              <img
                style={{ height: 'auto', width: '30vw' }}
                className='img-thumbnail'
                src={`${process.env.REACT_APP_API_URL}/user/photo/${friend.userId}`}
                onError={i => (i.target.src = `${DefaultAvatar}`)}
                alt={friend.userId}
              />
              <div className='card-body'>
                <h5 className='card-title'>{friend.userId}</h5>
                <Link
                  to={`/user/${friend.userId}`}
                  className='btn btn-raised btn-primary btn-sm'
                >
                  View Profile
                </Link>
              </div>
            </div>
          )
        }

        )}
      </div>
    )

  }

  renderRequests(requests){
    console.log(JSON.stringify(requests))
    return(
      <div className='row'>
        {requests.map(request => {
          return (
            request.status === false ? (
              <div className='card col-md-3 mr-5 mb-5' key={request.userId}>
              <img
                style={{ height: 'auto', width: '30vw' }}
                className='img-thumbnail'
                src={`${process.env.REACT_APP_API_URL}/user/photo/${request.userId}`}
                onError={i => (i.target.src = `${DefaultAvatar}`)}
                alt={request.userId}
              />
                <div className='card-body'>
                  <h5 className='card-title'>{request.userId}</h5>
                  <Link
                    to={`/user/${request.userId}`}
                    className='btn btn-raised btn-primary btn-sm'
                  >
                    View Profile
                  </Link>
                </div>

              </div>
            ) : (null)
          )
        }
        )}
      </div>
    )

  }

  render() {
    const {
      redirectToProfile,
      user,
      friends,
      requests,
      test,
      error
    } = this.state;
    return (
      <div className='container'>
        {!friends.length || friends.length === 'undefined' ? (
          <div className='jumbotron text-center'>
            <h2>No friends</h2>
          </div>
        ) : (
          <h2 className='mt-5 mb-5'>Friends</h2>
        )}

        {this.renderFriends(friends)}
        {!requests.length || requests.length === 'undefined' ? (
          <div className='jumbotron text-center'>
            <h2>No requests</h2>
          </div>
        ) : (
          <h2 className='mt-5 mb-5'>Requests</h2>
        )}

        {this.renderRequests(test)}
      </div>
    )
  }
}

export default Friends;
