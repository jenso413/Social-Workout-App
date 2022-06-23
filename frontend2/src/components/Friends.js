import React, { useState } from 'react'
import Navbar from './Navbar'
import AddFriend from './AddFriend'
import FriendList from './FriendList'
import { Avatar } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// Basic idea is that you can search for friends, add them (when added, send friend request)
// You can also see your current friends, and remove them as friend

function Friends() {

    const [friendInput, setFriendInput] = useState('')
    const [friend, setFriend] = useState({})
    const [modalActive, setModalActive] = useState(false)

    function findUser() {
        fetch(`/api/auth/user/${friendInput}`)
            .then(async (res) => {
                if (res.ok) {
                    const jsonFriend = await res.json()
                    setFriend(jsonFriend)
                    setModalActive(true)
                } else {
                    toast.error('User not found')
                }
            })
    }

    // if already a friend, don't show in modal (instead show remove friend)
    // if add or remove friend, send toast

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
                    <ToastContainer />
                </div>
                <div className={`modal-bg ${modalActive ? 'bg-active' : ''}`}>
                    <AddFriend friend={friend}/>
                </div>
            </div>
        </div>
    )
}

export default Friends