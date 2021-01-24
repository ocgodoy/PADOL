export const getUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}/profile`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getAllUser = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/all`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const findPeople = userId => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/findpeople/${userId}`)
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const removeUser = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/delete/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const update = (userId, token, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/user/edit/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      //'Content-Type': 'application/json',
      //Authorization: `Bearer ${token}`
    },
    mode: 'cors',
    body: user
  })
    .then(res => res.json())
    //.catch(err => console.log(err));
}


export const updateLocalStorage = (user, next) => {
  if (typeof window !== 'undefined') {
    if (localStorage.getItem('jwt')) {
      const auth = JSON.parse(localStorage.getItem('jwt'))
      auth.user = user
      localStorage.setItem('jwt', JSON.stringify(auth))
      next()
    }
  }
}

export const follow = (userId, token, followId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/follow`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, followId })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const unfollow = (userId, token, unfollowId) => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/unfollow`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, unfollowId })
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}
