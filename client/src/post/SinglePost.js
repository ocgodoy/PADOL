import React, { Component, useImperativeHandle } from 'react';
import { isAuthenticate } from '../auth';
import DefaultAvatar from '../images/post.jpg';
import { getPost, likePost, unlikePost, getBase64Photo } from './apiPost';
import { Link, Redirect } from 'react-router-dom';
import DeletePost from './DeletePost';
import Comment from './Comment';

class SinglePost extends Component {
  state = {
    post: {},
    postId:{},
    postedBy: {},
    B64photo:{},
    date: null,
    redirectToSignin: false,
    like: {},
    likes: 0,
    likers: [],
    error: undefined,
    comments: []
  };


  /**********************************RECUPERATION DONNEE DE LA BDD*********************************/ 
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
          //console.log("voici les données", data)
          this.setState({
            post: data.content,
            postedBy: data.postedBy,
            postId: data._id,
            date: data.date,
            views: data.views,
            likes: data.likes.numberOfLikes, //nb de like
            liker: data.likes.likers, //donnée Id des likers
            like : this.checkLike(data), default: false, //verifie que la personne du like a déja liké
            comments: data.comments
          });
        }
        console.log("mes data",data);
    });


    getBase64Photo(postId, token).then(B64photo => {
      if (B64photo.error) console.log(B64photo.error);
      else{
          //console.log("voici la photo en base 64", B64photo)
          this.setState({
            B64photo : B64photo,
          });
        }
    });
  }
  /**********************************FIN DE RECUPERATION DONNEE DE LA BDD*********************************/ 
  
  /*
  state.like = true signifie que le statue est liké
  sate.like = false signifie que le statue n'est pas liké
  */
  
  checkLike = data => {
    const userId = isAuthenticate().user._id;
    console.log("mon ID ", userId );
    console.log("tableau ID ", data.likes.likers);
    console.log("mon id est présent dans le tableau ", data.likes.likers.includes(userId));
    if(data.likes.likers.includes(userId)){return true}
  };

  likeToggle = () => {
    const token = isAuthenticate().token;
    const postId = this.props.match.params.postId;
    const userId = isAuthenticate().user._id
    
    if (this.state.like == true){
      this.state.liker.pop();
      this.setState({ like: !this.state.like, 
                      liker: this.state.liker,
                      likes: this.state.liker.length
                    });
      console.log("mes données unlike = ",this.state.like, this.state.likes, this.state.liker );
    }
    else{
      this.state.liker.push(userId);
      this.setState({ like: !this.state.like, 
                      liker : this.state.liker,
                      likes: this.state.liker.length
                    });
      console.log("mes données like = ",this.state.like, this.state.likes, this.state.liker );
    }
    likePost(postId, token, userId, this.state.like, this.state.liker.length, this.state.liker )
  };

  updateComments = comments => {
    this.setState({ comments: comments });
  };

  render() {
    const {
      post,
      postedBy,
      postId,
      date,
      B64photo,
      loading,
      likes,
      like,
      views,
      redirectToSignin,
      error,
      comments
    } = this.state;

    
    let photoUrl = 'data:image/png;base64,' + B64photo;

    const posterId = postedBy ? postedBy._id : '';
    const posterName = postedBy ? postedBy.pseudo : 'Unknown';
    if (redirectToSignin) return <Redirect to='/signin' />;
    if (error) return <Redirect to='/post/expired' />;
    return (
      <div className='container'>
        {!post.title ? (
          <div className='jumbotron text-center'>
            <h2>Loading...</h2>
          </div>
        ) : (
          <>
            <h2 className='mt-5 mb-5 display-2'>{post.title}</h2>
            <div width="40" height="30">
            <img
              className='card-img-top'
              src = {photoUrl}
              onError={i => (i.target.src = `${DefaultAvatar}`)}
              style={{ width: '10', height: '10', objectFit: 'cover' }}
              alt='embeded'
            /></div>
            <br />
            <br />

            {!like ? (
              <h3 onClick={this.likeToggle}>
                <i className='fas fa-thumbs-up text-info'>
                  {''} {likes} Like
                </i>
              </h3>
            ) : (
              <h3 onClick={this.likeToggle}>
                <i className='fas fa-thumbs-down text-danger'>
                  {''} {likes} Unlike
                </i>
              </h3>
            )}
            <p className='card-text'>{post.content}</p>
            <br />
            <p className='font-italic mark'>
              Posted By <Link to={`/user/${posterId}`}>{posterName}</Link>
              on {new Date(date.uploadDate).toDateString()} at {(new Date(date.uploadDate)).getHours()}:{(new Date(date.uploadDate)).getMinutes()}
            </p>
            <p> Vues: {views.viewsNumber}/{views.viewsLimit}
            </p>
            <Link to={`/`} className='btn btn-primary btn-raised btn-sm mr-5'>
              Back to posts
            </Link>
            {isAuthenticate().user && isAuthenticate().user._id == posterId ? (
              <div className='d-inline-block'>
                <Link
                  className='btn btn-raised btn-success mr-5'
                  to={`/post/edit/${post._id}`}
                >
                  Update Post
                </Link>
                <DeletePost postId={post._id} />
              </div>
            ) : (
              ''
            )}
          </>
        )}
        <Comment
          postId={postId}
          comments={comments}
          updateComments={this.updateComments}
          comments={comments}
        />
      </div>
    );
  }
}

export default SinglePost;
