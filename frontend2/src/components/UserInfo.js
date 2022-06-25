import React, { useState } from 'react'
import Navbar from './Navbar'
import FriendList from './FriendList';

function UserInfo() {

  const [updatedProfilePic, setUpdatedProfilePic] = useState('')

  function handleFileInputChange(e) {
      const file = e.target.files[0]
      previewFile(file)
  }

  function previewFile(file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
          setUpdatedProfilePic(reader.result)
      }
  }

  function updateProfilePic() {

    const { token } = JSON.parse(localStorage.getItem('user'))

    fetch('/api/auth/user/update', {
      method: 'PATCH',
      headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({profilePic : updatedProfilePic})
    })
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
      <div className="App">
          <Navbar />
          <div className='grid-container'>
              <FriendList />
              <input type='file' accept='image/*' onChange={(e) => handleFileInputChange(e)}/>
              <button onClick={updateProfilePic}>Update Profile Picture</button>
          </div>
      </div>
  )
}

export default UserInfo