import { Redirect } from 'react-router-dom';
export const signup = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
}

export const signin = user => {
  return fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const authenticate = (jwt, next) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('jwt', JSON.stringify(jwt))
    next()
  }
}

export const isAuthenticate = () => {
  //localStorage.clear();
  let jwt = localStorage.jwt
  /*let expirationTime = false
  setTimeout( () => {expirationTime = true}, 10000)
  console.log(expirationTime);
  if ( expirationTime) return false//10sec*/
  if (jwt) return JSON.parse(jwt)
  return false 
}

export const signout = next => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt')
  document.location.href= `${process.env.REACT_APP_LOCAL_URL}/signin`
  next()
  return fetch(`${process.env.REACT_APP_API_URL}/signout`, { method: 'POST' })
    .then(res => res.json())
    .catch(err => console.log(err))
  
}

// check path
export const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: '#ff9900' }
  return {}
}
