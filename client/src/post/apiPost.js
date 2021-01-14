export const createPost = (userId, token, post) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: post
  })
    .then(res => res.json())
    // .catch(err => console.log(err));
}


export const editPost = (postId, token, title, caption) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/editPost/${postId}`, {
    method: 'PUT',
    body: JSON.stringify(postId),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    mode: 'cors',
    body:  JSON.stringify({ postId, title, caption})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getAllPost = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/all`, {
    method: 'GET',
    'Content-Type': 'application/json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(res => res.json())
    // .catch(err => console.log(err));
}
/*
export const getBase64PhotoAll = (token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/photo/all`, {
    method: 'GET',
    'Content-Type': 'application/json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}*/



export const getPost = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`, {
    method: 'GET',
    'Content-Type': 'application/json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getBase64Photo = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/photo/${postId}`, {
    method: 'GET',
    'Content-Type': 'application/json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getPhotoPost = (postId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/photo/${postId}`, {
    method: 'GET',
    'Content-Type': 'application/json',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export const getPostByUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/by/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const removePost = (postId, token, userId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/delete`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({postId})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const likePost = (postId, token, userId, status, numberOfLikes, LikersId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/like/${postId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, status, numberOfLikes, LikersId })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const newComment = (postId, token, userId, pseudo, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/comment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, pseudo, comment })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const deleteComment = (postId, token, userId, commentId, comment) => {
  return fetch(`${process.env.REACT_APP_API_URL}/post/deletecomment`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, postId, commentId, comment })
  })
    .then(res => res.json(res))
    .catch(err => console.log(err))
}
