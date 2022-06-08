import React, { useState } from 'react'
import Navbar from './Navbar'
import AddFriend from './AddFriend'
import FriendList from './FriendList'

// Basic idea is that you can search for friends, add them (when added, send friend request)
// You can also see your current friends, and remove them as friend

function Friends() {

    const [friendInput, setFriendInput] = useState('')
    const [friend, setFriend] = useState({})

    function findUser() {
        fetch(`/api/auth/user/${friendInput}`)
            .then(res => res.json())
            .then(data => setFriend(data))
    }

    return (
        <div>
            <Navbar />
            <div className='grid-container'>
                <FriendList />
                <div>
                    {/* Search for users here */}
                    <input placeholder='Find a friend!' value={friendInput} onChange={(e) => setFriendInput(e.target.value)} />
                    <button onClick={findUser}>Find User!</button>
                </div>
                <div>
                    <AddFriend friend={friend}/>
                </div>
            </div>
        </div>
    )
}

export default Friends