import React, { Component } from 'react';
import { isAuthenticate } from '../auth';
import { Redirect } from 'react-router-dom';
import DefaultAvatar from '../images/avatar.png';
import { getAllRequests } from './apiFriend'
import { addFriend } from './apiFriend'
import { getAllFriends } from './apiFriend'
import { getUser } from '../user/apiUser'
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
      pseudosFriends:[],
      pseudosRequests:[],
      friends: [],
      grouptest:[{name:"Premier groupe",users: ["id1","id2"]}, {name:"Deuxieme groupe", users: ["id3", "id4"]}],
      error: ''
    };
  }


  componentDidMount() {
    var pseudosFriends = [];
    this.setState({ user: isAuthenticate().user });
    getAllRequests(isAuthenticate().user._id).then(requests => {
      this.setState({test: requests},
        requests.forEach((request) => {
          //pseudosFriends.push("test");
          getUser(request.userId, isAuthenticate().token).then(user => {this.setState({pseudosRequests:this.state.pseudosRequests.concat(user.about.pseudo)})})
        }),

      console.log("pseudosFriends vaut" + pseudosFriends),
      console.log("requests vaut " + JSON.stringify(requests)));
      })
    getAllFriends(isAuthenticate().user._id).then(friends => {
      this.setState({friends: friends},
        friends.forEach((friend) => {
          //pseudosFriends.push("test");
          getUser(friend.userId, isAuthenticate().token).then(user => {this.setState({pseudosFriends:this.state.pseudosFriends.concat(user.about.pseudo)})})
        }),
        console.log("friends vaut " + JSON.stringify(friends)));
      })
  }

  renderFriends(friends){
    return(
      <div className='row'>
        {friends.map((friend,i) => {
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
                <h5 className='card-title'>{this.state.pseudosFriends[i]}</h5>
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
        {requests.map((request,i) => {
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
                  <h5 className='card-title'>{this.state.pseudosRequests[i]}</h5>
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



  renderGroups(groups){
    return(
      <div className='row'>
        {groups.map((group,i) => {
          return (
            <div className='card col-md-3 mr-5 mb-5' key={group.name}>
              <div className='card-body'>
                <h5 className='card-title'>{group.name}</h5>
                  {group.users.map((user)=> {
                    return (<p> {user} </p>)
                  })}
              </div>
            </div>
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
      grouptest,
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
        <h2 className='mt-5 mb-5'>Groups</h2>
        {this.renderGroups(grouptest)}
      </div>
    )
  }
}

export default Friends;
