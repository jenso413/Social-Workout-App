import React, { useState } from 'react'
import Navbar from './Navbar'
import AddFriend from './AddFriend'
import FriendList from './FriendList'
import { Avatar } from '@mui/material'

// Basic idea is that you can search for friends, add them (when added, send friend request)
// You can also see your current friends, and remove them as friend

function Friends() {

    const [friendInput, setFriendInput] = useState('')
    const [friend, setFriend] = useState({})
    const [isActive, setIsActive] = useState(false)

    function findUser() {
        fetch(`/api/auth/user/${friendInput}`)
            .then(res => {
                if (res.ok) {
                    console.log('there is data')
                } else {
                    console.log('no data')
                }
            })
            // .then(data => {
            //     if (data.ok) {
            //         console.log('there is data')
            //         setFriend(data)
            //     } else {
            //         console.log('no data')
            //     }
                
            // })
    }

    return (
        <div>
            <Navbar />
            <div className='grid-container'>
                <FriendList />
                <div>
                    <Avatar style={{height: '400px', width: '400px'}}/>
                    {/* Search for users here */}
                    <input placeholder='Enter a username: ' value={friendInput} onChange={(e) => setFriendInput(e.target.value)} />
                    <button onClick={findUser}>Find User!</button>
                </div>
                <div className={`modal-bg ${isActive ? 'bg-active' : ''}`}>
                    <AddFriend friend={friend}/>
                </div>
            </div>
        </div>
    )
}

export default Friends