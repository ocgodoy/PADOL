import React, { Component } from 'react';
import { inviteFriend } from '../friend/apiFriend';
import { isAuthenticate } from '../auth';
import { getAllRequests } from '../friend/apiFriend'
import { getAllFriends } from '../friend/apiFriend'
import { deleteFromRequestList } from '../friend/apiFriend'
import { addFriend } from '../friend/apiFriend'


class FollowProfileButton extends Component {
  constructor() {
    super();
    this.state = {
      inviterId: isAuthenticate().user._id,
      token: isAuthenticate().token,
      invitedId: "this.props",
      invited: false,
      requests:[],
      friends: [],
      invitationPending: null,
      isyourfriend: false,
      error: ''
    };
  }

  componentDidMount() {
    this.setState({invitedId: this.props.userId})
    getAllRequests(isAuthenticate().user._id).then(requests => {
      this.setState({requests: requests}, console.log("requests vaut " + JSON.stringify(requests) + JSON.stringify(this.props)));
      requests.forEach(request => (request.userId == this.props.userId) ?
        ( (request.status == false) ? (this.setState({invitationPending: true})) : this.setState({invited: true}))
        :null

      )
      })
    getAllFriends(isAuthenticate().user._id).then(friends => {
      this.setState({friends: friends}, console.log("friends vaut " + JSON.stringify(friends)));
      friends.forEach(friend => (friend.userId == this.props.userId) ? this.setState({isyourfriend: true}) : null)
      })
  }

  clickSubmitAdd = e => {
    e.preventDefault();

      this.setState({ invited: true });
      const { inviterId, token} = this.state;
      const invitedId = this.props.userId
      inviteFriend(inviterId, invitedId, token)


  };

  clickSubmitDelete = e => {
    e.preventDefault();
      this.setState({ invited: false });
      const {inviterId, token} = this.state;
      const invited = this.props.userId;
      deleteFromRequestList( inviterId, invited, token)
  };

  clickSubmitAccept = e => {
    e.preventDefault();

      this.setState({ invitationPending: false });
      this.setState({ invited: false });
      this.setState({ isyourfriend: true });
      const { inviterId, token} = this.state;
      const invited = this.props.userId
      deleteFromRequestList(inviterId, invited, token)
      addFriend(inviterId, invited, token)
  };

  clickSubmitRefuse = e => {
    e.preventDefault();

      this.setState({ invitationPending: false });
      this.setState({ invited: false });
      this.setState({ isyourfriend: false });
      const { inviterId, token} = this.state;
      const invited = this.props.userId
      deleteFromRequestList(inviterId, invited, token)
  };

  renderFriend(){
    return (
      <div>
        <button
          className='btn btn-raised btn-primary'

        >
          Friend
        </button>
      </div>
    )
  }

  renderPending(){
    return (
      <div>
      <button
        className='btn btn-raised btn-primary'
        onClick={this.clickSubmitAccept}
      >
        Accept
      </button>
      <button
        className='btn btn-raised btn-danger'
        onClick={this.clickSubmitRefuse}
      >
        Refuse
      </button>
      </div>
    )
  }

  renderInvited(){
    return (
      <button
        className='btn btn-raised btn-warning'
        onClick={this.clickSubmitDelete}
      >
        Cancel invitation
      </button>
    )
  }

  renderNoFriend(){
    return(
      <button
        className='btn btn-raised btn-primary mr-5'
        onClick={this.clickSubmitAdd}
      >
        Add friend
      </button>
    )
  }

  render() {
    const {invitedId, invited, invitationPending, isyourfriend} = this.state
    return (
      <div className='d-inline-block'>
      {isAuthenticate().user._id == this.props.userId ? (
        null
      ) : (
        isyourfriend ? (
          this.renderFriend()) :

        ((invitationPending) ? (
          this.renderPending()
        ) : (
          (invited) ? (
            this.renderInvited()
          ) : (
            this.renderNoFriend()
          )
        )
      ))}
      </div>
    );
  }
}

export default FollowProfileButton;
