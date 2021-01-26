export const inviteGroup = (userId, invitedId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/group/invite/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId: invitedId})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const addGroupUser = (userId, inviter, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/group/add/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId: inviter})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const deleteFromRequestList = (userId, inviter, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/group/requests/delete/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({userId: inviter})
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export const getAllRequests = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/group/requests/${userId}`, {
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

export const getAllGroups = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/group/all/${userId}`, {
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
