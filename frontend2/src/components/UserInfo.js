import React from 'react'
import Navbar from './Navbar'
import FriendList from './FriendList';

function UserInfo() {
  return (
    <div className="App">
        <Navbar />
        <div className='grid-container'>
            <FriendList />
        </div>
    </div>
  )
}

export default UserInfo