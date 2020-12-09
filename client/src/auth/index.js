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
  //console.log('This is how is parsed the jwt' + JSON.parse(jwt) + '\n');
  if (jwt) return JSON.parse(jwt)
  return false
}

export const signout = next => {
  if (typeof window !== 'undefined') localStorage.removeItem('jwt')
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
