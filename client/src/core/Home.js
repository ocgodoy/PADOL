import React from 'react'
import Posts from '../post/Posts'

const Home = () => (
  <div>
    <div className='container-fluid backColorGrey'
     style={{ height: '4vw', objectFit: 'cover' }}>
       <center><h4>Home</h4></center>
      
    </div>
    <div className='container'>
      <Posts />
    </div>
  </div>
)

export default Home
