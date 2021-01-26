import React from 'react'
import Posts from '../post/Posts'

const Home = () => (
  <div>
    <div className='jumbotron'
     style={{ height: '5vw', objectFit: 'cover' }}>
      <h4>Home</h4>
    </div>
    <div className='container'>
      <Posts />
    </div>
  </div>
)

export default Home
