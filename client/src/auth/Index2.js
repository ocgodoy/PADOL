import React, { Component } from 'react'

export default {
  signup: function (user) {
    return fetch(`${process.env.REACT_APP_API_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  },

  signin: function (user) {
    return fetch(`${process.env.REACT_APP_API_URL}/signin`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  },

  authenticate: function (jwt, next) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(jwt))
      next()
    }
  },

  isAuthenticate: function () {
    const jwt = localStorage.jwt
    if (jwt) return JSON.parse(jwt)
    return false
  },

  signout: function (next) {
    if (typeof window !== 'undefined') localStorage.removeItem('jwt')
    next()
    return fetch(`${process.env.REACT_APP_API_URL}/signout`, { method: 'POST' })
      .then(res => res.json())
      .catch(err => console.log(err))
  },

  // check path
  isActive: function (history, path) {
    if (history.location.pathname === path) return { color: '#ff9900' }
    return {}
  }
}
